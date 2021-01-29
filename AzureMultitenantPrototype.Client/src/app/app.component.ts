import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MSAL_GUARD_CONFIG } from './msal/constants';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MsalBroadcastService } from './msal/msal.broadcast.service';
import { Router } from '@angular/router';
import { MsalGuardConfiguration } from './msal/msal.guard.config';
import { MsalService } from './msal/msal.service';
import { EventMessage, EventType } from '@azure/msal-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AzureMultitenantPrototype';

  isIframe = false;
  loggedIn = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private router: Router
  ) {}

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
    if(this.loggedIn) {
      this.router.navigateByUrl("/profile-details");
    }
  }

  login() {
    this.authService.loginPopup({...this.msalGuardConfig.authRequest, scopes:  ['user.read']})
    .subscribe(() => this.checkAccount());
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

}
