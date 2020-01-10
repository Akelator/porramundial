import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { AuthService } from "src/app/core/auth/services/auth.service";
import { UserSummary } from "src/app/core/auth/models/user";
import { Router } from "@angular/router";

@Component({
  selector: "profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.scss"]
})
export class ProfilePageComponent implements OnInit {
  _sub;

  profileForm = this.formBuilder.group({
    email: [null],
    displayName: [null],
    phoneNumber: [null],
    photoURL: [null]
  });
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  items;

  ngOnInit() {
    this._sub = this.authService.userData$.subscribe(userData => {
      this.updateUserData(userData);
      if (!userData) {
        this.router.navigate([""]);
      }
    });
    this.authService.getItemsList().subscribe(items => {
      this.items = items;
      console.log(this.items);
    });
  }

  private updateUserData(user: UserSummary) {
    if (user) {
      this.profileForm.patchValue({ email: user.email }, { emitEvent: false });
      this.profileForm.patchValue(
        { displayName: user.displayName },
        { emitEvent: false }
      );
      this.profileForm.patchValue(
        { photoURL: user.photoURL },
        { emitEvent: false }
      );
    }
  }

  onUpdateProfile() {
    this.authService.UpdateProfile(this.displayName.value, this.photoURL.value);
  }

  get displayName() {
    return this.profileForm.get("displayName");
  }

  get photoURL() {
    return this.profileForm.get("photoURL");
  }

  get email() {
    return this.profileForm.get("email");
  }
}
