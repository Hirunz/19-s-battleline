import { Component, OnInit, ViewChild } from '@angular/core';
import { IMpMatch } from 'src/app/Interfaces/IMpMatch';
import { IMPTeam } from 'src/app/Interfaces/IMPTeam';
import { DatabaseService } from 'src/app/Services/database.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mp-page',
  templateUrl: './mp-page.component.html',
  styleUrls: ['./mp-page.component.css']
})
export class MpPageComponent implements OnInit {

  public mpTeams!: IMPTeam[];
  public columns: string[]=["id","name","points","wins","losses","roundsWon","roundsLost"];
  tableData = new MatTableDataSource(this.mpTeams);

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  
  constructor(private databaseService: DatabaseService) {
    this.mpTeams=[];
    this.getTeams();
   }

  ngOnInit() {

    this.tableData.sort=this.sort;
    this.getTeams();
    // console.log(this.tableData.data)
  }

  getTeams(){
    this.databaseService.getMpTeams().snapshotChanges().forEach(teamsSnapshot=>{
      this.mpTeams=[]
       teamsSnapshot.forEach(teamSnapshot=>{
          let team=<IMPTeam>teamSnapshot.payload.toJSON();
          // console.log(team)
        if(teamSnapshot.key){
          team['$key']= teamSnapshot.key;
          this.mpTeams.push(team as IMPTeam);
          const data = this.mpTeams;
          this.tableData.data = data;
          // console.log("Test 0 " + this.tableData.data)
        }
        // console.log("Test 1 " + this.tableData.data)
      });
      console.log("Test 2" + this.tableData.data)
    });
    console.log("Test 3" + this.tableData.data)
  }
}
