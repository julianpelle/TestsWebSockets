import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NewsService } from '../../../service/news-service/news.service';
import { New } from '../../../model/new';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-news-component',
  imports: [RouterModule],
  templateUrl: './news-component.component.html',
  styleUrl: './news-component.component.css'
})
export class NewsComponentComponent implements OnInit{
news: New[] = [];
socketClient: any = null;

    constructor(
    private newsService: NewsService
  ) {}


  ngOnInit(): void {
    this.obtenerNoticias();
    let ws = new SockJS('http://localhost:8080/ws');
    this.socketClient = Stomp.over(ws);


  this.socketClient.connect(
  {},                                     // headers
  (frame: any) => {                       // onConnect
    console.log('STOMP conectado:', frame);

    this.socketClient.subscribe('/topic/news', (msg: any) => {
      const payload = JSON.parse(msg.body);
      this.news = [payload, ...this.news];
    });
  },
  (err: any) => {                          // onError
    console.error('Error STOMP', err);
  }
);


  }

    private obtenerNoticias(){
      this.newsService.getNews().subscribe((newsResponse: New[]) => {
  console.log(newsResponse);
  this.news = newsResponse
});


  }

}
