import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSlideToggleModule, MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { jest } from '@jest/globals';
import { By } from '@angular/platform-browser';

import { AddGameComponent } from './add-game.component';
import { GameService } from '../../services/game.service';
import { TestGameService } from '../../testing/test-game.service';
import { ConsoleService } from '../../services/console.service';
import { TestConsoleService } from '../../testing/test-console.service';

describe('AddGameComponent', () => {
  let component: AddGameComponent;
  let fixture: ComponentFixture<AddGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGameComponent ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: GameService, useClass: TestGameService },
        { provide: ConsoleService, useClass: TestConsoleService },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGameComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with an empty form', () => {
    fixture.detectChanges(); //ngOnInit
    const addGameForm = component.addGameForm;
    const addGameFormValues = {
      title: '',
      year: null,
      consoleId: null,
      completionDate: null,
      personalNotes: ''
    };

    expect(addGameForm.value).toEqual(addGameFormValues);
  });

  it('should have required error when title, year or console are empty', () => {
    fixture.detectChanges(); //ngOnInit
    const titleFormControl = component.addGameForm.get('title');
    const yearFormControl = component.addGameForm.get('year');
    const consoleFormControl = component.addGameForm.get('consoleId');

    expect(titleFormControl?.errors).not.toBeNull();
    expect(titleFormControl?.hasError('required')).toBeTruthy();

    expect(yearFormControl?.errors).not.toBeNull();
    expect(yearFormControl?.hasError('required')).toBeTruthy();

    expect(consoleFormControl?.errors).not.toBeNull();
    expect(consoleFormControl?.hasError('required')).toBeTruthy();
  });

  it('should have min and max error on year when year is lower than 1970 or greater than current year', () => {
    fixture.detectChanges(); //ngOnInit
    const yearFormControl = component.addGameForm.get('year');

    yearFormControl?.setValue(1969);
    expect(yearFormControl?.hasError('min')).toBeTruthy();

    yearFormControl?.setValue(2200);
    expect(yearFormControl?.hasError('max')).toBeTruthy();
  });

  it('should have maxlength error on title when title have more than 100 character', () => {
    fixture.detectChanges(); //ngOnInit
    const titleFormControl = component.addGameForm.get('title');

    titleFormControl?.setValue('a'.repeat(100));
    expect(titleFormControl?.hasError('maxlength')).toBeFalsy();

    titleFormControl?.setValue('a'.repeat(101));
    expect(titleFormControl?.hasError('maxlength')).toBeTruthy();
  });

  it('should call addNewGame and toggle loading when click on Add Game button and form is correctly filled', fakeAsync(() => {
    fixture.detectChanges(); //ngOnInit
    const gameService = fixture.debugElement.injector.get(GameService);
    const saveSpy = jest.spyOn(gameService, 'addNewGame');
    component.addGameForm.get('title')?.setValue('Test');
    component.addGameForm.get('year')?.setValue(2000);
    component.addGameForm.get('consoleId')?.setValue(1);
    component.addGameForm.get('completionDate')?.setValue(new Date);
    component.addGameForm.get('personalNotes')?.setValue('Test');

    const addButton = fixture.debugElement.nativeElement.querySelector('button');
    addButton.click();

    expect(component.isLoading).toBeTruthy();
    tick();
    expect(component.isLoading).toBeFalsy();
    expect(saveSpy.mock.calls.length).toBeTruthy();
  }));

  it('shoud call getAllConsoles and load all consoles when component is loaded', fakeAsync(() => {
    const consoleService = fixture.debugElement.injector.get(ConsoleService);
    const getConsolesSpy = jest.spyOn(consoleService, 'getAllConsoles');

    expect(component.allConsoles).toEqual([]);
    fixture.detectChanges(); //ngOnInit
    tick();
    expect(getConsolesSpy.mock.calls.length).toBeTruthy();
    expect(component.allConsoles.length).toEqual(3);
  }));

  it('should toggle isGameCompleted when click on mat-slide-toggle', () => {
    fixture.detectChanges(); //ngOnInit
    expect(component.isGameCompleted).toBeFalsy();
    const toggleCompleted = fixture.debugElement.query(By.directive(MatSlideToggle));
    toggleCompleted.triggerEventHandler('change', null);
    expect(component.isGameCompleted).toBeTruthy();
  });

  it('should emit added game when form submitted', fakeAsync(() => {
    fixture.detectChanges(); //ngOnInit
    jest.spyOn(component.newGameEvent, 'emit');
    component.addGameForm.get('title')?.setValue('Teste');
    component.addGameForm.get('year')?.setValue(2000);
    component.addGameForm.get('consoleId')?.setValue(1);
    component.onSubmit();
    tick();
    expect(component.newGameEvent.emit).toHaveBeenCalled();
  }));
});
