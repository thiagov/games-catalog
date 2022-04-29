import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Console } from 'src/app/classes/console.class';
import { ConsoleService } from 'src/app/services/console.service';
import { GameService } from 'src/app/services/game.service';
import { GameInfo } from 'src/app/classes/game-info.class';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {

  @Output() newGameEvent = new EventEmitter<GameInfo>();
  @ViewChild('formDirective') formDirective!: FormGroupDirective;
  allConsoles: Console[] = [];
  maxCompletionDate = new Date;
  isGameCompleted = false;
  addGameForm = this.fb.group({
    title: ['', Validators.required],
    year: [undefined, [Validators.required, Validators.min(1970), Validators.max((new Date()).getFullYear())]],
    consoleId: [undefined, Validators.required],
    completionDate: [],
    personalNotes: ['']
  });
  serverErrors: string[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private consoleService: ConsoleService,
    private gameService: GameService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.consoleService.getAllConsoles().subscribe(
      consolesList => this.allConsoles = consolesList
    );
  }

  onSubmit() {
    this.serverErrors = [];
    if (this.addGameForm.valid) {
      this.isLoading = true;
      this.gameService.addNewGame(this.addGameForm.value).subscribe({
        next: addedGame => {
          this.snackBar.open("Game successfully added!", "", { duration: 3000 });
          this.newGameEvent.emit(addedGame);
          this.addGameForm.reset();
          this.formDirective.resetForm();
        },
        error: errorData => {
          if (errorData.status === 400) {
            this.serverErrors = errorData.error;
          } else {
            this.serverErrors = ['Something went wrong.'];
          }
        },
        complete: () => this.isLoading = false
      });
    }
  }

  onGameCompletedChanged() {
    this.isGameCompleted = !this.isGameCompleted;
  }
}
