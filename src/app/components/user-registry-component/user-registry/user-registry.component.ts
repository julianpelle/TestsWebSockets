import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service/auth.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-user-registry',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './user-registry.component.html',
  styleUrl: './user-registry.component.css'
})
export class UserRegistryComponent {

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    fullname: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]]
  })

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.form.invalid) return;
    const user = this.form.getRawValue() as User;
    this.authService.signup(user).subscribe({
      next: () => {
        alert('Usuario agregado');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error(error);
        console.log('redirecting to Home');
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      }
    })
  }

}
