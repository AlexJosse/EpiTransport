import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Ligne } from '../pages/ligne/ligne';
import { DetailLine } from '../pages/detail-line/detail-line';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NavitiaService } from '../service/navitia-service';
import {HttpModule} from '@angular/http';
import {IonicStorageModule} from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Ligne,
    DetailLine
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Ligne,
    DetailLine
  ],
  providers: [
    StatusBar,
    Storage,
    SplashScreen,
    NavitiaService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
