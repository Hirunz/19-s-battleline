import { IBrPlayer } from './../../../Interfaces/IBrPlayer';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/Services/database.service';

@Component({
  selector: 'app-br-page',
  templateUrl: './br-page.component.html',
  styleUrls: ['./br-page.component.css']
})
export class BrPageComponent implements OnInit {

  public brPlayers: IBrPlayer[];
  public columns: string[]=["playerId","playerName","kills","points"];

  constructor(private databaseService: DatabaseService) { 
    this.brPlayers=[];
    this.getBrPlayers();
  }


  ngOnInit(): void {
  }
  getBrPlayers(){
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


  isDisqualified(status: boolean){
    if(status){
      return true;
    }
    else{
      return false;
    }
  }
}