import { Component, h, Prop, State, Watch } from "@stencil/core"
import { createScheduler, createWorker, Scheduler } from "tesseract.js"

import { UnixTimestamp } from "../../utils/unix-timestamp"

const deviceLanguage = "eng"

@Component(
    {
        styleUrl: "index.css",
        tag: "date-reader",
    },
)
export class DateReader {
    @Prop() public onDateChange: (date: UnixTimestamp) => void
    @State() private recognizedText: string

    private scheduler: Scheduler
    private videoInput?: HTMLVideoElement
    private timerId: NodeJS.Timeout

    constructor() {
        this.scheduler = createScheduler()
        this.doOCR = this.doOCR.bind(this)
    }

    public async componentDidLoad() {

        this.startCamera()
        for (let i = 0; i < 4; i++) {

            const worker = createWorker()
            await worker.load()
            await worker.loadLanguage(deviceLanguage)
            await worker.initialize(deviceLanguage)
            this.scheduler.addWorker(worker)
        }
        this.startOCR()
    }

    public async disconnectedCallback() {
        this.stopOCR()
        this.stopCamera()
        await this.scheduler.terminate()
    }

    public render() {
        return (
            <div>
                <video
                    class="video"
                    autoplay="true"
                    playsinline="true"
                    muted={true}
                    ref={(el) => this.videoInput = el as HTMLVideoElement}
                />
            </div>
        )
    }

    @Watch("recognizedText")
    private async watchHandler(newValue: string, oldValue: string) {
        console.log("The new value of 'recognizedText' is: ", newValue, oldValue)
        const date = this.getDateFromOCRText(newValue)

        if (date) {
            this.onDateChange(date)
        }
    }

    private startCamera() {
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream: MediaStream) => {
                    this.videoInput.srcObject = stream
                })
                .catch((error) => {
                    console.error(`starting the camera failed with an error: ${error}`)
                })
        }
    }

    private stopCamera() {
        const stream: MediaStream = this.videoInput.srcObject as MediaStream
        stream.getVideoTracks().forEach((t) => t.stop())
        this.videoInput.srcObject = null
    }

    private startOCR() {
        this.timerId = setInterval(this.doOCR, 1000)
    }

    private stopOCR() {
        clearInterval(this.timerId)
    }

    private async doOCR() {
        try {
            const image = this.createImageFromVideo()
            const { data: { text } } = await this.scheduler.addJob("recognize", image)
            this.recognizedText = text

            console.log("recognized text", this.recognizedText)
        } catch (error) {
            console.error(`doing OCR failed with error: ${error}`)
        }
    }

    private createImageFromVideo(): HTMLCanvasElement {
        const c = document.createElement("canvas")

        c.width = 640
        c.height = 360
        c.getContext("2d").drawImage(this.videoInput, 0, 0, 640, 360)

        return c
    }

    private getDateFromOCRText(text: string): UnixTimestamp | undefined {
        const dateString: string[] = text.match(/\d{2}([\/.-])\d{2}\1\d{4}/g)

        if (!dateString) {
            return
        }

        if (dateString.length) {
            const unixTimestamp = new Date(dateString[0]).getTime() / 1000

            return unixTimestamp
        }

        return
    }

}
