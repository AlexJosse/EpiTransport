import {Injectable} from '@angular/core';

@Injectable()
export class IconProvider{
    constructor(){

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