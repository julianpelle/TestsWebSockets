import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { New } from '../../model/new';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  http= inject(HttpClient)
  urlBase = `http://localhost:8080/api/news`
  constructor() { }
  getNews():Observable<New[]>{
    return this.http.get<New[]>(this.urlBase);
  }
  postNew(newPost:New):Observable<New>{
    return this.http.post<New>(this.urlBase,newPost);
  }
}
