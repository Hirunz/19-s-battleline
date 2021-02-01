import { IBrPlayer } from './../Interfaces/IBrPlayer';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { IMpMatch } from '../Interfaces/IMpMatch';
import { IMPTeam } from '../Interfaces/IMPTeam';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private mpMatchesList: AngularFireList<any>;
  private mpTeamsList: AngularFireList<any>;
  private brPlayersList: AngularFireList<any>;



constructor(private db: AngularFireDatabase) {
  this.mpMatchesList= this.db.list('/mpMatches');
  this.mpTeamsList= this.db.list('/mpTeams');
  this.brPlayersList= this.db.list('/brPlayers');
 }

// MP - Matches

getMpMatches(){
  return this.mpMatchesList;
}

addMpMatch(match: IMpMatch){
  this.mpMatchesList.push(match);
}

updateMpMatch(match: IMpMatch){
  let $key=match.$key;
  delete match.$key
  if($key != undefined){
  this.mpMatchesList.update($key, match);
  }
}

deleteMpMatch($key: string){
  this.mpMatchesList.remove($key);

}


//MP - Teams

getMpTeams(): AngularFireList<IMPTeam>{
  return this.mpTeamsList;
}

addMpTeam(team: IMPTeam){
  this.mpTeamsList.push(team);
}

updateMpTeam(team: IMPTeam){
  let $key=team.$key;
  delete team.$key
  if($key != undefined){
  this.mpTeamsList.update($key, team);
  }
}

deleteMpTeam($key: string){
  this.mpTeamsList.remove($key);

}

// BR - Players

getBrPlayers(): AngularFireList<IBrPlayer>{
  return this.brPlayersList;
}

addBrPlayer(player: IBrPlayer){
  this.brPlayersList.push(player);
}

updateBrPlayer(player: IBrPlayer){
  let $key=player.$key;
  this.brPlayersList.update($key, player);
}

deleteBrPlayer($key: string){
  this.brPlayersList.remove($key);
}

}
