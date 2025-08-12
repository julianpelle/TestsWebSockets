import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NewsService } from '../../../../service/news-service/news.service';
@Component({
  selector: 'app-create-new',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './create-new.component.html',
  styleUrl: './create-new.component.css'
})
export class CreateNewComponent {
  private fb = inject(FormBuilder);
  private newsService = inject(NewsService);
  private router = inject(Router);

  loading = signal(false);
  serverError = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    titulo: this.fb.nonNullable.control<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(120),
    ]),
    descripcion: this.fb.nonNullable.control<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(2000),
    ]),
    prioridad: this.fb.nonNullable.control<number>(3, [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
    activo: this.fb.nonNullable.control<boolean>(true),
  });

  submit(): void {
    this.serverError.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue(); // tipado exacto al form
    this.loading.set(true);

    this.newsService
      .postNew(payload)
      .subscribe({
        next: (created) => {
          // navegá a la lista o al detalle recién creado
          this.router.navigate(['/home']); // o ['/news', created.id]
        },
        error: (err) => {
          // mensaje genérico + detalle si vino del backend
          const msg =
            (err?.error?.message as string) ??
            (err?.message as string) ??
            'Error desconocido';
          this.serverError.set(`No se pudo crear la noticia: ${msg}`);
          this.loading.set(false);
        },
        complete: () => this.loading.set(false),

      });
  }
}
