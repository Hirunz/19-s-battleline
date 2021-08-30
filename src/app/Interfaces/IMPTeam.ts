export interface IMPTeam {
    $key?: string,
    teamId: number,
    teamName: string,
    points: number,
    wins: number,
    losses: number,
    roundsWon: number,
    roundsLost: number,
    disqualified: boolean
}
