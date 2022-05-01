import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { GameInfo } from 'src/app/classes/game-info.class';

describe('GameService with mocks', () => {
  let gameService: GameService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ GameService ]
    });
    gameService = TestBed.inject(GameService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(gameService).toBeTruthy();
  });

  it('should return expected games', () => {
    let expectedGames: GameInfo[] = [
      {
        id: 1,
        title: 'name 1',
        year: 1990,
        consoleName: 'Teste',
        completionDate: undefined,
        personalNotes: 'Teste'
      },
      {
        id: 1,
        title: 'name 1',
        year: 1990,
        consoleName: 'Teste',
        completionDate: undefined,
        personalNotes: 'Teste'
      }
    ];
    gameService.getAllGames().subscribe((games) => expect(games).toEqual(expectedGames));
    const req = httpTestingController.expectOne(gameService.gamesUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedGames);
  });

  it('should be OK returning no games', () => {
    gameService.getAllGames().subscribe((games) => expect(games.length).toEqual(0));
    const req = httpTestingController.expectOne(gameService.gamesUrl);
    req.flush([]);
  });

  it('should create a game and return it', () => {
    const gameToCreate = {
      title: 'name 1',
      year: '1990',
      consoleId: 1,
      completionDate: undefined,
      personalNotes: 'Teste'
    };
    const expectedGame: GameInfo = {
      id: 1,
      title: 'name 1',
      year: 1990,
      consoleName: 'Teste',
      completionDate: undefined,
      personalNotes: 'Teste'
    };
    gameService.addNewGame(gameToCreate).subscribe(data => expect(data).toEqual(expectedGame));
    const req = httpTestingController.expectOne(gameService.gamesUrl);
    expect(req.request.method).toEqual('POST');
    const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: expectedGame });
    req.event(expectedResponse);
  });
});
