// angular modules
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
// RxJS observable
import { Observable, of, throwError, map } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
// local modules
import { Mission } from './mission';
import { MessageService } from './message.service';

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
      .pipe(map((res: GetMissionsResponse) => res.data));

    this.messageService.add('任務載入完成');

    return missions;
  }

  getMission(id: number): Observable<Mission> {
    const mission = this.http.get<GetMissionsResponse>(this.apiUrl).pipe(
      map((res: GetMissionsResponse) => {
        const missions = res.data;

        const filteredMissions = missions.filter(
          (mission) => mission.id === id
        );

        // TODO: see if this can handle error
        if (filteredMissions.length > 1) {
          throwError;
        }
        const [mission] = filteredMissions;

        return mission;
      })
    );

    this.messageService.add(`取得單一任務${id}`);

    return mission;
  }

  // TODO: error handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
