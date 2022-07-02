// angular modules
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
// local modules
import { Mission } from 'src/interfaces/Mission';
import { MessageService } from 'src/app/message.service';

type GetMissionsResponse = {
  success: boolean;
  data: Mission[];
};

type GetMissionResponse = {
  success: boolean;
  data: Mission;
};

type PutMissionResponse = GetMissionResponse;

// TODO: 是否有需要
export type displayedMission = {
  id: number;
  name: string;
  unit: string;
  amount: number;
  /** 前端顯示為「是」「否」 */
  isFixedString: '是' | '否';
  increment?: number;
};

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  private missionsApiUrl = 'http://localhost:3552/missions';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** get missions from server */
  getMissions(): Observable<Mission[]> {
    const missions = this.http
      .get<GetMissionsResponse>(this.missionsApiUrl)
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
    const missionUrl = `${this.missionsApiUrl}/${id}`;
    const mission = this.http
      .get<GetMissionResponse>(missionUrl)
      .pipe(
        map((res: GetMissionResponse) => {
          // TODO: handle error better after implementing backend api
          if (!res.success) {
            const errorMessage = JSON.stringify(res.data);
            if (errorMessage.includes('404')) throw new Error('id not found');
            throw new Error(`${res.data}`);
          }

          const mission = res.data;

          return mission;
        })
      )
      .pipe(
        tap((_) => this.log(`單一任務 id=${id}`)),
        catchError(this.handleError<Mission>(`getMision id=${id}`))
      );

    return mission;
  }

  /** update mission */
  updateMission(newMission: Mission): Observable<Mission> {
    // TODO: duplicate with above
    const id = newMission.id;
    const missionUrl = `${this.missionsApiUrl}/${id}`;
    const postOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    // convert fields
    // TODO: value must be string, not boolean, otherwise backend might crash
    const update = {
      ...newMission,
      // TODO: 有無更好做法
      isFixed: `${newMission.isfixed}` === 'true' ? 'true' : 'false',
    };

    // TODO: 若定量為 false，則將增量改為 0
    // TODO: 不顯示

    const updated = this.http
      .put<PutMissionResponse>(missionUrl, update, postOptions)
      .pipe(
        map((res: PutMissionResponse) => {
          // TODO: handle error better after implementing backend api
          if (!res.success) {
            const errorMessage = JSON.stringify(res.data);
            if (errorMessage.includes('404')) throw new Error(`id not found`);
            throw new Error(errorMessage);
          }

          const mission = res.data;

          return mission;
        })
      )
      .pipe(
        tap((_) => this.log(`更新單一任務 id=${id}`)),
        catchError(this.handleError<Mission>(`updateMission id=${id}`))
      );

    return updated;
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
