import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IBrPlayer } from './../../../../Interfaces/IBrPlayer';

import { DatabaseService } from 'src/app/Services/database.service';

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
  // private disqualified!: boolean;

  public brPlayersForm: FormGroup;

  public brPlayers: IBrPlayer[] = [];
  
  constructor(private databaseService: DatabaseService) { 
    // this.brPlayers=[]

    this.getPlayers();

    this.brPlayersForm = new FormGroup({
      'playerId': new FormControl({
        value: this.brPlayers.length+1000,
        disabled: true
      }),
      'playerName': new FormControl(''),
      'rank': new FormControl(''),
      'kills': new FormControl(''),
      'disqualified': new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.databaseService.addBrPlayer(this.brPlayersForm.value);
    this.brPlayersForm.reset();
    // this.brPlayersForm.
  }

  getPlayers(){
    this.databaseService.getBrPlayers().snapshotChanges().forEach(playersSnapshot=>{
      this.brPlayers=[]
       playersSnapshot.forEach(playerSnapshot=>{
          let player=<IBrPlayer>playerSnapshot.payload.toJSON();
          // console.log(player)
         if(playerSnapshot.key)
          player['$key']= playerSnapshot.key;
          this.brPlayers.push(player as IBrPlayer);
        });
    });
  }

}