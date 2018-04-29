import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,
  LoadingController, ToastController, ViewController } from 'ionic-angular';

// Animations:
import { trigger, transition, style, animate } from '@angular/animations';

// For handling form validation, email address validation, etc.
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
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
export class LoginPage {

  public signInForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder, public toastCtrl: ToastController,
    public viewCtrl: ViewController, public events: Events) {

      // building the form
    this.signInForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    this.signInForm.patchValue({'email': 'omar@quazi.co'});
    this.signInForm.patchValue({'password': '123456'});


  }

  createToast(message: string) {
    return this.toastCtrl.create({
      message,
      duration: 3000
    })
  }

  signInFormSubmit() {

     // first we check, if the form is valid
     if (!this.signInForm.valid) {
       this.createToast('Ooops, form not valid...').present();
       return
     } else {

       // if the form is valid, we continue with validation
       // this.auth.signInUser(this.signInForm.value.email, this.signInForm.value.password)
       //   .then(() => {
       //     // showing succesfull message
       //     this.createToast('Signed in with email: ' + this.signInForm.value.email).present();
       //     // closing dialog
       //     //this.viewCtrl.dismiss();
       //   },
       //
       //   /**
       //    * Handle Authentication errors
       //    * Here you can customise error messages like our example.
       //    * https://firebase.google.com/docs/reference/js/firebase.auth.Error
       //    *
       //    * mismatch with error interface: https://github.com/angular/angularfire2/issues/976
       //    */
       //   (error: any) => {
       //     switch (error.code) {
       //       case 'auth/invalid-api-key':
       //         this.createToast('Invalid API key.').present();
       //         break;
       //       default:
       //         this.createToast(error.message).present();
       //         break;
       //     }
       //   })

       // Go to home page:
       this.events.publish('user:loggedIn', true);
       //this.navCtrl.push('HomePage', null, {animation: 'ios-transition'});
     }
   }


  signup() {
    this.navCtrl.push('SignupPage', null, {animation: 'ios-transition'});
  }

  googleLogin() {
    // this.auth.loginWithGoogle();
  }

  facebookLogin() {
    // this.auth.loginWithFacebook();
  }

  twitterLogin() {
    // this.auth.loginWithTwitter();
  }

  githubLogin() {
    // this.auth.loginWithGithub();
  }

  forgotPass() {
    let prompt = this.alertCtrl.create({
      title: 'Enter Your Email',
      message: "A new password will be sent to your email",
      inputs: [
        {
          name: 'recoverEmail',
          placeholder: 'you@example.com'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {


            //add preloader
            let loading = this.loadingCtrl.create({
              dismissOnPageChange: true,
              content: 'Resetting your password..'
            });
            loading.present();
            //call usersservice
            // firebase.auth().sendPasswordResetEmail(data.recoverEmail).then(() => {
            //   //add toast
            //   loading.dismiss().then(() => {
            //     //show pop up
            //     let alert = this.alertCtrl.create({
            //       title: 'Check your email',
            //       subTitle: 'If this email address is associated with a valid user, you will receive a password reset email.',
            //       buttons: ['OK']
            //     });
            //     alert.present();
            //   })
            //
            // }, error => {
            //   //show pop up
            //   loading.dismiss().then(() => {
            //     let alert = this.alertCtrl.create({
            //       title: 'Error resetting your password',
            //       subTitle: error.message,
            //       buttons: ['OK']
            //     });
            //     alert.present();
            //   })
            //
            //
            // });
          }
        }
      ]
    });
    prompt.present();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
