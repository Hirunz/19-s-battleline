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



constructor(private db: AngularFireDatabase) {
  this.mpMatchesList= this.db.list('/mpMatches');
  this.mpTeamsList= this.db.list('/mpTeams');
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
  this.mpMatchesList.update($key, match);
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

updateMpTeam(team: IMpMatch){
  let $key=team.$key;
  this.mpTeamsList.update($key, team);
}

deleteMpTeam($key: string){
  this.mpTeamsList.remove($key);

}

// add BR Page here


}
