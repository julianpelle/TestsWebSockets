import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { New } from '../../model/new';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  http= inject(HttpClient)
  urlBase = `http://localhost:8080/contentful/news`
  constructor() { }
  getNewsApp():Observable<New[]>{
    return this.http.get<New[]>(`${this.urlBase}/app`);
  }
  getNewsWeb():Observable<New[]>{
    return this.http.get<New[]>(`${this.urlBase}/web`);
  }
}
