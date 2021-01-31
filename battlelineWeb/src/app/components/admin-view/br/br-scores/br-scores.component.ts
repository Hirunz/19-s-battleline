import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IBrPlayer } from './../../../../Interfaces/IBrPlayer';

import { DatabaseService } from 'src/app/Services/database.service';

@Component({
  selector: 'app-br-scores',
  templateUrl: './br-scores.component.html',
  styleUrls: ['./br-scores.component.css']
})


//---------------------------------
// TODO: Add/Update use one form.
//---------------------------------

export class BrScoresComponent implements OnInit {
  public playerInputValidity=true;
  public disqualifiedInputValidity=true;
  public brPlayersForm: FormGroup;
  public brPlayers: IBrPlayer[] = [];

  constructor(private databaseService: DatabaseService) { 
    // this.brPlayers=[]
    this.getPlayers();    
    this.brPlayersForm = new FormGroup({
      // 'playerId': new FormControl({
      //   value: "-",
      //   disabled: true
      // }),
      'playerName': new FormControl(''),
      'rank': new FormControl(''),
      'kills': new FormControl(''),
      'disqualified': new FormControl('0'),
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    let userInput=this.brPlayersForm.value;

    if(this.teamExists(userInput)){
      this.playerInputValidity=false;
    } else if (userInput.disqualified < 0 || userInput.disqualified > 1) {
      this.disqualifiedInputValidity=false;
    } else {

      this.disqualifiedInputValidity=true;
      this.playerInputValidity=true;

      
      if (userInput.disqualified == 1){
        userInput.disqualified = true;
      } else {
        userInput.disqualified = false;
      }
      
      userInput.playerId= this.brPlayers.length+1001;

      //------------------------POINT FORMULA--------------------------------- 
      userInput.points = 101-userInput.rank;
      //----------------------------------------------------------------------

      this.databaseService.addBrPlayer(userInput);
      this.brPlayersForm.reset();
      this.brPlayersForm = new FormGroup({
        // 'playerId': new FormControl({
        //   value: "-",
        //   disabled: true
        // }),
        'disqualified': new FormControl('0'),
      });
    }

    // this.databaseService.addBrPlayer(this.brPlayersForm.value);
    // this.brPlayersForm.reset();
  }

  update(): void{
    
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

  teamExists(o: IBrPlayer): boolean{   
    for(var player of this.brPlayers){
      if(player.playerName.toLowerCase()==o.playerName.toLowerCase()){
        return true;
      }
    }
    return false;
  }
}