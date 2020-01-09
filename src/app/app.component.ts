import { VerificationMailService } from "./core/auth/services/verification-mail.service";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private verificationMailService: VerificationMailService) {}
}
