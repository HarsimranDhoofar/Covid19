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
locationNotAllowed: boolean;
  constructor(private getData: GetDataService,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.getLocation();
    
  }

getCovid19Stats(): void{
  this.getData.covid19Stats().subscribe((covidData)=>{
    let country ="";
    if(typeof(this.location) == "undefined"){
      this.locationNotAllowed = true;
       country =covidData["Canada"];
       this.location = "Canada"
    }
    else{
      this.locationNotAllowed = false;
       country = covidData[this.location];
    }
        let length =Object.keys(country).length -1;
        let todaysdata = country[length];
        this.dataDate = todaysdata['date'];
        this.confirmedCases= todaysdata['confirmed'];
        this.deaths = todaysdata['deaths'];
        this.recovered =todaysdata['recovered'];
        this.ngxService.stop();
  });

}

  getLocation(): void{
        navigator.geolocation.getCurrentPosition((position)=>{
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
        this.location =  this.getData.callApi(longitude, latitude).subscribe((locationData) =>{
          let results = locationData["results"];
          let resultsArray = results[0];
          let components = resultsArray["components"];
          let country = components["country"];
          this.location = country;
            this.getCovid19Stats(); 
        });
        
        },
        (failure) => {
      
          this.getCovid19Stats(); 
          
        });
      }
       
    
  }

  

