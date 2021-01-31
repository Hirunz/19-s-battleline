import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


import { IMpMatch } from 'src/app/Interfaces/IMpMatch';
import { IMPTeam } from 'src/app/Interfaces/IMPTeam';
import { DatabaseService } from 'src/app/Services/database.service';


@Component({
  selector: 'app-mp-scores',
  templateUrl: './mp-scores.component.html',
  styleUrls: ['./mp-scores.component.css']
})
export class MpScoresComponent implements OnInit {
  public inputsValid2=true;

  public mpMatchForm: FormGroup;
  public mpTeamsForm: FormGroup;

   public mpMatches: IMpMatch[]=[];
  public  mpTeams: IMPTeam[]=[];

  constructor(private databaseService: DatabaseService) {
    this.mpMatches=[]
    this.getTeams();

    this.mpMatchForm = new FormGroup({
      'team1': new FormControl(''),
      'team2': new FormControl('')
      ,
      'team1Rounds': new FormControl('')
      ,
      'team2Rounds': new FormControl('')
    });

    this.mpTeamsForm = new FormGroup({
      'teamName': new FormControl('')

    });

   }

  ngOnInit(): void {
    
  }


  onMatchSubmit1(): void{
    this.databaseService.addMpMatch(this.mpMatchForm.value)
    this.mpMatchForm.reset();
  }

  onTeamSubmit2(): void{
    let userInput=this.mpTeamsForm.value;

    if(this.teamExists(userInput)){
      this.inputsValid2=false;
    }
    else{
      this.inputsValid2=true;
      console.log(this.mpTeams)
      console.log(this.mpTeams.length)

      userInput.teamId= this.mpTeams.length+1001;
      userInput.points=0;
      userInput.wins=0;
      userInput.losses=0;
      userInput.roundsWon=0;
      userInput.roundsLost=0;
      userInput.disqualified=false;

      this.databaseService.addMpTeam(userInput)
      this.mpTeamsForm.reset();
    }

    
  }

  getTeams(){
    this.databaseService.getMpTeams().snapshotChanges().forEach(teamsSnapshot=>{
      this.mpTeams=[]
       teamsSnapshot.forEach(teamSnapshot=>{
          let team=<IMPTeam>teamSnapshot.payload.toJSON();
          console.log(team)
         if(teamSnapshot.key)
          team['$key']= teamSnapshot.key;
          this.mpTeams.push(team as IMPTeam);
          

        });
    });
  }

  

  teamExists(o: IMPTeam): boolean{   
    for(var team of this.mpTeams){
      if(team.teamName.toLowerCase()==o.teamName.toLowerCase()){
        return true;
      }
    }
    return false;
  }






}
