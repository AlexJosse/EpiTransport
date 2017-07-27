import { Component } from '@angular/core';
import { NavitiaService } from '../../service/navitia-service';
import { NavController} from 'ionic-angular';
import {DetailLine} from '../detail-line/detail-line';

@Component({
  selector: 'page-ligne',
  templateUrl: 'ligne.html'
})

export class Ligne{
    private transport: string;
    private coverages: Array<{id: string, name: string}>;
    private coverage:  string;
    private lines: Array<{id: string, numero: string, name: string, type: string}>;
    private id_coverage: string;

    constructor(private navitia: NavitiaService,
                private nav: NavController){
        this.transport = "metro";
        this.coverages = [];
        this.lines = [];
        this.getListcoverage();
    }

    displayTransport(type: string, id: string): void{
        if (type == "metro"){
            this.navitia.getListSubway(id).subscribe(
                data => {
                    this.lines = [];
                    for (let obj of data.lines){
                        this.lines.push({id: obj.id, numero: obj.code, name: obj.name, type: "metro"});
                    }
                },
                err => {
                    console.log(err);
                });
        }
        else if (type == "rer"){
            this.navitia.getListTrain(id).subscribe(
                data => {
                    this.lines = [];
                    for (let obj of data.lines){
                        this.lines.push({id: obj.id, numero: obj.code, name: obj.name, type: "rer"});
                    }
                },
                err => {
                    console.log(err);
                });

        }
        else if (type == "bus"){
            this.navitia.getListBus(id).subscribe(
                data => {
                    this.lines = [];
                    for (let obj of data.lines){
                        this.lines.push({id: obj.id, numero: obj.code, name: obj.name, type: "bus"});
                    }
                },
                err => {
                    console.log(err);
                });

        }
        else if (type == "tramway"){
            this.navitia.getListStreetCar(id).subscribe(
                data => {
                    this.lines = [];
                    for (let obj of data.lines){
                        this.lines.push({id: obj.id, numero: obj.code, name: obj.name, type: "tram"});
                    }
                },
                err => {
                    console.log(err);
                });

        }

    }

    getListcoverage(): void{
        this.navitia.getListCoverage().subscribe(
            data => {
                for (let obj of data.regions){
                    if (!!obj.name){
                        this.coverages.push({id: obj.id, name: obj.name});
                    }
                }
            },
            err => {console.log(err)}
        );
    }

    load(){
        for (let i = 0; i <= this.coverages.length; i++){
            if (this.coverage == this.coverages[i].name){
                this.id_coverage = this.coverages[i].id;
                break;
            }
        }
        if (!!this.id_coverage){
            this.displayTransport(this.transport, this.id_coverage);
        }
    }

    lineSelected(line): void{
        this.nav.push(DetailLine, {line: line, coverage: this.id_coverage});   
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

    whichIcon(line): string{
        if (line.type == "rer"){
            return this.iconRerExist((line.type + " ligne" + line.numero));
        }
        else if (line.type == "tram"){
            return this.iconTramExist((line.type + " ligne" + line.numero.substring(1)).toLowerCase());
        }
        else if (line.type == "metro"){
            return this.iconSubwayExist((line.type + " ligne" + line.numero).toLowerCase());
        }
        else if (line.type == "bus"){
            return "bus";
        }
        return null;
    }
}