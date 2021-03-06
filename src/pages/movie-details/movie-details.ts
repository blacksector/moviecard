import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,
  LoadingController, Events } from 'ionic-angular';

// Animations:
import { trigger, transition, style, animate } from '@angular/animations';

import { ImageLoader } from 'ionic-image-loader';

import { ApiProvider } from '../../providers/api/api';

import { BrowserTab } from '@ionic-native/browser-tab';

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

  filter: string = "upcoming";

  trailers: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public imageLoader: ImageLoader, public api: ApiProvider,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public browserTab: BrowserTab, public events: Events) {
    this.movie = navParams.get('movieData');
    this.filter = navParams.get('filter');
    this.bgUrl = 'https://image.tmdb.org/t/p/w780'+this.movie.backdrop_path;

    console.log(this.movie);

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

  openVideo(trailer: any) {
    //this.openVideo(key);
    this.events.publish('analytics:trailersClicked', this.movie.title, trailer.name);
    let key = trailer;
    this.createToast('Loading trailers...').present();
    this.browserTab.isAvailable()
    .then(isAvailable => {
      if (isAvailable) {
        this.browserTab.openUrl('https://www.youtube.com/watch?v='+key);
      } else {
        // open URL with InAppBrowser instead or SafariViewController?
        
      }
    });
  }

  getTrailers() {
    var api = this.api;
    var that = this;
    var loader = this.createLoading('Loading...');
    loader.present();
    api.get('movie/'+this.movie.id+'/videos').subscribe(res => {
      this.trailers = res.json()['results'];
      for (var i = 0; i < this.trailers.length; i++) {

        this.imageLoader.preload("https://img.youtube.com/vi/"+this.trailers[i].key+"/default.jpg");

      }

      loader.dismiss();
    }, err => {
      that.createToast('Fail').present();
      loader.dismiss();
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    this.getTrailers();

  }

}
