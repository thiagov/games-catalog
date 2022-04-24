import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameInfo } from 'src/app/classes/game-info.class';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  addNewGame(addNewGameData: any): Observable<GameInfo> {
    return this.http.post<GameInfo>('/api/games', addNewGameData);
  }
}
