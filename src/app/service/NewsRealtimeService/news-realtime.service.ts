import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsRealtimeService {
  private stompClient: any;
  public newsSubject = new Subject<void>();

  connect() {
    const ws = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/news', () => {
        this.newsSubject.next(); // Notificar a los suscriptores
      });
    });
  }
}
