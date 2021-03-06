import { LangService } from "./../../../../shared/lang/lang.service";
import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs";
import { LangDirective } from "src/app/shared/lang/lang.directive";

@Component({
  selector: "sign-up-page",
  templateUrl: "./sign-up-page.component.html",
  styleUrls: ["./sign-up-page.component.scss"]
})
export class SignUpPageComponent extends LangDirective implements OnInit {
  errors$: Observable<{ mail: string; pass: string }>;

  registerForm = this.formBuilder.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public langService: LangService
  ) {
    super(langService);
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

  onSignUp() {
    this.authService.SignUp(this.email.value, this.password.value);
  }
}
