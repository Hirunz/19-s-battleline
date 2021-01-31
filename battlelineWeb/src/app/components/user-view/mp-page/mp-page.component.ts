import { Component, OnInit } from '@angular/core';
import { IMpMatch } from 'src/app/Interfaces/IMpMatch';
import { IMPTeam } from 'src/app/Interfaces/IMPTeam';
import { DatabaseService } from 'src/app/Services/database.service';

@Component({
  selector: 'app-mp-page',
  templateUrl: './mp-page.component.html',
  styleUrls: ['./mp-page.component.css']
})
export class MpPageComponent implements OnInit {

  public mpTeams: IMPTeam[];
  public columns: string[]=["id","name","points","wins","losses","roundsWon","roundsLost"];

  
  constructor(private databaseService: DatabaseService) {
    this.mpTeams=[];
    this.getTeams();
   }

  ngOnInit(): void {
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
    // console.log(this.mpTeams)
  }
}
