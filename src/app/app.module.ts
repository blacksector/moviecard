import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ApiProvider } from '../providers/api/api';

// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';

// Used for background image loading
import { IonicImageLoader } from 'ionic-image-loader';

import { BrowserTab } from '@ionic-native/browser-tab';

import { AdMobFree } from '@ionic-native/admob-free';

import { IonicStorageModule } from '@ionic/storage';

import { CodePush } from '@ionic-native/code-push';

import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot({
      "backgroundPadding": 7,
      "radius": 40,
      "space": -2,
      "outerStrokeWidth": 2,
      "outerStrokeColor": "#2E9AEE",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 2,
      "subtitleFontSize": "12",
      "animateTitle": false,
      "animationDuration": 0,
      "showUnits": true,
      "clockwise": false,
      "showSubtitle": true,
      "subtitle": "Rating"
    }),
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    HttpModule,
    IonicImageLoader.forRoot(),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    BrowserTab,
    AdMobFree,
    CodePush,
    AppCenterAnalytics
  ]
})
export class AppModule {}
