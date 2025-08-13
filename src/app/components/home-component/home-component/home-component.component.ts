import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewsRealtimeService } from '../../../service/NewsRealtimeService/news-realtime.service';

@Component({
  selector: 'app-home-component',
  imports: [RouterModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent implements OnInit, OnDestroy {
  showNotification = false;
  private wsSubscription!: Subscription;
  router = inject(Router);

  constructor(
    private wsService: NewsRealtimeService
  ) {}

  ngOnInit() {
    this.wsService.connect();

    this.wsSubscription = this.wsService.newsSubject.subscribe(() => {
      this.showNotification = true;
    });
  }

  goToNewsWs() {
            this.showNotification = false;
    this.router.navigate(['/news']);
  }

  closeModal() {
    this.showNotification = false;
  }

  ngOnDestroy() {
    this.wsSubscription.unsubscribe();
  }

  goToNews(): void {
      this.router.navigate([`/news`]);
  }
NavigateToNews(event: Event): void {
  event.preventDefault();
  this.router.navigate(['/news']);
}

}
