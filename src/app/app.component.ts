import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';
  @ViewChild(Nav) nav: Nav;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public events: Events) {

    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.hide();
      this.statusBar.overlaysWebView(false);
      this.statusBar.hide();
      // this.statusBar.backgroundColorByHexString("#c23616");
      // statusBar.backgroundColorByHexString("#33000000");

      this.splashScreen.hide();

      this.events.subscribe('user:loggedIn', (loggedIn) => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        if (loggedIn) {
          this.rootPage = 'HomePage';
        } else {
          this.rootPage = 'LoginPage';
        }
      });
    });
  }

}
