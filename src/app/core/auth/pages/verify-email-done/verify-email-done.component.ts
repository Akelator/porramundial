import { Component, OnDestroy } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { UserSummary } from "../../models/user";

@Component({
  selector: "verify-email-done",
  templateUrl: "./verify-email-done.component.html",
  styleUrls: ["./verify-email-done.component.scss"]
})
export class VerifyEmailDoneComponent implements OnDestroy {
  userData: UserSummary;
  _sub;
  constructor(private authService: AuthService, private router: Router) {
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
}
