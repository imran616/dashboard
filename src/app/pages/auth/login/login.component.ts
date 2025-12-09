import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matRemoveRedEye, matVisibilityOff } from '@ng-icons/material-icons/baseline';
import { email } from '../../../dto/common.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIconComponent],
  providers: [provideIcons({ matRemoveRedEye, matVisibilityOff })],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  passwordFieldType = 'password';

  form: FormGroup = new FormGroup({
    email: new FormControl('', [email]),
    password: new FormControl(''),
  });
  constructor(private router: Router) {}

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    console.log('test');
    if (!this.form.valid) return;
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const payload = this.form.value;
  }
}
