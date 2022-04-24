import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Console } from 'src/app/classes/console.class';
import { ConsoleService } from 'src/app/services/console.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {

  allConsoles: Console[] = [];
  maxCompletionDate = new Date;
  isGameCompleted = false;
  addGameForm = this.fb.group({
    title: ['', Validators.required],
    year: [undefined, [Validators.min(1970), Validators.max((new Date()).getFullYear())]],
    consoleId: [undefined, Validators.required],
    completionDate: [],
    personalNotes: ['']
  });

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
    this.gameService.addNewGame(this.addGameForm.value).subscribe(
      addedGame => {
        console.log(addedGame);
      }
    );
  }

  onGameCompletedChanged() {
    this.isGameCompleted = !this.isGameCompleted;
  }
}
