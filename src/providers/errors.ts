import {Injectable} from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ErrorProvider{
    constructor(private toastCtrl: ToastController){

    }

    error(message: string){
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();

    }
}