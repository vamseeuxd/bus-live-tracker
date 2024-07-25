import { Injectable } from "@angular/core";
import { AlertButton, AlertController, AlertInput } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  async presentAlert(options: {
    header?: string;
    message?: string;
    buttons?: AlertButton[];
    cssClass?: string;
    inputs?: AlertInput[];
    subHeader?: string;
  }): Promise<any> {
    const alert = await this.alertController.create(options);
    await alert.present();

    return new Promise((resolve) => {
      alert.onDidDismiss().then((result) => {
        resolve(result);
      });
    });
  }
}
