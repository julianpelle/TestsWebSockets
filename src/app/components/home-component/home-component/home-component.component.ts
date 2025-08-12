import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [RouterModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
    router = inject(Router);

  goToNews(): void {
      this.router.navigate([`/news`]);
  }
NavigateToNews(event: Event): void {
  event.preventDefault();
  this.router.navigate(['/news']);
}

}
