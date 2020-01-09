import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  errors$: Observable<{ mail: string; pass: string }>;

  registerForm = this.formBuilder.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.authService.clearErrors();
    this.errors$ = this.authService.errors$;
  }

  ngOnInit() {}

  get email() {
    return this.registerForm.get("email");
  }

  get password() {
    return this.registerForm.get("password");
  }

  onLogin() {
    this.authService.SignIn(this.email.value, this.password.value);
  }
}
