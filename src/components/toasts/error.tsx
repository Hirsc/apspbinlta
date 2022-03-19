import { toastController, ToastOptions } from "@ionic/core"

export async function toastError(message: string) {
    const options: ToastOptions = {
        color: "danger",
        duration: 5000,
        message,

    }
    const toast = await toastController.create(options)

    await toast.present()
}
