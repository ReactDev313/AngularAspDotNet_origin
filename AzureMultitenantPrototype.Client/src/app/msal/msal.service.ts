import { Inject, Injectable } from "@angular/core";
import {
    IPublicClientApplication,
    AccountInfo,
    EndSessionRequest,
    AuthenticationResult,
    PopupRequest,
    SilentRequest
} from "@azure/msal-browser";
import { MSAL_INSTANCE } from "./constants";
import { Observable, from } from 'rxjs';
import { Location } from '@angular/common';

@Injectable()
export class MsalService {
  private redirectHash: string | undefined;
    constructor(
        @Inject(MSAL_INSTANCE) public instance: IPublicClientApplication,
        private location: Location
    ) {
      const hash = this.location.path(true).split('#').pop();
        if (hash) {
            this.redirectHash = `#${hash}`;
        }
    }

    acquireTokenPopup(request: PopupRequest): Observable<AuthenticationResult> {
        return from(this.instance.acquireTokenPopup(request));
    }

    acquireTokenSilent(silentRequest: SilentRequest): Observable<AuthenticationResult> {
        return from(this.instance.acquireTokenSilent(silentRequest));
    }
    getAccountByUsername(userName: string): AccountInfo | null {
        return this.instance.getAccountByUsername(userName);
    }
    getAllAccounts(): AccountInfo[] {
        return this.instance.getAllAccounts();
    }
    loginPopup(request?: PopupRequest): Observable<AuthenticationResult> {
        return from(this.instance.loginPopup(request));
    }
    logout(logoutRequest?: EndSessionRequest): Observable<void> {
        return from(this.instance.logout(logoutRequest));
    }
    handleRedirectObservable(): Observable<AuthenticationResult | null> {
      return from(this.instance.handleRedirectPromise(this.redirectHash));
  }
}
