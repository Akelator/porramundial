import { Router } from "@angular/router";
import { UserSummary } from "./../../models/user";
import { Observable } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "verify-email-request",
  templateUrl: "./verify-email-request.component.html",
  styleUrls: ["./verify-email-request.component.scss"]
})
export class VerifyEmailRequestComponent implements OnInit, OnDestroy {
  userData: UserSummary;
  _sub;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this._sub = this.authService.userData$.subscribe(userData => {
      this.userData = userData;
      if (!this.userData) {
        this.router.navigate([""]);
      }
    });
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  onResend() {
    this.authService.SendVerificationMail();
  }
}
