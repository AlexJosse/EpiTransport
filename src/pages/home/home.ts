import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavitiaService } from '../../service/navitia-service';
import { DetailTrajet } from '../../modal/detail-trajet/detail-trajet';
import { IconProvider } from '../../providers/icon';
import { ErrorProvider } from '../../providers/errors';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  private depart: string;
  private arrive: string;
  private todo : FormGroup;
  private departLL : any;
  private arriveLL: any;
  private travelerType: string;
  private itineraires: Array<{departDate: string, arriveDate: string, duration: string, type: string, nbTransfers: string, sections: Array<any>}>;
  private lines: Array<string>;
  private dateArrive: string;
  private currentDate: string;
  private event : any; 
  
  constructor(public navCtrl: NavController,
              private nativeGeocoder: NativeGeocoder,
              private formBuilder: FormBuilder,
              private navitia: NavitiaService,
              private modalCtrl: ModalController,
              private iconProvider: IconProvider,
              private error: ErrorProvider) {
              this.currentDate = new Date().getHours().toString() + "h"+ new Date().getMinutes().toString() + "min" + new Date().getSeconds().toString() + "sec";
              this.event = {
                dateStart: this.getCurrentDate(),
                timeStart: this.getcurrentTime()
              };
              this.travelerType = "transport";
              this.itineraires = [];
              this.lines = [];
              this.departLL = {
                latitude: "",
                longitude: ""
              };
              this.arriveLL = {
                latitude: "",
                longitude: ""
              };
              this.todo = this.formBuilder.group({
                depart: [this.depart, Validators.required],
                arrive: [this.arrive, Validators.required]
               // travelerType: [this.travelerType, Validators.required]
              });
              
            }
  
  getCurrentDate(): string{
    let date = new Date();
      let result = date.getFullYear().toString() + "-";
      
      let month = date.getMonth() + 1;
      if (month < 10){
        result += "0" + month.toString() + "-";;
      }
      else if (month >= 10){
        result += month.toString() + "-";;
      }
      if (date.getUTCDate() < 10){
         
          result += "0" +  date.getUTCDate().toString();
        }
      else if (date.getUTCDate() >= 10){
          result += date.getUTCDate().toString();
        }
    return result;
  }

  getcurrentTime(): string{
    let time = new Date();
    let result = "";

    if (time.getHours() < 10){
      result += '0' + time.getHours().toString() + ":";
    }
    else if( time.getHours() >= 10){
      result += time.getHours().toString() + ":";
    }
    if (time.getMinutes() < 10){
      result += "0" + time.getMinutes().toString();
    }
    else if (time.getMinutes() >= 10){
      result += time.getMinutes().toString();
    }
    return result;
  }

  searchItenaire(): void{
    this.itineraires = [];
    this.nativeGeocoder.forwardGeocode(this.depart)
              .then((coordinates: NativeGeocoderForwardResult) =>  {
                this.departLL.latitude = coordinates.latitude;
                this.departLL.longitude =  coordinates.longitude})
              .catch((error: any) => this.error.error(error));
    this.nativeGeocoder.forwardGeocode(this.arrive)
              .then((coordinates: NativeGeocoderForwardResult) =>{
                this.arriveLL.latitude = coordinates.latitude;
                this.arriveLL.longitude = coordinates.longitude})
              .catch((error: any) => this.error.error(error));
    
    /*this.navitia.getIteneraire(this.departLL.longitude + ";" + this.departLL.latitude, 
                               this.arriveLL.longitude + ";" + this.arriveLL.latitude, this.travelerType).subscribe(*/
    this.itineraires = [];
    let datetime = this.event.dateStart.replace(/-/g, "") + "T" + this.event.timeStart.replace(/:/g, "");
    this.navitia.getIteneraire("2.302553;48.759255", 
                               "2.349791;48.884019", datetime).subscribe(
                              data => {
                                this.itineraires = [];
                                for (let obj of data.journeys){
                                  this.dateArrive =  obj.arrival_date_time.substr(obj.arrival_date_time.length - 6);
                                  this.dateArrive = this.dateArrive.slice(0, 2) + "h" + this.dateArrive.slice(2, 4) + "min" + this.dateArrive.slice(4, 6) + "sec";
                                  this.itineraires.push({departDate: this.currentDate, arriveDate: this.dateArrive, duration: obj.duration, type: obj.type,
                                                         nbTransfers: obj.nb_transfers, sections: obj.sections});
                                }
                              },
                              err => {
                                this.itineraires = [];
                                this.error.error(err);
                              })
  }

  whichIcon(section){
    if (section.type == "public_transport"){
      if (section.display_informations.physical_mode == "Train de banlieue / RER"){
        return this.iconProvider.iconRerExist("rer ligne" + section.display_informations.code);
      }
      else if (section.display_informations.physical_mode == "Métro"){
        return this.iconProvider.iconSubwayExist("metro ligne" + section.display_informations.code.toLowerCase());
      }
      else if (section.display_informations.physical_mode == "Tramway"){
        return this.iconProvider.iconTramExist("tram ligne" + section.display_informations.code.toLowerCase());
      }
    }
    return null;
  }


   openModalTrajet(iteneraire) {
     this.navCtrl.push(DetailTrajet, iteneraire);
    //let modal = this.modalCtrl.create(DetailTrajet, iteneraire);
    //modal.present();
  }
}
