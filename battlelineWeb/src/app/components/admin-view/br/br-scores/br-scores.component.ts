import { IBrPlayer } from './../../../../Interfaces/IBrPlayer';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-br-scores',
  templateUrl: './br-scores.component.html',
  styleUrls: ['./br-scores.component.css']
})
export class BrScoresComponent implements OnInit {
  private playerId!: number;
  private playerName!: string;
  private rank!: number;
  private kills!: number;
  private points!: number;
  private disqualified!: boolean;

  private loginForm!: FormGroup;

  public playerList:IBrPlayer[] = [
    { "playerId": 1, "playerName": "A", "rank": 1, "kills": 10, "disqualified": false},
    { "playerId": 2, "playerName": "B", "rank": 2, "kills": 9, "disqualified": false},
    { "playerId": 3, "playerName": "C", "rank": 3, "kills": 8, "disqualified": false},
    { "playerId": 4, "playerName": "D", "rank": 4, "kills": 7, "disqualified": false}
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * findPlayer
   */
  public findPlayer(id: number) {
    return this.playerList.find(i => i.playerId == id);
  }

  private onSubmit() {
    
  }
}
