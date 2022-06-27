// angular modules
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
// RxJS observable
import { Observable, of, throwError, map } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
// local modules
import { Mission } from './mission';

type GetMissionsResponse = {
  success: boolean;
  data: Mission[];
};

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  private apiUrl = 'http://localhost:3552/missions';

  constructor(private http: HttpClient) {}

  /** get missions from server */
  // 1. async way
  // async getMissions(): Promise<Mission[]> {
  //   const res = await fetch(this.apiUrl);
  //   const content = (await res.json()) as GetMissionsResponse;
  //   return content.data;
  // }

  // 2. observable way
  getMissions(): Observable<Mission[]> {
    // const url = '';
    // const options = {
    //   reportProgress: true,
    // };

    // const req = new HttpRequest('GET', url, options);

    return this.http
      .get<GetMissionsResponse>(this.apiUrl)
      .pipe(map((res: GetMissionsResponse) => res.data));
    // .pipe(catchError(this.handleError<GetMissionsResponse>('getMissions')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
