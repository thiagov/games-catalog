import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { GameInfo } from 'src/app/classes/game-info.class';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  allAddedGames: GameInfo[] = [];
  filteredGames: Observable<GameInfo[]> | undefined;
  autocompleteOptions: string[] = [];
  filteredOptions: Observable<string[]> | undefined;
  filterFormControl = new FormControl('');
  isLoading = false;

  constructor(
    private gameService: GameService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._getAllGames();
  }

  updateGames(newGame: GameInfo) {
    if (newGame.id) {
      this.snackBar.open("Game successfully added!", "", { duration: 3000 });
      this._getAllGames();
    }
  }

  private _getAllGames() {
    this.isLoading = true;
    this.gameService.getAllGames().subscribe({
      next: gamesList => {
        this.filterFormControl.reset('');
        this.allAddedGames = gamesList;
        this.autocompleteOptions = gamesList.map(game => game.title);

        this.filteredOptions = this.filterFormControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterOptions(value)),
        );
        this.filteredGames = this.filterFormControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterGames(value)),
        );
      },
      complete: () => this.isLoading = false
    });
  }

  private _filterOptions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.autocompleteOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterGames(value: string): GameInfo[] {
    const filterValue = value.toLowerCase();
    return this.allAddedGames.filter(game => game.title.toLowerCase().includes(filterValue));
  }
}
