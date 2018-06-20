import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Account } from '../models/Account';
import { Action } from '../models/Action';

@Injectable()
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }

  getAccount(name: string): Observable<Account> {
    return this.http.get(`${environment.apiUrl}/accounts/${name}`).pipe(
      map(account => account as Account)
    );
  }

  getAccountActions(name: string, page = 1): Observable<Action[]> {
    return this.http.get(`${environment.apiUrl}/accounts/${name}/actions`, {
      params: new HttpParams({
        fromString: `page=${page}`
      })
    }).pipe(
      map((actions: any) => actions.map(action => action as Action))
    );
  }
}
