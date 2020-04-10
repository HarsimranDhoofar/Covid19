import { Injectable } from '@angular/core';
import{HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  

  constructor(private http: HttpClient) { }

  callApi(Longitude: number, Latitude: number){
    return this.http.get(`https://api.opencagedata.com/geocode/v1/json?q=${Latitude}+${Longitude}&key=902ca8f741db4e638ec754d149d99c0c`);
  }
  covid19Stats() {
    return this.http.get(`https://pomber.github.io/covid19/timeseries.json`);
  }
}
