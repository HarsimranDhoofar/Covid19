import { Component, OnInit } from '@angular/core';
import{GetDataService} from '../get-data.service';
import { Subscription} from 'rxjs';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
location : any;
dataDate : any;
confirmedCases: any;
deaths: any;
recovered: any;
  constructor(private getData: GetDataService) { }

  ngOnInit(): void {
   this.getLocation();
   this.getCovid19Stats();
  }

getCovid19Stats(): void{
  this.getData.covid19Stats().subscribe((covidData)=>{
    
     //let country = covidData[this.location];
    
        if(covidData[this.location] == null){
          this.getCovid19Stats();
        }
        
        let county = covidData[this.location];
        let length =Object.keys(county).length -1;
        let todaysdata = county[length];
        this.dataDate = todaysdata['date'];
        this.confirmedCases= todaysdata['confirmed'];
        this.deaths = todaysdata['deaths'];
        this.recovered =todaysdata['recovered'];
  });

}

  getLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
        this.location =  this.getData.callApi(longitude, latitude).subscribe((locationData) =>{
          console.log(locationData);
          let results = locationData["results"];
          let resultsArray = results[0];
          let components = resultsArray["components"];
          let country = components["country"];
          this.location = country;
        });
        console.log(this.location);
        });
    } else {
       console.log("No support for geolocation")
    }
  }

  
}
