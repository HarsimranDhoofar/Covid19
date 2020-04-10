import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CovidNewsComponent } from './covid-news/covid-news.component';


const routes: Routes = [
  { 
    path: '', 
    component:HomePageComponent
   },
   {
     path:'covidNews',
     component: CovidNewsComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
