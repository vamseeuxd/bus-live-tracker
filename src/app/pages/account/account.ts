import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";

import { AlertController } from "@ionic/angular";

import { UserData } from "../../providers/user-data";
import { AuthService } from "../../service/auth/auth.service";
import { ToastService } from "../../service/toast/toast.service";
import { LoadingService } from "../../service/loading/loading.service";

@Component({
  selector: "page-account",
  templateUrl: "account.html",
  styleUrls: ["./account.scss"],
})
export class AccountPage implements AfterViewInit {
  username: string;

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public authService: AuthService,
    public toastService: ToastService,
    public loadingService: LoadingService,
    public userData: UserData
  ) {}

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log("Clicked to update picture");
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: "Change Display Name",
      buttons: [
        "Cancel",
        {
          text: "Ok",
          handler: (data: any) => {
            if (data.username.trim().length > 0) {
              this.loadingService.showLoader();
              this.authService.changeDisplayName(data.username).then(() => {
                this.userData
                  .setUsername(data.username)
                  .then(() => {
                    this.getUsername();
                    this.loadingService.hideLoader();
                  })
                  .catch(() => {
                    this.loadingService.hideLoader();
                  });
              });
            } else {
              this.toastService.presentErrorToast(
                "Please provide valid Display Name"
              );
            }
          },
        },
      ],
      inputs: [
        {
          type: "text",
          name: "username",
          value: this.username,
          placeholder: "username",
        },
      ],
    });
    await alert.present();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  changePassword(email: string) {
    this.authService.resetPassword(email);
  }

  logout() {
    this.authService.logout().then((isLogout) => {
      if (isLogout) {
        this.userData.logout().then(() => {
          return this.router.navigateByUrl("/login");
        });
      }
    });
  }

  support() {
    this.router.navigateByUrl("/support");
  }
}
