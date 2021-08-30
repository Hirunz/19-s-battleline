import { IBrPlayer } from './../../../Interfaces/IBrPlayer';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from 'src/app/Services/database.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-br-page',
  templateUrl: './br-page.component.html',
  styleUrls: ['./br-page.component.css']
})
export class BrPageComponent implements OnInit,AfterViewInit {

  public brPlayers!: IBrPlayer[];
  public columns: string[]=["playerId","playerName","kills","points"];
  tableData = new MatTableDataSource<IBrPlayer>(this.brPlayers);
  
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  ngAfterViewInit() {
    this.tableData.sort = this.sort;
  }
  
  constructor(private databaseService: DatabaseService) { 
    this.brPlayers=[];
    this.getBrPlayers();
  }


  ngOnInit(): void {
    this.getBrPlayers();
  }
  getBrPlayers(){
    this.databaseService.getBrPlayers().snapshotChanges().forEach(playersSnapshot=>{
      this.brPlayers=[]
       playersSnapshot.forEach(playerSnapshot=>{
          let player=<IBrPlayer>playerSnapshot.payload.toJSON();
          // console.log(player)
         if(playerSnapshot.key){
          player['$key']= playerSnapshot.key;
          this.brPlayers.push(player as IBrPlayer);
          const data = this.brPlayers;
          this.tableData.data = data;
        }
        });
    });
  }


  isDisqualified(status: boolean){
    if(status){
      return true;
    }
    else{
      return false;
    }
  }
}