import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameInfo } from 'src/app/classes/game-info.class';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  readonly gamesUrl = '/api/games';

  constructor(private http: HttpClient) { }

  addNewGame(addNewGameData: any): Observable<GameInfo> {
    return this.http.post<GameInfo>(this.gamesUrl, addNewGameData);
  }

  getAllGames(): Observable<GameInfo[]> {
    return this.http.get<GameInfo[]>(this.gamesUrl);
  }
}
