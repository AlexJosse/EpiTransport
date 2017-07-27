import { Component } from '@angular/core';
import { NavitiaService } from '../../service/navitia-service';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detail-line',
  templateUrl: 'detail-line.html'
})

export class DetailLine{
    private roots: Array<{name: string, area_id: string, lines: Array<any>}>;
    private lines: Array<{name: string, code: string, type: string}>;

    constructor(private nav: NavController,
                private navitia: NavitiaService,
                private params: NavParams){
                    this.roots = [];
                    this.lines = [];
                    this.navitia.getStopPoint(this.params.data.coverage, this.params.data.line.id).subscribe(
                        data =>{
                            for (let obj of data.stop_areas){
                                this.navitia.getCoverageLine(this.params.data.coverage, obj.id).subscribe(
                                    data2 => {
                                        this.lines= [];
                                        for (let obj2 of data2.lines){
                                            this.lines.push({name: obj2.name, code: obj2.code, type: obj2.physical_modes[0].name});
                                        }
                                    this.roots.push({name: obj.name, area_id: obj.id, lines: this.lines});
                                    },
                                    err => {
                                        this.lines.push({name: "null", code: "null", type: "null"});
                                        console.log(err);
                                    });
                            }
                            /*this.roots.sort((a, b) => {
                                if (a.name < b.name) return -1;
                                if (a.name > b.name) return 1;
                                return 0;
                            });*/
                        },
                        err => {
                            console.log(err);
                        });
                        console.log(this.roots);
            }

}