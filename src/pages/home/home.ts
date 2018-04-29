import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController,
  ActionSheetController, LoadingController } from 'ionic-angular';

// Animations:
import { trigger, transition, style, animate } from '@angular/animations';

import { Events } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';

import { MovieDetailsPage } from '../movie-details/movie-details';

import { ImageLoader } from 'ionic-image-loader';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
        ':enter', [
          style({transform: 'translateY(30%)', opacity: 0}),
          animate('800ms', style({transform: 'translateY(0)', 'opacity': 1}))]
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

export class HomePage {

  title:any = "Upcoming Movies";

  filter:any = "upcoming";

  navColor:any = "dark";
  backgroundColor:any = "#2f3640";

  moviesList:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events: Events, public api: ApiProvider, public imageLoader: ImageLoader,
    public toastCtrl: ToastController, public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {

    events.subscribe('navigation:categoryChange', (category) => {
      // Category tells us which category to grab data for:


    });

    this.getMovies();


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

  logout() {
    this.events.publish('user:loggedIn', false);
  }

  getMovies() {
    var api = this.api;
    var that = this;
    var backdropList = [];
    var endpoint = "";

    if (this.filter == "upcoming") {
      endpoint = 'movie/upcoming';
    } else if (this.filter == "theaters") {
      endpoint = 'movie/now_playing';
    } else {
      endpoint = 'movie/upcoming';
    }
    var loader = this.createLoading('Loading...');
    loader.present();
    api.get(endpoint).subscribe(res => {
      //that.createToast("Success").present();
      this.moviesList = res.json()['results'];
      loader.dismiss();

      console.log('preloading posters first...');

      for (var i = 0; i < this.moviesList.length; i++) {
        this.imageLoader.preload('https://image.tmdb.org/t/p/w500'+this.moviesList[i]['poster_path']);
        backdropList.push('https://image.tmdb.org/t/p/w780'+this.moviesList[i]['backdrop_path']);
      }

      console.log('preloading backdrops second...');

      for (var i = 0; i < backdropList.length; i++) {
        this.imageLoader.preload(backdropList[i]);
      }

      console.log('Done preloading queries');

    }, err => {
      that.createToast('Fail').present();
    });


  }

  presentFilters() {
   let actionSheet = this.actionSheetCtrl.create({
     title: 'Filters',
     buttons: [
       {
         text: 'Upcoming',
         handler: () => {
           this.filter = "upcoming";
           this.getMovies();
         }
       },
       {
         text: 'In Theaters',
         handler: () => {
           this.filter = "theaters";
           this.getMovies();
         }
       },
       {
         text: 'My Favorites',
         handler: () => {
           console.log('Favorites clicked');
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
 }

  movieDetails(movieData: any) {
    let movieDetailsModal = this.modalCtrl.create('MovieDetailsPage', { 'movieData': movieData });
    movieDetailsModal.present();


  }

  ngAfterViewInit() {
    // let myTags = document.getElementsByClassName('dynamic-bg-color');
    // for(var i=0; i < myTags.length; i++) {
    //   myTags [i].style.backgroundColor = this.backgroundColor;
    //   // UPDATE ANYTHING ELSE YOU WANT
    //
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
