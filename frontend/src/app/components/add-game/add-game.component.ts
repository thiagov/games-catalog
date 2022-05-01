import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Console } from '../../classes/console.class';
import { ConsoleService } from '../../services/console.service';
import { GameService } from '../../services/game.service';
import { GameInfo } from '../../classes/game-info.class';

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
    title: ['', [Validators.required, Validators.maxLength(100)]],
    year: [null, [Validators.required, Validators.min(1970), Validators.max((new Date()).getFullYear())]],
    consoleId: [null, Validators.required],
    completionDate: [],
    personalNotes: ['']
  });
  serverErrors: string[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private consoleService: ConsoleService,
    private gameService: GameService) { }

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
        }
      }).add(() => this.isLoading = false);
    }
  }

  onGameCompletedChanged() {
    this.isGameCompleted = !this.isGameCompleted;
  }
}
