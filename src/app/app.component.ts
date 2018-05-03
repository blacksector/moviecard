import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ImageLoaderConfig } from 'ionic-image-loader';

import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = '';
  @ViewChild(Nav) nav: Nav;

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, public imageLoaderConfig: ImageLoaderConfig,
    public admob: AdMobFree, private storage: Storage) {

    this.initializeApp();

    this.initializeImageLoader();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.overlaysWebView(false);
      this.statusBar.hide();
      this.splashScreen.hide();



      // Or to get a key/value pair
      this.storage.get('firstUse').then((val) => {
        if (val == false) {
          this.rootPage = 'HomePage';
          // Start the ads engine:
          this.showBanner();
        } else {
          this.storage.set('firstUse', false);
          this.storage.set('countryCode', 'US');
          this.storage.set('languageCode', 'en');
          this.rootPage = 'WelcomePage';
        }
      });

    });
  }

  initializeImageLoader() {

    // set the maximum concurrent connections to 20
    this.imageLoaderConfig.setConcurrency(20);

  }

  showBanner() {

    let bannerConfig: AdMobFreeBannerConfig = {
      autoShow: true,
      id: 'ca-app-pub-7574351163677757/5246739516'
    };

    this.admob.banner.config(bannerConfig);
    this.admob.banner.prepare().then(() => {
      this.admob.banner.show();
    }).catch(e => console.log(e));

  }

}
