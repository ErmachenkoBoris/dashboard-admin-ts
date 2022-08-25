import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { TsdErrorComponent } from './pages/error/tsd-error.component';
import { AppRoutingModule } from './app-routing.module';
import { TsdAuthInterceptorService } from './services/tsd-auth-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TsdLoaderModule } from './modules/common/loader/tsd-loader.module';
import { TsdAlertModule } from './modules/common/alert/tsd-alert.module';
import { TsdPopupModule } from './modules/common/popup/tsd-popup.module';

@NgModule({
  declarations: [AppComponent, TsdErrorComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    TsdAlertModule,
    BrowserAnimationsModule,
    TsdLoaderModule,
    HttpClientModule,
    TsdPopupModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TsdAuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
