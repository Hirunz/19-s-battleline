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
// TODO: 
//---------------------------------

export class BrScoresComponent implements OnInit {
  
  // Component visibilities
  public verifyVisibility=false;
  public addVisibility=true;
  public showEmptyValueError=false;
  
  public brPlayersForm: FormGroup;
  public team1Disqualified:boolean=false;
  public brPlayers: IBrPlayer[] = [];

  // Labels
  public playerId = 0;
  public playerName = "";
  public playerRank = 0;
  public kills = 0;
  public points = 0;
  public disqualified = false;
  private playerExists : boolean = false;
  private player : IBrPlayer = {
    playerId :  0,
    playerName : this.playerName,
    rank : this.playerRank,
    kills : this.kills,
    points : this.points,
    disqualified : this.disqualified,
  };

  constructor(private databaseService: DatabaseService) { 
    this.getPlayers();    
    this.brPlayersForm = new FormGroup({
      'playerId': new FormControl({value: '', disabled: true}),
      'playerName': new FormControl(''),
      'rank': new FormControl(''),
      'kills': new FormControl(''),
      'points': new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onSubmit(buttonType?: string): void{
    let userInput=this.brPlayersForm.value;
    
    // add player button action
    if(!this.validateForm()) {
      this.showEmptyValueError = false;

      if(buttonType=="addPlayer"){
        var playerArrIndex = this.playerIndex(userInput);
        
        if(playerArrIndex == -1){
          this.playerExists = false;

          //------------------------POINT FORMULA--------------------------------- 
          this.points = 101-userInput.rank;
          //----------------------------------------------------------------------
          
          // auto increment player id and set disqaulifed value
          this.playerId = this.brPlayers.length+1001;
          userInput.disqualified = this.disqualified;
          
        } else {
          this.playerExists = true;
          this.player = this.brPlayers[playerArrIndex];
          //------------------------POINT FORMULA--------------------------------- 
          this.player.points = this.player.points + (101-userInput.rank);
          this.points = this.player.points;
          //----------------------------------------------------------------------
          this.player.kills = this.player.kills + (userInput.kills);
          this.player.disqualified = this.disqualified;
        }
        // display verify button
        this.verifyVisibility = true;
        this.addVisibility = false;
      }

      userInput.points = this.points;
      userInput.playerId = this.playerId;
      console.log(userInput)

      // set text values to confirm
      this.playerName = userInput.playerName;
      this.playerRank = userInput.rank;
      this.kills = userInput.kills;
      this.brPlayersForm.disable();
      
      // verify button action
      if (buttonType == "verify"){
        
        if(this.playerExists){
          console.log(this.points)
          this.databaseService.updateBrPlayer(this.player);
        } else {
          console.log(userInput)
          this.databaseService.addBrPlayer(userInput);
        }

        this.brPlayersForm.reset();
        this.verifyVisibility = false;
        this.addVisibility = true;
        // set text values to confirm
        this.playerName = "";
        this.playerRank = 0;
        this.kills = 0;
        this.points = 0;
        this.disqualified = false;
        this.brPlayersForm.enable();

      }
    } else {
      this.showEmptyValueError = true;
    }
  }

  getPlayers(){
    this.databaseService.getBrPlayers().snapshotChanges().forEach(playersSnapshot=>{
      this.brPlayers=[]
       playersSnapshot.forEach(playerSnapshot=>{
          let player=<IBrPlayer>playerSnapshot.payload.toJSON();
         if(playerSnapshot.key)
          player['$key']= playerSnapshot.key;
          this.brPlayers.push(player as IBrPlayer);
        });
    });
  }
  
  onDisqualified(isChecked: boolean){
    this.disqualified = isChecked;
  }

  private playerIndex(o: IBrPlayer): number{
    for(var i=0; i < this.brPlayers.length; i++){
      var player = <IBrPlayer>this.brPlayers[i];
      if(player.playerName.toLowerCase()==o.playerName.toLowerCase()){
        return i;
      }
    }
    return -1;
  }

  private validateForm() : boolean{
    let userInput=this.brPlayersForm.value;
    if (userInput.playerName=="" || userInput.rank.length==0 || userInput.kills.length==0){
      return true;
    }
    return false;
  }
}