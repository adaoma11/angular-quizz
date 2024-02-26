import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title:string = '';
  questions:{}[] = [];
  selectedQuestion:any;
  answers:string[] = [];
  result:string = '';
  questionsIndex:number = 0;
  finished:boolean = false;

  nextStep(optionAlias:string):void {
    this.answers.push(optionAlias);
    if(this.questionsIndex < this.questions.length -1) {
      this.questionsIndex++;
      this.selectedQuestion = this.questions[this.questionsIndex];
    } else {
      this.finished = true;
      this.result = quizz_questions.results
        [this.verifyResult(this.answers) as keyof typeof quizz_questions.results];
    }
  }

  verifyResult(arr:string[]):string {
    let optA:number = 0;
    let optB:number = 0;

    for(let opt of arr) {
      if(opt === 'a') {
        optA++;
      } else if (opt === 'b') {
        optB++;
      }
    }

    if(optA > optB) {
      return 'A';
    } else if(optA < optB) {
      return 'B';
    } else {
      return '';
    }
  }

  constructor() {}

  ngOnInit(): void {
    if(quizz_questions) {
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.selectedQuestion = this.questions[this.questionsIndex];
      this.finished = false;
    }
  }

}
