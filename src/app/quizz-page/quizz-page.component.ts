import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Survey from 'survey-angular'; // Ensure SurveyJS is imported correctly

@Component({
  selector: 'app-quizz-page',
  templateUrl: './quizz-page.component.html',
  styleUrls: ['./quizz-page.component.css']
})
export class QuizzPageComponent  implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('assets/questions.json').subscribe(
      (data: any) => {
        const survey = new Survey.Model(data);
        Survey.SurveyNG.render("surveyContainer", { model: survey });

        survey.onComplete.add((sender) => {
          // Survey completion logic
          const surveyData = sender.data;
          console.log(surveyData); // For now, just log the result
        });
      },
      (error) => {
        console.error('Error fetching quiz data:', error);
      }
    );
  }
}
