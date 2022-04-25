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

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getAllGames().subscribe(
      gamesList => this.allAddedGames = gamesList
    );
  }

  addGame(newGame: GameInfo) {
    this.allAddedGames.push(newGame);
  }
}
