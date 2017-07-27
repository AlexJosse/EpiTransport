import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavitiaService } from '../../service/navitia-service';
import { DetailTrajet } from '../../modal/detail-trajet/detail-trajet';

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
  
  constructor(public navCtrl: NavController,
              private nativeGeocoder: NativeGeocoder,
              private formBuilder: FormBuilder,
              private navitia: NavitiaService,
              private modalCtrl: ModalController) {
              this.currentDate = new Date().getHours().toString() + "h"+ new Date().getMinutes().toString() + "min" + new Date().getSeconds().toString() + "sec";
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
              this.lines.push("rer ligneA");
              this.lines.push("rer ligneB");
              this.lines.push("rer ligneC");
              this.lines.push("metro ligne16");
              
            }

  searchItenaire(): void{
    this.itineraires = [];
    this.nativeGeocoder.forwardGeocode(this.depart)
              .then((coordinates: NativeGeocoderForwardResult) =>  {
                this.departLL.latitude = coordinates.latitude;
                this.departLL.longitude =  coordinates.longitude})
              .catch((error: any) => console.log(error));
    this.nativeGeocoder.forwardGeocode(this.arrive)
              .then((coordinates: NativeGeocoderForwardResult) =>{
                this.arriveLL.latitude = coordinates.latitude;
                this.arriveLL.longitude = coordinates.longitude})
              .catch((error: any) => console.log(error));
    
    /*this.navitia.getIteneraire(this.departLL.longitude + ";" + this.departLL.latitude, 
                               this.arriveLL.longitude + ";" + this.arriveLL.latitude, this.travelerType).subscribe(*/
    this.itineraires = [];
    this.navitia.getIteneraire("2.302553;48.759255", 
                               "2.349791;48.884019").subscribe(
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
                                console.log(err);
                              })
  }

  whichIcon(section){
    if (section.type == "public_transport"){
      if (section.display_informations.physical_mode == "Train de banlieue / RER"){
        return this.iconRerExist("rer ligne" + section.display_informations.code);
      }
      else if (section.display_informations.physical_mode == "Métro"){
        return this.iconSubwayExist("metro ligne" + section.display_informations.code.toLowerCase());
      }
      else if (section.display_informations.physical_mode == "Tramway"){
        return this.iconTramExist("tram ligne" + section.display_informations.code.toLowerCase());
      }
    }
    return null;
  }


   openModalTrajet(iteneraire) {
    let modal = this.modalCtrl.create(DetailTrajet, iteneraire);
    modal.present();
  }

   iconTramExist(id: string): string{
        let exists = [
            "tram ligne1",
            "tram ligne2",
            "tram ligne3a",
            "tram ligne3b",
            "tram ligne4",
            "tram ligne5",
            "tram ligne6",
            "tram ligne7",
            "tram ligne8",
            "tram ligne9",
            "tram ligne10"];
        for (let i = 0; i < exists.length; i++){
            if (exists[i] == id){
                return id;
            }
        }
        return "tram symbole";
    }

    iconSubwayExist(id: string){
        let exists = [
            "metro ligne1",
            "metro ligne2",
            "metro ligne3",
            "metro ligne3b",
            "metro ligne4",
            "metro ligne5",
            "metro ligne6",
            "metro ligne7",
            "metro ligne7b",
            "metro ligne8",
            "metro ligne9",
            "metro ligne10",
            "metro ligne11",
            "metro ligne12",
            "metro ligne13",
            "metro ligne14",
            "metro ligne15",
            "metro ligne16",
            "metro ligne17",
            "metro ligne18",
        ];

        for (let i = 0; i < exists.length; i++){
            if (exists[i] == id){
                return id
            }
        }
        return "metro symbole";
    }

    iconRerExist(id: string){
        let exists = [
            "rer ligneA",
            "rer ligneB",
            "rer ligneC",
            "rer ligneD",
            "rer ligneE"
        ];

        for (let i = 0; i < exists.length; i++){
            if (exists[i] == id){
                return id
            }
        }
        return "rer symbole";
    }

}
