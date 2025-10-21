import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NewsService } from '../../../service/news-service/news.service';
import { New } from '../../../model/new';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { NewsRealtimeService } from '../../../service/NewsRealtimeService/news-realtime.service';

@Component({
  selector: 'app-news-component',
  imports: [RouterModule],
  templateUrl: './news-component.component.html',
  styleUrl: './news-component.component.css'
})
export class NewsComponentComponent implements OnInit{
news: New[] = [];
newsWeb: New[] = [];

socketClient: any = null;

    constructor(
    private newsService: NewsService,
    private wsService: NewsRealtimeService // Inyectar servicio

  ) {}


  ngOnInit(): void {
    this.obtenerNoticias();

    // Escuchar nuevas noticias
    this.wsService.newsSubject.subscribe(() => {
      this.obtenerNoticias(); // Actualizar lista

    });
  }

    private obtenerNoticias(){
      this.newsService.getNewsApp().subscribe((newsResponse: New[]) => {
  console.log(newsResponse);
  this.news = newsResponse
});

      this.newsService.getNewsWeb().subscribe((newsResponse: New[]) => {
  console.log(newsResponse);
  this.newsWeb = newsResponse
});
  }

}
