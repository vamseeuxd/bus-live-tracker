// auth.service.ts
import { Injectable } from "@angular/core";
import firebase from "firebase/compat/app";
import { Observable } from "rxjs";
import { User } from "firebase/auth";
import { AlertController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ToastService } from "../toast/toast.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user$: Observable<User | null> = this.afAuth.user;

  constructor(
    private afAuth: AngularFireAuth,
    public toastService: ToastService,
    private alertController: AlertController
  ) {}

  async loginWithGoogle(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.afAuth.signInWithPopup(provider);
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Error during email login:", error);
    }
  }

  async registerWithEmail(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Error during email registration:", error);
    }
  }

  logout(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: "Confirm Logout",
        message: "Are you sure you want to log out?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              resolve(false);
              console.log("Logout cancelled");
            },
          },
          {
            text: "Log Out",
            handler: async () => {
              try {
                await this.afAuth.signOut();
                resolve(true);
                console.log("Logged out successfully");
              } catch (error) {
                resolve(false);
                console.error("Error during logout:", error);
              }
            },
          },
        ],
      });

      await alert.present();
    });
  }

  async changeDisplayName(displayName: string): Promise<void> {
    const user = this.afAuth.currentUser;
    if (user) {
      try {
        await (await user).updateProfile({ displayName });
        this.toastService.presentSuccessToast(
          "Your display name has been updated."
        );
      } catch (error) {
        this.toastService.presentErrorToast(
          "Error updating display name:" + error
        );
      }
    } else {
      this.toastService.presentErrorToast("No user is currently logged in");
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      const alert = await this.alertController.create({
        header: "Reset Password",
        message: "Password reset email sent!",
        buttons: [{ text: "Ok" }],
      });
      await alert.present();
    } catch (error) {
      console.error("Error during password reset:", error);
    }
  }
}
