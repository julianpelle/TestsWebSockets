import { Component } from '@angular/core';
import { NewsComponentComponent } from "../../../components/news-component/news-component/news-component.component";

@Component({
  selector: 'app-news-page',
  imports: [NewsComponentComponent],
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.css'
})
export class NewsPageComponent {

}
