import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { QuizzPageComponent } from './quizz-page/quizz-page.component';
import { ClimateDataComponent } from './climate-data/climate-data.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },

  { path: 'quiz', component: QuizzPageComponent },
  { path: 'globe', component: ClimateDataComponent },


]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
