import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import {HeaderContentComponentModule} from '../../components/header-content/header-content.module';


@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    HeaderContentComponentModule
  ],
})
export class LoginPageModule {}
