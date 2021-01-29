import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { MsalService } from './msal.service';
import { Minimatch } from "minimatch";
import { AuthenticationResult } from "@azure/msal-browser";
import { Injectable, Inject } from '@angular/core';
import { MSAL_INTERCEPTOR_CONFIG } from './constants';
import { MsalInterceptorConfig } from './msal.interceptor.config';

@Injectable()
export class MsalInterceptor implements HttpInterceptor {
  constructor(
      @Inject(MSAL_INTERCEPTOR_CONFIG) private msalInterceptorConfig: MsalInterceptorConfig,
      private authService: MsalService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const scopes = this.getScopesForEndpoint(req.url);
      const account = this.authService.getAllAccounts()[0];

      if (!scopes || scopes.length === 0) {
          return next.handle(req);
      }

       // Note: For MSA accounts, include openid scope when calling acquireTokenSilent to return idToken
       return this.authService.acquireTokenSilent({...this.msalInterceptorConfig.authRequest, scopes, account})
       .pipe(
           catchError(() => {
              return this.authService.acquireTokenPopup({...this.msalInterceptorConfig.authRequest, scopes});
           }),
           switchMap((result: AuthenticationResult) => {
               const headers = req.headers
                   .set("Authorization", `Bearer ${result.accessToken}`);

               const requestClone = req.clone({headers});
               return next.handle(requestClone);
           })
       );

      // Note: For MSA accounts, include openid scope when calling acquireTokenSilent to return idToken
      // return this.authService.acquireTokenSilent({...this.msalInterceptorConfig.authRequest, scopes, account})
      //     .pipe(
      //         catchError((x) => {
      //           console.log(x);
      //           return this.authService.acquireTokenPopup({...this.msalInterceptorConfig.authRequest, scopes});
      //         }),
      //         tap(x=> console.log(x.accessToken)),
      //         mergeMap((result: AuthenticationResult) => {
      //             const headers = req.headers
      //                 .set('Authorization', `Bearer ${result.accessToken}`);

      //             const requestClone = req.clone({headers});
      //             return next.handle(requestClone);
      //         })
      //     );

  }

  private getScopesForEndpoint(endpoint: string): Array<string>|null|undefined {
      const protectedResourcesArray = Array.from(this.msalInterceptorConfig.protectedResourceMap.keys());
      const keyMatchesEndpointArray = protectedResourcesArray.filter(key => {
          const minimatch = new Minimatch(key);
          return minimatch.match(endpoint) || endpoint.indexOf(key) > -1;
      });

      // process all protected resources and send the first matched resource
      if (keyMatchesEndpointArray.length > 0) {
          const keyForEndpoint = keyMatchesEndpointArray[0];
          if (keyForEndpoint) {
              return this.msalInterceptorConfig.protectedResourceMap.get(keyForEndpoint);
          }
      }

      return null;
  }

}
