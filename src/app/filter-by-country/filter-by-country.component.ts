import { Component, OnInit } from '@angular/core';
import{GetDataService} from '../get-data.service';
@Component({
  selector: 'app-filter-by-country',
  templateUrl: './filter-by-country.component.html',
  styleUrls: ['./filter-by-country.component.scss']
})
export class FilterByCountryComponent implements OnInit {
  countryArray : any;
  dataDate : any;
confirmedCases: any;
deaths: any;
recovered: any;
country: any;
  constructor(private getData: GetDataService) { }

  ngOnInit(): void {
    this.getCovid19Stats();
  }
  getCovid19Stats(): void{
    this.getData.covid19Stats().subscribe((covidData)=>{
    this.countryArray = Object.keys(covidData)
    });
  }
  SelectedCountry(country){
    this.country = country
    this.getData.covid19Stats().subscribe((covidData)=>{
      let county = covidData[country];
      let length =Object.keys(county).length -1;
      let todaysdata = county[length];
      this.dataDate = todaysdata['date'];
      this.confirmedCases= todaysdata['confirmed'];
      this.deaths = todaysdata['deaths'];
      this.recovered =todaysdata['recovered'];
    });
  }
}
