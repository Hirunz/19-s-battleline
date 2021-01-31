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
  public mpMatchForm: FormGroup
  public mpTeamsForm: FormGroup

   public mpMatches: IMpMatch[]
  public  mpTeams: IMPTeam[]

  constructor(private databaseService: DatabaseService) {
    this.mpMatches=[]
    this.mpTeams=[]

    this.mpMatchForm = new FormGroup({
      'team1': new FormControl('', [
        Validators.required
      ]),
      'team2': new FormControl('', [
        Validators.required
      ])
      ,
      'team1Rounds': new FormControl('', [
        Validators.required
      ])
      ,
      'team2Rounds': new FormControl('', [
        Validators.required
      ])
    });

    this.mpTeamsForm = new FormGroup({
      'teamId': new FormControl('', [
        Validators.required
      ]),
      'teamName': new FormControl('', [
        Validators.required
      ])

    });

   }

  ngOnInit(): void {
    
  }


  onSubmit(): void{
    console.log(this.mpTeams)
   
    this.databaseService.addMpMatch(this.mpMatchForm.value)
    this.mpMatchForm.reset();
  }

  getMatches(){
    this.databaseService.getMpMatches().snapshotChanges().forEach(matchesSnapshot=>{
      this.mpMatches=[]
       matchesSnapshot.forEach(matchSnapshot=>{
          let match=<IMpMatch>matchSnapshot.payload.toJSON();
          
         if(matchSnapshot.key)
          match['$key']= matchSnapshot.key;
          this.mpMatches.push(match as IMpMatch);
          

        });
    });
  }




}
