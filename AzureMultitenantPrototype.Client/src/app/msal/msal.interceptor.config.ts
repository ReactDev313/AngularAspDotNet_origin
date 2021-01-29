import { PopupRequest, RedirectRequest, InteractionType } from '@azure/msal-browser';

export type MsalInterceptorConfig = {
    interactionType: InteractionType.Popup;
    protectedResourceMap: Map<string, Array<string>>;
    authRequest?: PopupRequest;
};
