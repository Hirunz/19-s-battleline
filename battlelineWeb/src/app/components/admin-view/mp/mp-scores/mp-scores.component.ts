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
  public inputsValid1=true;
  public verify=false;

  public mpMatchForm: FormGroup;
  public mpTeamsForm: FormGroup;

   public mpMatches: IMpMatch[]=[];
  public  mpTeams: IMPTeam[]=[];

  public team1Name: string=""
  public team2Name: string=""

  constructor(private databaseService: DatabaseService) {
    this.getMatches();
    this.getTeams();

    this.mpMatchForm = new FormGroup({
      'team1': new FormControl(''),
      'team1Name': new FormControl({value: this.team1Name, disabled: true}),
      'team2': new FormControl(''),
      'team2Name': new FormControl({value: this.team2Name, disabled: true}),
      'team1Rounds': new FormControl(''),
      'team2Rounds': new FormControl(''),
      
      
    });

    this.mpTeamsForm = new FormGroup({
      'teamName': new FormControl('')

    });

   }

  ngOnInit(): void {
    
  }


  async onMatchSubmit(){
    let userInput=this.mpMatchForm.value;

    // if()
    await this.databaseService.addMpMatch(this.mpMatchForm.value)
    this.mpMatchForm.reset();
  }

  onVerify(){
    let userInput=this.mpMatchForm.value;


      this.team1Name=this.getTeam(userInput.team1);
      this.team2Name=this.getTeam(userInput.team2);
      console.log(this.team1Name)
      console.log(this.team2Name)
      
    
      if(this.team1Name !="Team Not Found" && this.team2Name !="Team Not Found"){
        this.verify=true;
      }
      else{
        this.verify=false;
      }
    
  }



  async onTeamSubmit(){
    let userInput=this.mpTeamsForm.value;
    console.log(userInput.value)

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

  async getTeams(){
   await this.databaseService.getMpTeams().snapshotChanges().forEach(teamsSnapshot=>{
      this.mpTeams=[]
       teamsSnapshot.forEach(teamSnapshot=>{
          let team=<IMPTeam>teamSnapshot.payload.toJSON();
         if(teamSnapshot.key)
          team['$key']= teamSnapshot.key;
          this.mpTeams.push(team as IMPTeam);
          

        });
    });
   
  }

  async getMatches(){
    await this.databaseService.getMpMatches().snapshotChanges().forEach(matchesSnapshot=>{
      this.mpMatches=[]
      matchesSnapshot.forEach(matchSnapshot=>{
          let match=<IMpMatch>matchSnapshot.payload.toJSON();
          console.log(match)
         if(matchSnapshot.key)
         match['$key']= matchSnapshot.key;
          this.mpMatches.push(match as IMpMatch);
        });
    });
   
  }


  getTeam(id: number){
    for(var team of this.mpTeams){
      if(team.teamId==id){
        return team.teamName;
      }
    }
    return "Team Not Found";
  }

  teamExists2(id: number){
    for(var team of this.mpTeams){
      if(team.teamId==id){
        return true;
      }
    }
    return false;
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
