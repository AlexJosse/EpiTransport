import { Component } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { IconProvider } from '../../providers/icon';

@Component({
  selector: 'detail-trajet',
  templateUrl: 'detail-trajet.html'
})

export class DetailTrajet {
    private trajet: any;
    private duration: string;
    private dateArrive: string;
    private dateDepart: string;
    private durationWalk: number;
    private durationWalking: string;
    private sections: Array<any>;

    constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private iconProvider: IconProvider) {
      console.log(this.params.data);
      this.sections = this.params.data.sections;
      //this.sections.reverse();
      this.displayTimes();
    }

    displayTimes(): void{
      let hours = this.params.data.arriveDate.split('h')[0];
      let minutes = this.params.data.arriveDate.split('h').pop().split("min").shift();
      let seconds = this.params.data.arriveDate.split('min').pop().split("sec").shift();
      
      let date1 = new Date();

      date1.setHours(hours);
      date1.setMinutes(minutes);
      date1.setSeconds(seconds);
      
      this.dateArrive = hours + ":" + minutes;

      let date2 = new Date(); 

      hours = this.params.data.departDate.split('h')[0];
      minutes = this.params.data.departDate.split('h').pop().split("min").shift();
      seconds = this.params.data.departDate.split('min').pop().split("sec").shift();

      this.dateDepart = hours + ":" + minutes;
      let result = date1.getTime() - date2.getTime();
      result = 1000 * Math.round(result / 1000);
      let d = new Date(result);
      if (d.getUTCHours() > 0){
         this.duration = d.getUTCHours().toString() + " h" + d.getUTCMinutes().toString() + " min";
      }
      else{
         this.duration =  d.getUTCMinutes().toString() + " min";
      }
      this.durationWalk = 0;
      for (let obj of this.params.data.sections){
        if (obj.mode == "walking" && obj.type == "street_network"){
          this.durationWalk += obj.duration;
        }
      }
      result = 1000 * Math.round(this.durationWalk);
      d = new Date(result);
      if (d.getUTCHours() > 0){
         this.durationWalking = d.getUTCHours().toString() + " h" + d.getUTCMinutes().toString() + " min";
      }
      else{
         this.durationWalking =  d.getUTCMinutes().toString() + " min";
      }
    }

    getDurationWalk(section): string{
      if (Math.floor(section.duration.toString() / 60) > 0){
        return "durée: " + Math.floor(section.duration.toString() / 60).toString() + " min"
      }
      return "durée: " + section.duration.toString() +" sec"
    }

    getDirection(section): string{
      return section.display_informations.direction;
    }

    getRoot(section): string{
      if (Math.floor(section.duration.toString() / 60) > 0){
        return section.stop_date_times.length.toString() + " stations: " + Math.floor(section.duration.toString() / 60).toString() + " min"
      }
      return section.stop_date_times.length.toString() + " stations: " + section.duration.toString() + " sec"
    }

    getTimeDepart(section): string{
      let timeArrive = section.departure_date_time.substr(section.departure_date_time.length - 6);
      let timeArrivetmp = new Date();
      timeArrivetmp.setHours(timeArrive.slice(0, 2));
      timeArrivetmp.setMinutes(timeArrive.slice(2, 4));
      timeArrivetmp.setSeconds(timeArrive.slice(4, 6));
      let minutes = timeArrivetmp.getUTCMinutes().toString();
      let hours = timeArrivetmp.getHours().toString();
      if (timeArrivetmp.getHours().toString().length == 1){
        hours = "0" + timeArrivetmp.getHours().toString();
      }
      if (timeArrivetmp.getMinutes().toString().length == 1){
        minutes = "0" + timeArrivetmp.getMinutes().toString();
      }
      return (hours + ":" + minutes);
    }

    getTimeWaiting(section): string{
      if (Math.floor(section.duration.toString() / 60) > 0){
        return Math.floor(section.duration.toString() / 60).toString() + " minutes"
      }
      return section.duration.toString() +" secondes"
    }

    isWaiting(section): string{
      if (section.type == "waiting"){
        return null;
      }
      return "not null";
    }

    getTimeArrive(section): string{
      let timeArrive = section.arrival_date_time.substr(section.arrival_date_time.length - 6);
      let timeArrivetmp = new Date();
      timeArrivetmp.setHours(timeArrive.slice(0, 2));
      timeArrivetmp.setMinutes(timeArrive.slice(2, 4));
      timeArrivetmp.setSeconds(timeArrive.slice(4, 6));
      let minutes = timeArrivetmp.getUTCMinutes().toString();
      let hours = timeArrivetmp.getHours().toString();
      if (timeArrivetmp.getHours().toString().length == 1){
        hours = "0" + timeArrivetmp.getHours().toString();
      }
      if (timeArrivetmp.getMinutes().toString().length == 1){
        minutes = "0" + timeArrivetmp.getMinutes().toString();
      }
      return (hours + ":" + minutes);
    }

    isValid(section): string{
      if (section.type == "street_network" || section.type == "public_transport"){
        return "non null";
      }
      return null;
    }
    from(section): string{
      if (section.type == "street_network" || section.type == "public_transport"){
        return (section.from.name);
      }
    }

    to(section): string{
      if (section.type == "street_network" || section.type == "public_transport"){
        return (section.to.name);
      }
    }

    back() {
      this.viewCtrl.dismiss();
    }
    
    isWalking(section): string{
      if (section.mode == "walking" && section.type == "street_network"){
        return "walk";
      }
    }

    whichIcon(section): string{
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
}