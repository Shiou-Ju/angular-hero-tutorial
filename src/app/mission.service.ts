// angular modules
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
// local modules
import { Mission } from 'src/interfaces/Mission';
import { MessageService } from 'src/app/message.service';

// db column names are in conventional cases
export interface MissionFromDb {
  /** 任務序號 */
  id: string;
  /** 例如：伏地挺身、練習英文 */
  name: string;
  /** 單位，例如「組」 */
  unit: string;
  /** 數量 */
  amount: string;
  /** 是否為每日定量 */
  is_fixed: boolean;
  /** 每日增量額度 */
  increment?: string;
  /** 建立時間 */
  created_at: string;
  /** 修改時間 */
  updated_at: string;
}

export interface NewMissionFormData
  extends Omit<MissionFromDb, 'id' | 'is_fixed' | 'created_at' | 'updated_at'> {
  isFixed: string;
}

type RowId = string;

type GetMissionsResponse = {
  success: boolean;
  data: MissionFromDb[];
};

type GetMissionResponse = {
  success: boolean;
  data: MissionFromDb;
};

type PutMissionResponse = GetMissionResponse;
type CreateMissionReponse = GetMissionResponse;

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
      .pipe(
        map((res: GetMissionsResponse) => {
          const missionsFromDb = res.data;

          const missions = missionsFromDb.map(this.convertRowToMission);

          return missions;
        })
      )
      .pipe(
        tap((_) => this.log('取得任務列表')),
        catchError(this.handleError<Mission[]>('getMissions', []))
      );

    return missions;
  }

  /** get single mission */
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

          const missionFromDb = res.data;

          const mission: Mission = this.convertRowToMission(missionFromDb);

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

    // convert fields for service
    // TODO: value must be string, not boolean, otherwise backend might crash
    const update = {
      ...newMission,
      // TODO: 有無更好做法
      isFixed: `${newMission.isFixed}` === 'true' ? 'true' : 'false',
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

          const missionFromDb = res.data;

          const mission: Mission = this.convertRowToMission(missionFromDb);

          return mission;
        })
      )
      .pipe(
        tap((_) => this.log(`更新單一任務 id=${id}`)),
        catchError(this.handleError<Mission>(`updateMission id=${id}`))
      );

    return updated;
  }

  addMission(newMission: NewMissionFormData): Observable<Mission> {
    // TODO: duplicate with above
    const postOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    // TODO: 若定量為 false，則將增量改為 0
    // TODO: 不顯示

    const created = this.http
      .post<CreateMissionReponse>(this.missionsApiUrl, newMission, postOptions)
      .pipe(
        map((res: CreateMissionReponse) => {
          // TODO: handle error better after implementing backend api
          if (!res.success) {
            const errorMessage = JSON.stringify(res.data);
            throw new Error(errorMessage);
          }

          const createdMission = res.data;
          const mission = this.convertRowToMission(createdMission);

          return mission;
        })
      )
      .pipe(
        // TODO: how to add new id
        tap((_) => this.log(`建立新任務`)),
        catchError(this.handleError<Mission>(`createMission`))
      );

    return created;
  }

  /** message service method */
  private log(message: string) {
    this.messageService.add(`mission service : ${message}`);
  }

  /** convert row from db into mission complied to interface */
  private convertRowToMission(missionFromDb: MissionFromDb): Mission {
    const mission: Mission = {
      id: parseInt(missionFromDb.id),
      name: missionFromDb.name,
      unit: missionFromDb.unit,
      amount: parseInt(missionFromDb.amount),
      isFixed: missionFromDb.is_fixed,
      increment: missionFromDb.increment
        ? parseInt(missionFromDb.increment)
        : undefined,
    };

    return mission;
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
