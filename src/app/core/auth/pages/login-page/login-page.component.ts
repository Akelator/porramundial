import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../auth.service";

@Component({
  selector: "login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  registerForm = this.formBuilder.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  });
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  errorMessage: string;
  successMessage: string;

  ngOnInit() {}

  get email() {
    return this.registerForm.get("email");
  }

  get password() {
    return this.registerForm.get("password");
  }

  tryRegister() {
    this.authService.SignIn(this.email.value, this.password.value).then(
      res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created";
      },
      err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      }
    );
  }
}
