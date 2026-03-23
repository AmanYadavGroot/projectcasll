import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { Ability } from '@casl/ability';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), Ability]
};
