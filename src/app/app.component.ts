import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController, Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ImageLoaderConfig } from 'ionic-image-loader';

import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

import { Storage } from '@ionic/storage';

import { CodePush, InstallMode, SyncStatus } from '@ionic-native/code-push';

import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = '';
  @ViewChild(Nav) nav: Nav;

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, public imageLoaderConfig: ImageLoaderConfig,
    public admob: AdMobFree, private storage: Storage,
    private codePush: CodePush,  private alertCtrl: AlertController,
    private appCenterAnalytics: AppCenterAnalytics, public events: Events) {

    this.initializeApp();

    this.initializeImageLoader();

    this.checkCodePush();

    this.analytics();

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
          // this.showBanner();
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

  checkCodePush() {

    // Check for hotfixes and apply them:
    this.codePush.sync({installMode: InstallMode.ON_NEXT_RESTART}).subscribe(
      (data) => {
        console.log('CODE PUSH SUCCESSFUL: ' + data);
      },
      (err) => {
        console.log('CODE PUSH ERROR: ' + err);
      }
    );
  }

  analytics() {
    console.log("tracker starting....")
    this.appCenterAnalytics.setEnabled(true).then(() => {
        this.appCenterAnalytics.trackEvent('App Started', {});
    });

    this.events.subscribe('analytics:movieClicked', (movieName) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.appCenterAnalytics.trackEvent('Movie Clicked', {movieName: movieName});
    });

    this.events.subscribe('analytics:trailersClicked', (movieName, trailerName) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.appCenterAnalytics.trackEvent('Trailer Clicked', {movieName: movieName, trailerName: trailerName});
    });

    this.events.subscribe('search:movieSearch', (searchValue) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.appCenterAnalytics.trackEvent('Search', {search: searchValue});
    });

  }

  showBanner() {

    let bannerConfig: AdMobFreeBannerConfig = {
      autoShow: true,
      isTesting: true, // Remove this parameter during production
      id: ''
    };

    this.admob.banner.config(bannerConfig);
    this.admob.banner.prepare().then(() => {
      this.admob.banner.show();
    }).catch(e => console.log(e));

  }

}
