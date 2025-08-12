import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NewsService } from '../../../service/news-service/news.service';
import { New } from '../../../model/new';

@Component({
  selector: 'app-news-component',
  imports: [RouterModule],
  templateUrl: './news-component.component.html',
  styleUrl: './news-component.component.css'
})
export class NewsComponentComponent implements OnInit{
news: New[] = [];

    constructor(
    private newsService: NewsService
  ) {}


  ngOnInit(): void {

    this.newsService.getNews().subscribe((newsResponse: New[]) => {
  console.log(newsResponse);
  this.news = newsResponse
});


  }

}
