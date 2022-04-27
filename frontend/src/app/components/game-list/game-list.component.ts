import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { GameInfo } from 'src/app/classes/game-info.class';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  allAddedGames: GameInfo[] = [];
  isLoading = false;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.gameService.getAllGames().subscribe({
      next: gamesList => this.allAddedGames = gamesList,
      complete: () => this.isLoading = false
    });
  }

  addGame(newGame: GameInfo) {
    this.allAddedGames.push(newGame);
  }
}
