import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { QuizzPageComponent } from './quizz-page/quizz-page.component';
import { ClimateDataComponent } from './climate-data/climate-data.component';
import { SurveyModule } from "survey-angular-ui";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    QuizzPageComponent,
    ClimateDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SurveyModule,
    NgbModule
    ,
    HttpClientModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
