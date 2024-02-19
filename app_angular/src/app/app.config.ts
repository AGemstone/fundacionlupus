import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient, withFetch } from "@angular/common/http";

import { BackendProviderService } from "./backend-provider.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations(),
    { provide: BackendProviderService },
  ],
};