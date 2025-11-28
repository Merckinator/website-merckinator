import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeuix/themes/aura';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideClientHydration(withEventReplay()),
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura } }),
    ],
};
