import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController,
  ActionSheetController, LoadingController, Events, AlertController  } from 'ionic-angular';

// Animations:
import { trigger, transition, style, animate } from '@angular/animations';

import { ApiProvider } from '../../providers/api/api';

import { ImageLoader } from 'ionic-image-loader';

import { Storage } from '@ionic/storage';

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

  // API Config:
  endpoint = 'movie/upcoming';
  params: any = {region: 'US', language: 'en'};

  shouldShowCancel: boolean = true;
  searchInput:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ApiProvider, public imageLoader: ImageLoader,
    public toastCtrl: ToastController, public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController,
    private storage: Storage, public events: Events, public alertCtrl: AlertController) {

    this.storage.get('countryCode').then((val) => {
      this.params['region'] = val;
    });

    this.storage.get('languageCode').then((val) => {
      this.params['language'] = val;
      this.getMovies();
    });


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



  getMovies() {
    var api = this.api;
    var that = this;
    var backdropList = [];

    var loader = this.createLoading('Loading...');
    loader.present();

    api.get(this.endpoint, {region: 'US', language: 'en'}).subscribe(res => {
      //that.createToast("Success").present();
      this.moviesList = res.json()['results'];
      loader.dismiss();


      for (var i = 0; i < this.moviesList.length; i++) {
        this.imageLoader.preload('https://image.tmdb.org/t/p/w500'+this.moviesList[i]['poster_path']);
        backdropList.push('https://image.tmdb.org/t/p/w780'+this.moviesList[i]['backdrop_path']);
      }

      for (var i = 0; i < backdropList.length; i++) {
        this.imageLoader.preload(backdropList[i]);
      }

    }, err => {
      that.createToast('Fail').present();
      loader.dismiss();
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
           this.endpoint = 'movie/upcoming';
           this.title = "Upcoming Movies";
           this.getMovies();
         }
       },
       {
         text: 'In Theaters',
         handler: () => {
           this.filter = "theaters";
           this.endpoint = 'movie/now_playing';
           this.title = "Now Playing";
           this.getMovies();
         }
       },
       {
         text: 'About',
         handler: () => {
           let alert = this.alertCtrl.create({
             title: 'About',
             subTitle: 'This app is part of https://project52.tech/. <br /> <br /> The backend API is powered by TheMovieDB.',
             buttons: ['Ok']
           });
           alert.present();
         }
       },
       // {
       //   text: 'My Favorites',
       //   handler: () => {
       //     console.log('Favorites clicked');
       //   }
       // },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {

         }
       }
     ]
   });

   actionSheet.present();
 }

 cancelSearch(ev: any) {
   console.log(this.searchInput);
   this.events.publish('search:movieSearch', this.searchInput);
   this.filter = "upcoming";
   this.endpoint = 'movie/upcoming';
   this.title = "Upcoming Movies";
   this.getMovies();
 }

 searchMovie(ev: any) {
   var api = this.api;


   if (ev.target.value != undefined) {
     if (ev.target.value.length > 0) {
       this.title = "Search Results";
       this.events.publish('search:movieSearch', ev.target.value);
       api.get('search/movie', {region: this.params.region, language: this.params.language, query: ev.target.value}).subscribe(res => {
         this.moviesList = res.json()['results'];

       }, err => {
         console.log(err);
       });
    } else {
      this.filter = "upcoming";
      this.endpoint = 'movie/upcoming';
      this.title = "Upcoming Movies";
      this.getMovies();
    }
  } else {
    this.filter = "upcoming";
    this.endpoint = 'movie/upcoming';
    this.title = "Upcoming Movies";
    this.getMovies();
  }

 }

  movieDetails(movieData: any) {
    this.events.publish('analytics:movieClicked', movieData.title);
    let movieDetailsModal = this.modalCtrl.create('MovieDetailsPage', { 'filter': this.filter, 'movieData': movieData });
    movieDetailsModal.present();
  }

}
