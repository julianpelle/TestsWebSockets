import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth-service/auth.service';

@Component({
  selector: 'app-user-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    if (this.form.invalid) return;
    const { username, email } = this.form.getRawValue();
    this.authService.login(username!, email!).subscribe({
      next: (loggedIn) => {
        if (loggedIn) {
          this.router.navigate(['/']);
        } else {
          console.log('error en las credenciales');
        }
      },
      error: console.log
    });
  }

}
