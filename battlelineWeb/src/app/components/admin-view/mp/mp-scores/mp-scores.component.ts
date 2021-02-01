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


  public winpoints: number=3;
  public drawpoints: number=1;


  public inputsValid2=true;
  public inputsValid1=true;
  public verify=false;
  public verifyErr=false;
  public disableForm=false;

  public mpMatchForm: FormGroup;
  public mpTeamsForm: FormGroup;

   public mpMatches: IMpMatch[]=[];
  public  mpTeams: IMPTeam[]=[];

  public team1Name: string="";
  public team2Name: string="";


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
    console.log("submit button working")
    let userInput=this.mpMatchForm.value;
    console.log(userInput)

    let team1=this.getTeam1(<number> userInput.team1);
    let team2=this.getTeam1(<number>userInput.team2);
    

    if(team1 !=undefined && team2!=undefined){
      console.log("not undefined")
    if(userInput.team1Rounds > userInput.team2Rounds){
      team1.roundsWon+=userInput.team1Rounds;
      team1.roundsLost+=userInput.team2Rounds;
      team1.wins+=1;
      team1.points+=this.winpoints;

      team2.roundsWon+=userInput.team2Rounds;
      team2.roundsLost+=userInput.team1Rounds;
      team2.losses+=1;

    }else if(userInput.team2Rounds > userInput.team1Rounds){
      team2.roundsWon+=userInput.team2Rounds;
      team2.roundsLost+=userInput.team1Rounds;
      team2.wins+=1;
      team2.points+=this.winpoints;

      team1.roundsWon+=userInput.team1Rounds;
      team1.roundsLost+=userInput.team2Rounds;
      team1.losses+=1;

    }else{
      team1.roundsWon+=userInput.team1Rounds;
      team1.roundsLost+=userInput.team2Rounds;
      team1.points+=this.drawpoints;

      team2.roundsWon+=userInput.team2Rounds;
      team2.roundsLost+=userInput.team1Rounds;
      team2.points+=this.drawpoints;
    }
    console.log(team1);
    
    console.log(team2);
    this.databaseService.updateMpTeam(team1);
    this.databaseService.updateMpTeam(team2);
    this.verify=false;
    this.verifyErr=false;
    this.mpMatchForm.reset();
  }
  }

  onVerify(){
    let userInput=this.mpMatchForm.value;


      this.team1Name=this.getTeam(userInput.team1);
      this.team2Name=this.getTeam(userInput.team2);
      console.log(this.team1Name)
      console.log(this.team2Name)
      
    
      if(this.team1Name !="Team Not Found" && this.team2Name !="Team Not Found"){
        if(userInput.team1Rounds<0 || userInput.team1Rounds>5
          || userInput.team2Rounds<0 ||userInput.team2Rounds>5){
            this.verify=false;
            this.verifyErr=true;
          }
          else{
            this.verify=true;
            this.verifyErr=false;
            this.mpMatchForm.disable();
            
          }
      }
      else{
        this.verify=false;
        this.verifyErr=true;
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

  getTeam1(id: number){
   
    return this.mpTeams.find(i=> i.teamId==id)
   
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
