// angular modules
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError, map } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
// local modules
import { Mission } from 'src/interfaces/Mission';
import { MessageService } from 'src/app/message.service';

type GetMissionsResponse = {
  success: boolean;
  data: Mission[];
};

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  private apiUrl = 'http://localhost:3552/missions';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** get missions from server */
  getMissions(): Observable<Mission[]> {
    const missions = this.http
      .get<GetMissionsResponse>(this.apiUrl)
      .pipe(map((res: GetMissionsResponse) => res.data))
      .pipe(
        tap((_) => this.log('取得任務列表')),
        catchError(this.handleError<Mission[]>('getMissions', []))
      );

    return missions;
  }

  /** get single mission */
  // TODO: implement backend to serve single mission accordingly

  getMission(id: number): Observable<Mission> {
    const mission = this.http
      .get<GetMissionsResponse>(this.apiUrl)
      .pipe(
        map((res: GetMissionsResponse) => {
          const missions = res.data;

          // FIXME:
          const filteredMissions = missions.filter(
            (mission) => mission.id === id
          );
          const [mission] = filteredMissions;

          // TODO: handle error better after implementing backend api
          if (!mission) {
            throw new Error('id not found');
          }

          return mission;
        })
      )
      .pipe(
        tap((_) => this.log(`單一任務 id=${id}`)),
        catchError(this.handleError<Mission>(`getMision id=${id}`))
      );

    return mission;
  }

  /** message service method */
  private log(message: string) {
    this.messageService.add(`mission service : ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} 失敗: ${error.message}`);
      // Let the app keep running by returning an empty result.
      // TODO: maybe other possible planBs
      return of(result as T);
    };
  }
}
