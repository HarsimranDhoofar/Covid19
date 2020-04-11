import { Component, OnInit } from '@angular/core';
import{GetDataService} from '../get-data.service';
import { Subscription} from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
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
  constructor(private getData: GetDataService,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.start();
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
        this.ngxService.stop();
  });

}

  getLocation(): void{
    if (navigator.geolocation) {
      if(navigator.geolocation == null){
        this.ngxService.stop();
         alert("Please grant access to location if you want to use all the features on this site");
        this.getLocation();
      }
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
    }
    else{
      this.ngxService.stop();
       alert("Please grant access to location if you want to use all the features on this site");
      this.getLocation();
    }
  }

  
}
