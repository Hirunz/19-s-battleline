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

  public brPlayers: IBrPlayer[];
  
   checked = false;

  constructor(private databaseService: DatabaseService) { 
    this.brPlayers=[]

    this.brPlayersForm = new FormGroup({
      'playerId': new FormControl(''),
      'playerName': new FormControl(''),
      'rank': new FormControl(''),
      'kills': new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    console.log(this.checked)
    this.databaseService.addBrPlayer(this.brPlayersForm.value);
    this.brPlayersForm.reset();
  }

  getPlayers(){
    this.databaseService.getBrPlayers().snapshotChanges().forEach(playersSnapshot=>{
      this.brPlayers=[]
       playersSnapshot.forEach(matchSnapshot=>{
          let match=<IBrPlayer>matchSnapshot.payload.toJSON();
          
         if(matchSnapshot.key)
          match['$key']= matchSnapshot.key;
          this.brPlayers.push(match as IBrPlayer);
          

        });
    });
  }

}