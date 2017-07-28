import { Component } from '@angular/core';
import { NavitiaService } from '../../service/navitia-service';
import { NavParams } from 'ionic-angular';
import { IconProvider } from '../../providers/icon';
@Component({
  selector: 'page-detail-line',
  templateUrl: 'detail-line.html'
})

export class DetailLine{
    private roots: Array<{name: string, area_id: string, lines: Array<any>}>;
    private lines: Array<{name: string, code: string, type: string}>;
    private rootsTmp: Array<{name: string, area_id: string, lines: Array<any>}>;

    constructor(private navitia: NavitiaService,
                private params: NavParams,
                private iconProvider: IconProvider){
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
                                    this.roots.sort((a, b) => {
                                            if (a.name < b.name) return -1;
                                            if (a.name > b.name) return 1;
                                            return 0;
                                        })
                                    this.rootsTmp = this.roots;
                                    },
                                    err => {
                                        this.lines.push({name: "null", code: "null", type: "null"});
                                        console.log(err);
                                    });
                            }
                        },
                        err => {
                            console.log(err);
                        });
        }
    getItems(ev: any) {
    let val = ev.target.value;
    if (val == ''){
        this.roots = this.rootsTmp;
    }
    if (val && val.trim() != '') {
        this.roots = this.rootsTmp.filter((roots) => {
            return (roots.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }

    onClear() {
        this.roots = this.rootsTmp; 
    }

    whichIcon(line): string{
            if (line.type == "Train de banlieue / RER"){
              return this.iconProvider.iconRerExist("rer ligne" + line.code);
            }
            else if (line.type == "Métro"){
              return this.iconProvider.iconSubwayExist("metro ligne" + line.code.toLowerCase());
            }
            else if (line.type == "Tramway"){
              return this.iconProvider.iconTramExist("tram ligne" + line.code.toLowerCase());
            }
      return null;
    }
}