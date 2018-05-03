import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ImageLoader } from 'ionic-image-loader';

import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public imageLoader: ImageLoader, public api: ApiProvider) {
      this.getMovies();
  }

  skipSlides() {
    this.navCtrl.push('HomePage', null, {animation: 'ios-transition'});
  }

  getMovies() {
    var api = this.api;
    var backdropList = [];

    api.get('movie/upcoming', {region: 'US', language: 'en-US'}).subscribe(res => {
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


    api.get('movie/now_playing', {region: 'US', language: 'en-US'}).subscribe(res => {
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
    console.log('ionViewDidLoad WelcomePage');
  }

}
