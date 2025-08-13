import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, catchError, of } from 'rxjs';
import { ActiveUser, User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private activeUserSubject = new BehaviorSubject<ActiveUser | undefined>(undefined);
  private baseUrl = 'http://localhost:8080/api/users';
  readonly activeUser$ = this.activeUserSubject.asObservable();

  constructor(private http: HttpClient) { }



  login(username: String, email: String): Observable<boolean> {
    return this.http.get<User[]>(`${this.baseUrl}?fullname=${username}`).pipe(
      map((users) => {
        const user = users.at(0);
        if (user && user.fullname == username && user.email == email) {
          /* this.activeUser = { username: user.username, id: user.id! }; */
          this.activeUserSubject.next({ fullname: user.fullname, id: user.id! });
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  logout(): Observable<boolean> {
    /* this.activeUser = undefined; */
    this.activeUserSubject.next(undefined);
    return of(true);
  }

  signup(user: User): Observable<boolean> {
    return this.http.post<User>(this.baseUrl, user).pipe(
      map(({ id, fullname }) => {
        if (id) {
          /* this.activeUser = { id, username }; */
          this.activeUserSubject.next({id, fullname});
          return true;
        }
        return false;
      })
    );
  }

   /** (Opcional) alias del observable para compat con tu código viejo */
  auth(): Observable<ActiveUser | undefined> {
    return this.activeUser$;
  }

  // --- helpers de sesión ---
  private setSession(user: ActiveUser): void {
    this.activeUserSubject.next(user);
    localStorage.setItem('activeUser', JSON.stringify(user));
  }

  private clearSession(): void {
    this.activeUserSubject.next(undefined);
    localStorage.removeItem('activeUser');
  }

  private restoreSession(): void {
    const raw = localStorage.getItem('activeUser');
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as ActiveUser;
        this.activeUserSubject.next(parsed);
      } catch {
        localStorage.removeItem('activeUser');
      }
    }
  }
}
