import { Component } from '@angular/core';
import { NavitiaService } from '../../service/navitia-service';
import { NavController} from 'ionic-angular';
import {DetailLine} from '../detail-line/detail-line';
import { IconProvider } from '../../providers/icon';
import { ErrorProvider } from '../../providers/errors';

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
                private nav: NavController,
                private iconProvider: IconProvider,
                private error: ErrorProvider){
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
                    this.error.error(err);
                });
        }
        else if (type == "rer"){
            this.navitia.getListTrain(id).subscribe(
                data => {
                    this.lines = [];
                    for (let obj of data.lines){
                        console.log(obj);
                        this.lines.push({id: obj.id, numero: obj.code, name: "RER " + obj.name, type: "rer"});
                    }
                },
                err => {
                    this.error.error(err);
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
                    this.error.error(err);
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
                    this.error.error(err);
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
            err => {
                this.error.error(err);
            }
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
    
    whichIcon(line): string{
        if (line.type == "rer"){
            return this.iconProvider.iconRerExist((line.type + " ligne" + line.numero));
        }
        else if (line.type == "tram"){
            return this.iconProvider.iconTramExist((line.type + " ligne" + line.numero.substring(1)).toLowerCase());
        }
        else if (line.type == "metro"){
            return this.iconProvider.iconSubwayExist((line.type + " ligne" + line.numero).toLowerCase());
        }
        else if (line.type == "bus"){
            return "bus";
        }
        return null;
    }
}