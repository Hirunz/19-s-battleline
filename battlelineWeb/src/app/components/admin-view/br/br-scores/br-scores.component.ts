import { IBrPlayer } from './../../../../Interfaces/IBrPlayer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-br-scores',
  templateUrl: './br-scores.component.html',
  styleUrls: ['./br-scores.component.css']
})
export class BrScoresComponent implements OnInit {

  IBrPlayer
  
  constructor() { }

  ngOnInit(): void {
  }

}
