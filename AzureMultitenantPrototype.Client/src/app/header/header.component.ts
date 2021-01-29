import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventMessage, EventType } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MsalBroadcastService } from '../msal/msal.broadcast.service';
import { MsalService } from '../msal/msal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  isIframe = false;
  loggedIn = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(private authService: MsalService, private msalBroadcastService: MsalBroadcastService, private router: Router) { }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    this.checkAccount();

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
        takeUntil(this._destroying$)
      )
      .subscribe((result) => {
        this.checkAccount();
      });
  }

  checkAccount() {
    this.loggedIn = this.authService.instance.getAllAccounts().length > 0;
  }

  logout(): void {
    this.authService.logout().subscribe(x => {
      this.router.navigateByUrl("/");
    });

  }

}
