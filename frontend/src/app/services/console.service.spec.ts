import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ConsoleService } from './console.service';
import { Console } from 'src/app/classes/console.class';

describe('ConsoleService', () => {
  let consoleService: ConsoleService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    consoleService = TestBed.inject(ConsoleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(consoleService).toBeTruthy();
  });

  it('should return expected consoles', () => {
    const expectedConsoles: Console[] = [
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
    consoleService.getAllConsoles().subscribe((consoles) => expect(consoles).toEqual(expectedConsoles));
    const req = httpTestingController.expectOne(consoleService.consolesUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedConsoles);
  });

  it('should be OK returning no consoles', () => {
    consoleService.getAllConsoles().subscribe((consoles) => expect(consoles.length).toEqual(0));
    const req = httpTestingController.expectOne(consoleService.consolesUrl);
    req.flush([]);
  });
});
