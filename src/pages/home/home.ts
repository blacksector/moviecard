import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController,
  ActionSheetController, LoadingController } from 'ionic-angular';

// Animations:
import { trigger, transition, style, animate } from '@angular/animations';

import { ApiProvider } from '../../providers/api/api';


import { ImageLoader } from 'ionic-image-loader';

import { Globalization } from '@ionic-native/globalization';




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
  params: any = {};

  shouldShowCancel: boolean = true;
  searchInput:string = "";



  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ApiProvider, public imageLoader: ImageLoader,
    public toastCtrl: ToastController, public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController,
    public globalization: Globalization) {


    this.globalization.getPreferredLanguage().then(res => {
      // let lang = res.value.split('-')[0];
      // let reg = res.value.split('-')[1];
      // this.params = {region: reg, language: lang};
      this.params = {region: 'US', language: 'en-US'};
      this.getMovies();
    }).catch(e => {
      this.params = {region: 'US', language: 'en-US'};
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
    api.get(this.endpoint, this.params).subscribe(res => {
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
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
 }

 searchMovie(ev: any) {
   //this.searchInput = ev.target.value;
   console.log(this.searchInput);
   console.log(ev.target.value);
 }

  movieDetails(movieData: any) {
    let movieDetailsModal = this.modalCtrl.create('MovieDetailsPage', { 'filter': this.filter, 'movieData': movieData });
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
