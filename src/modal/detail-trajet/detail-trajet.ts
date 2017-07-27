import { Component } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';


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
    public viewCtrl: ViewController) {
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