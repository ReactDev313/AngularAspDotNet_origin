import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from './msal/constants';
import { MsalService } from './msal/msal.service';
import { MsalGuard } from './msal/msal.guard';
import { MsalBroadcastService } from './msal/msal.broadcast.service';
import { MsalInterceptor } from './msal/msal.interceptor';
import { MsalInterceptorConfig } from './msal/msal.interceptor.config';
import { MsalGuardConfiguration } from './msal/msal.guard.config';
import { ProfileModule } from './profile/profile.module';
import { HeaderComponent } from './header/header.component';
import { AppConfigService } from './app-config.service';
import { BackendUrlInterceptorService } from './backend-url-interceptor.service';

export function appInit(appConfigService: AppConfigService) {
  return () => appConfigService.load();
}


function MSALInstanceFactory(appConfigService: AppConfigService): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: appConfigService.getConfig('clientId'),
      redirectUri: appConfigService.getConfig('redirectUri'),
      authority: appConfigService.getConfig('authority')
    }
  });
}

function MSALInterceptorConfigFactory(appConfigService: AppConfigService): MsalInterceptorConfig {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('api', [appConfigService.getConfig('apiScope')]);

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap,
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    ProfileModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [AppConfigService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BackendUrlInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
      deps: [AppConfigService]
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useValue: {
        interactionType: InteractionType.Popup
      } as MsalGuardConfiguration
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
      deps: [AppConfigService]
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
