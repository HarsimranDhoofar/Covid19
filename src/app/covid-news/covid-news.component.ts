import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { News} from '../news.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-covid-news',
  templateUrl: './covid-news.component.html',
  styleUrls: ['./covid-news.component.scss']
})
export class CovidNewsComponent implements OnInit {
  news: Array<News>=[];

  constructor(private getData: GetDataService,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.getCovidNews();
  }

  getCovidNews(){
    this.getData.getNews().subscribe((covidNews)=>{
        const articles = covidNews["articles"];
        for(let i =0; i<=Object.keys(articles).length -1; i++){
          this.news.push(articles[i]);
        } 
        this.ngxService.stop(); 
    });
  }
}
