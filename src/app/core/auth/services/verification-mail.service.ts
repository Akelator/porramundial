import { Router } from "@angular/router";
import { environment } from "./../../../../environments/environment.prod";
import { Injectable } from "@angular/core";
import * as firebase from "firebase";
@Injectable({
  providedIn: "root"
})
export class VerificationMailService {
  constructor(private router: Router) {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        // TODO: Implement getParameterByName()
        // Get the action to complete.
        const mode = this.getParameterByName("mode");
        if (mode) {
          // Get the one-time code from the query parameter.
          const actionCode = this.getParameterByName("oobCode");
          // (Optional) Get the continue URL from the query parameter if available.
          const continueUrl = this.getParameterByName("continueUrl");
          // (Optional) Get the language code if available.
          const lang = this.getParameterByName("lang") || "en";

          // Configure the Firebase SDK.
          // This is the minimum configuration required for the API to be used.
          const config = environment.firebase;
          const app = firebase.initializeApp(config);
          const auth = app.auth();

          // Handle the user management action.
          switch (mode) {
            case "resetPassword":
              // Display reset password handler and UI.
              //this.handleResetPassword(auth, actionCode, continueUrl, lang);
              break;
            case "recoverEmail":
              // Display email recovery handler and UI.
              //this.handleRecoverEmail(auth, actionCode, lang);
              break;
            case "verifyEmail":
              // Display email verification handler and UI.
              this.handleVerifyEmail(auth, actionCode, continueUrl, lang);
              break;
            default:
            // Error: invalid mode.
          }
        }
      },
      false
    );
  }

  private handleVerifyEmail(auth, actionCode, continueUrl, lang) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    // Try to apply the email verification code.
    auth
      .applyActionCode(actionCode)
      .then(resp => {
        this.router.navigate(["auth/verify-email-done"]);
        // Email address has been verified.
        // TODO: Display a confirmation message to the user.
        // You could also provide the user with a link back to the app.
        // TODO: If a continue URL is available, display a button which on
        // click redirects the user back to the app via continueUrl with
        // additional state determined from that URL's parameters.
      })
      .catch(error => {
        this.router.navigate(["error"]);
        // Code is invalid or expired. Ask the user to verify their email address
        // again.
      });
  }

  getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regexS = "[\\?&]" + name + "=([^&#]*)";
    const regex = new RegExp(regexS);
    const results = regex.exec(window.location.href);
    if (results == null) {
      return "";
    } else {
      return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
  }
}
