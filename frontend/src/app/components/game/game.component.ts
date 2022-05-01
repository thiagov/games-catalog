import { Component, Input, OnInit } from '@angular/core';
import { GameInfo } from 'src/app/classes/game-info.class';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() game!: GameInfo;
  initials = '';
  type = 0;
  ageText = '';
  currentYear = (new Date()).getFullYear();

  ngOnInit(): void {
    this.type = Array.from(this.game.title).map(c => c.charCodeAt(0)).reduce((acc, i) => acc + i, 0)%6;
    this.initials = this.game.title.split(" ").map(s => s.charAt(0)).join("").substring(0, 3);
    const age = this.currentYear - this.game.year;
    switch (age) {
      case 0:
        this.ageText = 'NEW!';
        break;
      case 1:
        this.ageText = '1 year old';
        break;
      default:
        this.ageText = `${age} years old`;
    }
  }
}
