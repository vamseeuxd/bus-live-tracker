import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  private loading: HTMLIonLoadingElement | null = null;
  private requestCount = 0;

  constructor(private loadingController: LoadingController) {}

  async showLoader(message?: string) {
    if (this.requestCount === 0) {
      this.loading = await this.loadingController.create({
        message: message || "Please Wait...",
        spinner: "bubbles", // or any other spinner
        // Add other customization options as needed
      });
      await this.loading.present();
    }
    this.requestCount++;
  }

  async hideLoader() {
    this.requestCount--;
    if (this.requestCount === 0 && this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}
