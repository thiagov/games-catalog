import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { jest } from '@jest/globals';
import { By } from '@angular/platform-browser';

import { AddGameComponent } from '../../components/add-game/add-game.component';
import { GameListComponent } from './game-list.component';
import { GameComponent } from '../../components/game/game.component';
import { GameService } from '../../services/game.service';
import { TestGameService } from '../../testing/test-game.service';
import { ConsoleService } from '../../services/console.service';
import { TestConsoleService } from '../../testing/test-console.service';
import { GameInfo } from '../../classes/game-info.class';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameListComponent,
        AddGameComponent,
        GameComponent
      ],
      imports: [
        MatSnackBarModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatInputModule,
        MatAutocompleteModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: GameService, useClass: TestGameService },
        { provide: ConsoleService, useClass: TestConsoleService },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all games when component is loaded', fakeAsync(() => {
    const gameService = fixture.debugElement.injector.get(GameService);
    const getGamesSpy = jest.spyOn(gameService, 'getAllGames');

    expect(component.allAddedGames).toEqual([]);
    fixture.detectChanges(); //ngOnInit
    tick();
    expect(getGamesSpy.mock.calls.length).toBeTruthy();
    expect(component.allAddedGames.length).toEqual(2);
  }));

  it('shoud toggle loading when loading games', fakeAsync(() => {
    fixture.detectChanges(); //ngOnInit
    expect(component.isLoading).toBeTruthy();
    tick();
    expect(component.isLoading).toBeFalsy();
  }));

  it('should reload games when a new game is added', () => {
    const gameService = fixture.debugElement.injector.get(GameService);
    const getGamesSpy = jest.spyOn(gameService, 'getAllGames');
    const newGame: GameInfo = {
      id: 3,
      title: 'game 3',
      year: 1990,
      consoleName: 'Test',
      completionDate: undefined,
      personalNotes: 'Test'
    };

    component.updateGames(newGame);
    expect(getGamesSpy.mock.calls.length).toBeTruthy();
  });

  it('should filter games on the interface when filter input is used', fakeAsync(() => {
    fixture.detectChanges(); //ngOnInit
    tick(); // Complete the async request for all games
    fixture.detectChanges(); // update view with the games

    let games = fixture.debugElement.queryAll(By.directive(GameComponent));
    expect(games.length).toBe(2);

    const filterInput = fixture.debugElement.query(By.css("#filter"));
    filterInput.nativeElement.value = 'game';
    filterInput.triggerEventHandler('input', { target: filterInput.nativeElement });
    fixture.detectChanges();

    games = fixture.debugElement.queryAll(By.directive(GameComponent));
    expect(games.length).toBe(1);
  }));
});
