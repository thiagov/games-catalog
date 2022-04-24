import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Console } from 'src/app/classes/console.class';

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
    console: [undefined, Validators.required],
    completionDate: [],
    personalNotes: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.allConsoles = [
      new Console(1, 'Console 1'),
      new Console(2, 'Console 2'),
      new Console(3, 'Console 3'),
    ]
  }

  onSubmit() {
    console.log(this.addGameForm.value);
  }

  onGameCompletedChanged() {
    this.isGameCompleted = !this.isGameCompleted;
  }
}
