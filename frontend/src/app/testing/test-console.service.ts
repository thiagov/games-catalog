import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Console } from '../classes/console.class';
import { ConsoleService } from '../services/console.service';

@Injectable()
export class TestConsoleService extends ConsoleService {
  constructor() {
    super({} as HttpClient);
  }

  lastConsolesResult?: Observable<Console[]>;
  consoles: Console[] = [
    {
      id: 1,
      name: 'Nintendo Switch'
    },
    {
      id: 2,
      name: 'PS4'
    },
    {
      id: 3,
      name: 'Xbox'
    },
  ];

  override getAllConsoles(): Observable<Console[]> {
    this.lastConsolesResult = new Observable<Console[]>((observer) => {
      setTimeout(() => {
        observer.next(this.consoles);
        observer.complete();
      }, 0);
    });
    return this.lastConsolesResult;
  }
}
