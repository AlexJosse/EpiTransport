import { Component } from '@angular/core';
import { NavitiaService } from '../../service/navitia-service';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detail-line',
  templateUrl: 'detail-line.html'
})

export class DetailLine{
    private roots: Array<{name: string, id: string, area_id: string}>;

    constructor(private nav: NavController,
                private navitia: NavitiaService,
                private params: NavParams){
                    this.roots = [];
                    this.navitia.getStopPoint(this.params.data.coverage, this.params.data.line.id).subscribe(
                        data =>{
                            for (let obj of data.stop_points){
                                this.roots.push({name: obj.name, id: obj.id, area_id: obj.stop_area.id});
                                this.navitia.getCoverageLine(this.params.data.coverage, obj.stop_area.id).subscribe(
                                    data => {

                                        console.log(data);
                                    },
                                    err => {
                                        console.log(err);
                                    });
                            }
                            this.roots.sort((a, b) => {
                                if (a.name < b.name) return -1;
                                if (a.name > b.name) return 1;
                                return 0;
                            });

                        },
                        err => {
                            console.log(err);
                        });
                }

}