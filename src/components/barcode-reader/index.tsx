import { Component, h, Prop, State } from "@stencil/core"
import { BrowserMultiFormatReader } from "@zxing/library"

@Component(
    {
        styleUrl: "index.css",
        tag: "barcode-reader",
    },
)
export class BarcodeReader {
    @Prop() public onCodeChange: (readCode: string) => void
    @State() private codeReader: BrowserMultiFormatReader
    @State() private selectedDeviceId: string | undefined = undefined
    @State() private readCode: string
    // @State() private error: Error
    @State() private videoInputDevices: VideoInputDevice[] = []

    private videoInput?: HTMLVideoElement


    constructor() {
        this.changeVideoDevice = this.changeVideoDevice.bind(this)
        this.decode = this.decode.bind(this)
    }


    public async connectedCallback(): Promise<void> {
        await this.init()
        await this.start()
    }

    public disconnectedCallback(): void {
        this.reset()
    }

    public render(): Element[] {
        return (
            <div>
                <ion-fab horizontal="end" vertical="bottom" slot="fixed">
                    <ion-fab-button color="primary">
                        <ion-icon md="caret-up" ios="chevron-up-circle-outline"></ion-icon>
                    </ion-fab-button>
                    <ion-fab-list side="top">
                        {
                            this.videoInputDevices.map((device: VideoInputDevice) => {
                                return (
                                    <ion-fab-button
                                        color="light"
                                        onClick={this.changeVideoDevice(device)}
                                    >
                                        <ion-icon name="camera-outline" />
                                    </ion-fab-button>
                                )
                            })
                        }
                    </ion-fab-list>
                </ion-fab>

                <video
                    class="video"
                    ref={(el) => this.videoInput = el as HTMLVideoElement}
                />
            </div>
        )
    }

    private async init() {
        this.codeReader = new BrowserMultiFormatReader()
        console.log("ZXing code reader initialized")
        this.videoInputDevices = await this.codeReader.listVideoInputDevices()
        this.videoInputDevices = this.videoInputDevices.filter(onlyRelevantVideoInput)
        this.selectedDeviceId = this.videoInputDevices[0]?.deviceId
    }

    private async start() {
        this.codeReader.decodeFromVideoDevice(
            this.selectedDeviceId,
            this.videoInput,
            this.decode,
        )
        console.log(`Started continous decode from camera with id ${this.selectedDeviceId}`)
    }

    private decode(result, err) {

        if (result) {
            this.readCode = result.getText()

            if (this.onCodeChange) {
                this.onCodeChange(this.readCode)
            }
        }

        if (err && !(err instanceof Error)) {
            console.error(err)
            // this.error = err
        }
    }

    private reset() {
        this.codeReader.reset()
        this.readCode = ""
        console.log("Reset.")
    }

    private changeVideoDevice(device: VideoInputDevice) {
        return (_: Event) => {
            console.log(device.label, device.deviceId)
            this.selectedDeviceId = device.deviceId
            this.start()
        }
    }

}

interface VideoInputDevice {
    label: string
    deviceId: string
}

function onlyRelevantVideoInput(device: VideoInputDevice) {
    if (!device.label.toLowerCase().includes("built-in")) {
        return false
    }

    return true
}
