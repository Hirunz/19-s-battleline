import { IMPTeam } from "./IMPTeam";

export interface IMpMatch {
    $key: string,
    team1: IMPTeam,
    team2: IMPTeam,
    team1Rounds: number,
    team2Rounds: number,
}
