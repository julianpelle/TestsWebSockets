import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarComponent } from "./shared/navbar/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
 title: string = 'TestsWebSockets';
  fullname: String = 'invitado';
  private sub?: Subscription;


  ngOnInit(): void {
    // Nos suscribimos al stream global


    // Si querés disparar un “auto-login” al cargar, podés llamar a login()
    // o confiar solo en restoreSession() del servicio.
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
