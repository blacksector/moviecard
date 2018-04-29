import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

// Animations:
import { trigger, transition, style, animate } from '@angular/animations';

import { ImageLoader } from 'ionic-image-loader';

import { ApiProvider } from '../../providers/api/api';

import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

/**
 * Generated class for the MovieDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html',
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
        ':enter', [
          style({transform: 'translateY(30%)', opacity: 0}),
          animate('500ms', style({transform: 'translateY(0)', 'opacity': 1}))]
        // )
        ),
        transition(
        ':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('500ms', style({transform: 'translateX(100%)', 'opacity': 0}))]
        )
      ]
    )
  ]
})
export class MovieDetailsPage {

  movie: any;

  bgUrl: string = "../assets/imgs/bg.png";

  trailers: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public imageLoader: ImageLoader, public api: ApiProvider,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public youtube: YoutubeVideoPlayer) {
    this.movie = navParams.get('movieData');
    this.bgUrl = 'https://image.tmdb.org/t/p/w780'+this.movie.backdrop_path;


  }

  createToast(message: string) {
    return this.toastCtrl.create({
      message,
      duration: 3000
    })
  }

  createLoading(message: string) {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading...'
    });
    return loading;
  }

  openVideo(key: string) {
    this.youtube.openVideo(key);
  }

  getTrailers() {
    var api = this.api;
    var that = this;
    var loader = this.createLoading('Loading...');
    loader.present();
    api.get('movie/'+this.movie.id+'/videos').subscribe(res => {
      this.trailers = res.json()['results'];
      loader.dismiss();
      // this.moviesList = res.json()['results'];
      // console.log(this.moviesList);
      // loader.dismiss();
      //
      // console.log('preloading posters first...');
      //
      // for (var i = 0; i < this.moviesList.length; i++) {
      //   this.imageLoader.preload('https://image.tmdb.org/t/p/w500'+this.moviesList[i]['poster_path']);
      //   backdropList.push('https://image.tmdb.org/t/p/w780'+this.moviesList[i]['backdrop_path']);
      // }
      //
      // console.log('preloading backdrops second...');
      //
      // for (var i = 0; i < backdropList.length; i++) {
      //   this.imageLoader.preload(backdropList[i]);
      // }
      //
      // console.log('Done preloading queries');

    }, err => {
      that.createToast('Fail').present();
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    this.getTrailers();
    console.log('ionViewDidLoad MovieDetailsPage');
  }

}
