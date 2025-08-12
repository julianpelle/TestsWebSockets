import { inject, Injectable } from '@angular/core';
import { User } from '../../model/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http= inject(HttpClient)
  urlBase = `http://localhost:8080/api/users`
  constructor() { }
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.urlBase);
  }
  getUsersById(id: number):Observable<User>{
    return this.http.get<User>(`${this.urlBase}/${id}`);
  }
  postUser(newUser:User):Observable<User>{
    return this.http.post<User>(this.urlBase,newUser);
  }
}


