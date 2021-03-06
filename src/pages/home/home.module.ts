import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import { IonicImageLoader } from 'ionic-image-loader';

import { AdMobFree } from '@ionic-native/admob-free';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    IonicImageLoader
  ],
  providers: [
    AdMobFree
  ]
})
export class HomePageModule {}
