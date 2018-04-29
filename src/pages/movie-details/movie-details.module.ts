import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovieDetailsPage } from './movie-details';

import { IonicImageLoader } from 'ionic-image-loader';

import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    MovieDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MovieDetailsPage),
    IonicImageLoader,
    NgCircleProgressModule
  ],
})
export class MovieDetailsPageModule {}
