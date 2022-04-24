import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Console } from 'src/app/classes/console.class';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  constructor(private http: HttpClient) { }

  getAllConsoles(): Observable<Console[]> {
    return this.http.get<Console[]>('/api/consoles');
  }
}
