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
                    for (let obj of data){
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
                    for (let obj of data){
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
                    for (let obj of data){
                        this.lines.push({id: obj.id, numero: obj.code, name: obj.name, type: "tramway"});
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
        console.log(line);
        
    }

    whichIcon(line): string{
        return (line.type + " ligne" + line.numero).toLowerCase();
    }
}