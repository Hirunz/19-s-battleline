import { Component, OnInit } from '@angular/core';
import { IMpMatch } from 'src/app/Interfaces/IMpMatch';
import { IMPTeam } from 'src/app/Interfaces/IMPTeam';
import data from '../../../../../assets/files/data.json'

@Component({
  selector: 'app-mp-scores',
  templateUrl: './mp-scores.component.html',
  styleUrls: ['./mp-scores.component.css']
})
export class MpScoresComponent implements OnInit {

  public matches:IMpMatch[] = []
  public teams: IMPTeam[] = []

  constructor() { }

  ngOnInit(): void {
     
  }

  readFromFile(){
  
  }
  saveInFile(){

  }



}
