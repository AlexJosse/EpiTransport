import { Component } from '@angular/core';
import { NavitiaService } from '../../service/navitia-service';

@Component({
  selector: 'page-ligne',
  templateUrl: 'ligne.html'
})

export class Ligne{
    private transport: string;
    private coverages: Array<{id: string, name: string}>;
    private coverage:  string;
    private lines: Array<{id: string, numero: string, name: string}>;

    constructor(private navitia: NavitiaService){
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
                    for (let obj of data){
                        this.lines.push({id: obj.id, numero: obj.code, name: obj.name});
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
                        this.lines.push({id: obj.id, numero: obj.code, name: obj.name});
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
                        this.lines.push({id: obj.id, numero: obj.code, name: obj.name});
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
                        this.lines.push({id: obj.id, numero: obj.code, name: obj.name});
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
        let id: string;
        for (let i = 0; i <= this.coverages.length; i++){
            if (this.coverage == this.coverages[i].name){
                id = this.coverages[i].id;
                break;
            }
        }
        if (!!id){
            this.displayTransport(this.transport, id);
        }
    }

    lineSelected(line): void{
        
    }
}