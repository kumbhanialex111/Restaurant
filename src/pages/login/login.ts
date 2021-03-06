import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { OneSignlProvider } from '../../providers/one-signl/one-signl';
import { App, ViewController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  model: any = {};
  loading:any;
  header_data:any;

  constructor( 
    private toastCtrl: ToastController , 
    public alertCtrl: AlertController, 
    private loadingCtrl: LoadingController , 
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public appCtrl: App,
    public navParams: NavParams,
    public auth: AuthProvider,
    public oneSignal: OneSignlProvider) {
    this.header_data={ismenu:true,ishome:false,title:"LOGIN"};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
  //  this.login()
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Enter Email',
      message: "Password will be sent to your Email id",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
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
          text: 'Ok',
          handler: data => {
            console.log(data)
            // this.home.forgotPassword(data).subscribe(data=>{
            //   if(!data){
            //     this.presentToast('Please enter valid email');
            //   }
            //   this.navCtrl.push('ResetPasswordPage')
            //   this.presentToast('Password Reset Code Has Been Sent To Email');
            // },error =>{
            //   console.log(error)
            //   this.presentToast('Account with this email is not present');
            // })
            
          }
        }
      ]
    });
    prompt.present();
    prompt.onDidDismiss((data) =>{
      
       if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))
        {
          console.log('valid')
        }else{
          this.presentToast('Please enter valid email');
        }
       // alert("You have entered an invalid email address!")
        
      
      console.log(data)
    //  this.navCtrl.push('ResetPasswordPage')
    } )
  }

  login() {
    this.showLoader();
    this.auth.login(this.model.username, this.model.password)
        .subscribe(
            data => {
              console.log('data',data);
              this.loading.dismiss();                      
            //  this.navCtrl.push('HomePage');
              // this.oneSignal.push(data["username"])
              localStorage.setItem('username', (data["username"]))
              this.navCtrl.setRoot('HomePage');
              // this.navCtrl.pop();
              // this.router.navigate([this.returnUrl]);
              // this.appCtrl.getRootNav().push('HomePage');
            },
            error => {
              console.log('error',error);
              this.loading.dismiss() 
              if(error.status === 401) {
                this.presentToast('Username or Password does not match');
              }else{
                this.presentToast('Something went wrong try again!');
              }
              console.log(error.status)
            });
  }

  signup(){
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push('ReserveTablePage');
  }

  presentToast(data) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 4000,
      position: 'bottom',
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: ''
    });

    this.loading.present();
  }

}
