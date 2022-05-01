import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GameInfo } from '../classes/game-info.class';
import { GameService } from '../services/game.service';

@Injectable()
export class TestGameService extends GameService {
  constructor() {
    super({} as HttpClient);
  }

  lastGamesResult!: Observable<GameInfo[]>;
  lastGameResult!: Observable<GameInfo>;
  games: GameInfo[] = [
    {
      id: 1,
      title: 'name 1',
      year: 1990,
      consoleName: 'Teste',
      completionDate: undefined,
      personalNotes: 'Teste'
    },
    {
      id: 2,
      title: 'game 2',
      year: 1990,
      consoleName: 'Teste',
      completionDate: undefined,
      personalNotes: 'Teste'
    }
  ];

  override addNewGame(addNewGameData: any): Observable<GameInfo> {
    this.lastGameResult = new Observable<GameInfo>((observer) => {
      setTimeout(() => {
        let game: GameInfo = {
          id: 1,
          title: addNewGameData['title'],
          year: addNewGameData['year'],
          consoleName: 'TestConsole',
          completionDate: addNewGameData['completionDate'],
          personalNotes: addNewGameData['personalNotes']
        };
        observer.next(this.games[0]);
        observer.complete();
      }, 0);
    });
    return this.lastGameResult;
  }

  override getAllGames(): Observable<GameInfo[]> {
    this.lastGamesResult = new Observable<GameInfo[]>((observer) => {
      setTimeout(() => {
        observer.next(this.games);
        observer.complete();
      }, 0);
    });
    return this.lastGamesResult;
  }
}
