import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { GameInfo } from '../../classes/game-info.class';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute game age when age > 1', () => {
    const game: GameInfo = {
      id: 3,
      title: 'game 3',
      year: 1990,
      consoleName: 'Test',
      completionDate: undefined,
      personalNotes: 'Test'
    };
    component.game = game;
    fixture.detectChanges();
    const currentYear = (new Date()).getFullYear();
    expect(component.ageText).toBe(`${currentYear - 1990} years old`);
  });

  it('should compute game age when age = 1', () => {
    const game: GameInfo = {
      id: 3,
      title: 'game 3',
      year: (new Date()).getFullYear() - 1,
      consoleName: 'Test',
      completionDate: undefined,
      personalNotes: 'Test'
    };
    component.game = game;
    fixture.detectChanges();
    const currentYear = (new Date()).getFullYear();
    expect(component.ageText).toBe(`1 year old`);
  });

  it('should compute game age when age < 1', () => {
    const game: GameInfo = {
      id: 3,
      title: 'game 3',
      year: (new Date()).getFullYear(),
      consoleName: 'Test',
      completionDate: undefined,
      personalNotes: 'Test'
    };
    component.game = game;
    fixture.detectChanges();
    const currentYear = (new Date()).getFullYear();
    expect(component.ageText).toBe('NEW!');
  });

  it('should compute game initials', () => {
    const game: GameInfo = {
      id: 3,
      title: 'Test game 3 with big name',
      year: (new Date()).getFullYear(),
      consoleName: 'Test',
      completionDate: undefined,
      personalNotes: 'Test'
    };
    component.game = game;
    fixture.detectChanges();
    expect(component.initials).toBe('Tg3');
  });
});
