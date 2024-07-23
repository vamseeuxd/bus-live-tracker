import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(
    message: string,
    duration: number = 2000,
    position: "top" | "middle" | "bottom" = "bottom",
    color:
      | "primary"
      | "secondary"
      | "tertiary"
      | "success"
      | "warning"
      | "danger"
      | "light"
      | "dark" = "primary"
  ) {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
      color,
    });
    await toast.present();
  }

  async presentErrorToast(
    message: string,
    duration: number = 2000,
    position: "top" | "middle" | "bottom" = "bottom"
  ) {
    await this.presentToast(message, duration, position, "danger");
  }

  async presentSuccessToast(
    message: string,
    duration: number = 2000,
    position: "top" | "middle" | "bottom" = "bottom"
  ) {
    await this.presentToast(message, duration, position, "success");
  }

  async presentInfoToast(
    message: string,
    duration: number = 2000,
    position: "top" | "middle" | "bottom" = "bottom"
  ) {
    await this.presentToast(message, duration, position, "primary");
  }
}
