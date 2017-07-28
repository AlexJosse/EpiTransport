import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NavitiaService{
    private apiUrl: string;
    private token: string;
    private headers: any;
    private options: any;

    constructor(private http: Http) {
    }

    refreshHeaders() {
        this.apiUrl = "https://api.navitia.io/v1/";
        this.token = "5b743569-c1d8-470d-9eaf-d7f1501bb71f";
        this.headers = new Headers({
            'Authorization': this.token
        });
        this.options = new RequestOptions({headers: this.headers});
    }

    getListCoverage(){
        this.refreshHeaders();
        return this.http.get(
            this.apiUrl + "coverage",
            this.options
        ).map((res: Response) => res.json());
    }

    getListBus(place: string){
        this.refreshHeaders();
         return this.http.get(
            this.apiUrl + "coverage/" + place + "/physical_modes/" + encodeURIComponent("physical_mode:Bus") +"/lines" + "/?count=300&",
            this.options
        ).map((res: Response) => res.json());
    }

    getListSubway(place: string){
        this.refreshHeaders();
         return this.http.get(
            this.apiUrl + "coverage/" + place + "/physical_modes/" + encodeURIComponent("physical_mode:Metro") +"/lines" + "/?count=300&",
            this.options
        ).map((res: Response) => res.json());
    }

    getListStreetCar(place: string){
        this.refreshHeaders();
        return this.http.get(
            this.apiUrl + "coverage/" + place + "/physical_modes/" + encodeURIComponent("physical_mode:Tramway") +"/lines" + "/?count=300&",
            this.options
        ).map((res: Response) => res.json());

    }

    getListTrain(place: string){
        this.refreshHeaders();
         return this.http.get(
            this.apiUrl + "coverage/" + place + "/physical_modes/" + encodeURIComponent("physical_mode:RapidTransit") +"/lines" + "/?count=300&",
            this.options
        ).map((res: Response) => res.json());
    }

    getStopPoint(place: string, line: string){
        this.refreshHeaders();
        return this.http.get(
        this.apiUrl +  "coverage/" + place + "/lines/" + encodeURIComponent(line) + "/stop_areas" + "/?count=80&",
        this.options
        ).map((res: Response) => res.json());
    }

    getIteneraire(from: string, to: string, datetime: string){//, date: string, datetime: string){
        this.refreshHeaders();
        return this.http.get(
            this.apiUrl + "journeys?from=" + encodeURIComponent(from) + "&to="
                                           + encodeURIComponent(to)
                                           + "&datetime=" + encodeURIComponent(datetime),
            this.options
        ).map((res: Response) => res.json());
    }

    getCoverageLine(place: string, id: string){
        this.refreshHeaders();
        return this.http.get(
            this.apiUrl + "coverage/" + place + "/stop_areas/" + encodeURIComponent(id) + "/lines",
            this.options
        ).map((res: Response) => res.json());
    }



}