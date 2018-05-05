import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

import { ImageLoader } from 'ionic-image-loader';

import { ApiProvider } from '../../providers/api/api';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  countries:any = [];
  languages:any = [];

  countrySelect:any;
  languageSelect:any;

  currentCountry:string = "US";
  currentLanguage:string = "en";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public imageLoader: ImageLoader, public api: ApiProvider,
    private storage: Storage, public nav: Nav) {
      //this.getMovies();

      // Call this with "default" region settings.
      // this.getConfiguration();

  }

  skipSlides() {
    this.setPreferences();
    this.nav.setRoot('HomePage', {}, {animation: 'ios-transition', animate: true, direction: "forward"});
    // this.navCtrl.push('HomePage', null, {animation: 'ios-transition'});
  }

  setPreferences() {

    if (this.countrySelect != undefined && this.countrySelect != false && this.countrySelect != null) {
       this.storage.set('countryCode', this.countrySelect);
       this.currentCountry = this.countrySelect;
    } else {
      this.storage.set('countryCode', 'US');
    }

    if (this.languageSelect != undefined && this.languageSelect != false && this.languageSelect != null) {
       this.storage.set('languageCode', this.languageSelect);
       this.currentLanguage = this.languageSelect;
    } else {
      this.storage.set('languageCode', 'en');
    }


  }

  getConfiguration() {
    var api = this.api;

    api.get('configuration/countries').subscribe(res => {
      //that.createToast("Success").present();
      this.countries = res.json();
    }, err => {
      console.log(err);
    });

    api.get('configuration/languages').subscribe(res => {
      //that.createToast("Success").present();
      this.languages = res.json();

    }, err => {
      console.log(err);
    });


  }

  getMovies() {
    var api = this.api;
    var backdropList = [];

    api.get('movie/upcoming', {region: this.currentCountry, language: this.currentLanguage}).subscribe(res => {
      var moviesList = res.json()['results'];

      backdropList = [];
      for (var i = 0; i < moviesList.length; i++) {
        this.imageLoader.preload('https://image.tmdb.org/t/p/w500'+moviesList[i]['poster_path']);
        backdropList.push('https://image.tmdb.org/t/p/w780'+moviesList[i]['backdrop_path']);
      }

      for (var i = 0; i < backdropList.length; i++) {
        this.imageLoader.preload(backdropList[i]);
      }

    }, err => {
      console.log(err);
    });


    api.get('movie/now_playing', {region: this.currentCountry, language: this.currentLanguage}).subscribe(res => {
      //that.createToast("Success").present();
      var moviesList = res.json()['results'];

      backdropList = [];
      for (var i = 0; i < moviesList.length; i++) {
        this.imageLoader.preload('https://image.tmdb.org/t/p/w500'+moviesList[i]['poster_path']);
        backdropList.push('https://image.tmdb.org/t/p/w780'+moviesList[i]['backdrop_path']);
      }

      for (var i = 0; i < backdropList.length; i++) {
        this.imageLoader.preload(backdropList[i]);
      }

    }, err => {
      console.log(err);
    });

  }

  ionViewDidLoad() {

  }

}
