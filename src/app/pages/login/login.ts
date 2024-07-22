import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserData } from "../../providers/user-data";

import { UserOptions } from "../../interfaces/user-options";
import { AuthService } from "../../service/auth/auth.service";
import { lastValueFrom } from "rxjs";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "page-login",
  templateUrl: "login.html",
  styleUrls: ["./login.scss"],
})
export class LoginPage {
  login: UserOptions = { username: "", password: "" };
  submitted = false;
  isLoginClick = false;
  constructor(
    public userData: UserData,
    public router: Router,
    public authService: AuthService,
    private toastController: ToastController
  ) {
    this.authService.user$.subscribe((user) => {
      if (user && this.isLoginClick) {
        this.isLoginClick = false;
        this.userData.login(user.displayName);
        this.router.navigateByUrl("/app/tabs/schedule");
        this.presentToast("Login successful.");
      }
    });
  }

  async presentToast(
    message: string,
    duration = 1500,
    position: "top" | "middle" | "bottom" = "bottom"
  ) {
    const toast = await this.toastController.create({
      message,
      duration,
      position: position,
    });
    await toast.present();
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.router.navigateByUrl("/app/tabs/schedule");
    }
  }

  onSignup() {
    this.router.navigateByUrl("/signup");
  }

  async loginWithGoogle() {
    this.isLoginClick = true;
    await this.authService.loginWithGoogle();
  }

  async loginWithEmail(email: string, password: string) {
    this.isLoginClick = true;
    await this.authService.loginWithEmail(email, password);
  }

  logout() {
    this.authService.logout();
  }

  resetPassword(email: string) {
    this.authService.resetPassword(email);
  }
}
