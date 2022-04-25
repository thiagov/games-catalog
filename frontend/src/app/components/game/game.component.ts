import { Component, Input, OnInit } from '@angular/core';
import { GameInfo } from 'src/app/classes/game-info.class';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() game: GameInfo | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
