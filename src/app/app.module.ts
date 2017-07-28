import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { Ligne } from '../pages/ligne/ligne';
import { DetailLine } from '../pages/detail-line/detail-line';
import { Isochrones } from '../pages/isochrones/isochrones';
import { DetailTrajet } from '../modal/detail-trajet/detail-trajet';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IconProvider } from '../providers/icon';
import { ErrorProvider } from '../providers/errors';
import { NavitiaService } from '../service/navitia-service';
import {HttpModule} from '@angular/http';
import {IonicStorageModule} from '@ionic/storage';

import { NativeGeocoder } from '@ionic-native/native-geocoder';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Ligne,
    DetailTrajet,
    Isochrones,
    DetailLine
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
            templateUrl: 'build/app.html',
            config: {
                mode: 'md'
            }
        })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Ligne,
    Isochrones,
    DetailTrajet,
    DetailLine
  ],
  providers: [
    StatusBar,
    Storage,
    SplashScreen,
    NavitiaService,
    NativeGeocoder,
    IconProvider,
    ErrorProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
