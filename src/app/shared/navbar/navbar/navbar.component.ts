import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  activeUser = false;
  private sub?: Subscription;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onLogOut() {
  }
}
