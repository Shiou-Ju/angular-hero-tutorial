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

interface UpdateMissionRequestBody extends Omit<Mission, 'isFixed'> {
  isFixed: string;
}

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
    const putOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    // convert fields for service
    const update: UpdateMissionRequestBody = {
      ...newMission,
      isFixed: `${newMission.isFixed}` === 'true' ? 'true' : 'false',
    };

    const updated = this.http
      .put<PutMissionResponse>(missionUrl, update, putOptions)
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

  /** create mission */
  addMission(newMission: NewMissionFormData): Observable<Mission> {
    // TODO: duplicate with above
    const postOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

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

  /** delete a mission */
  deleteMission(id: number): Observable<Mission> {
    const url = `${this.missionsApiUrl}/${id}`;
    const deleteOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    // TODO: why still need deleteoptions?
    return this.http.delete<Mission>(url, deleteOptions).pipe(
      tap((_) => this.log(`deleted mission id=${id}`)),
      catchError(this.handleError<Mission>('deleteMission'))
    );
  }

  /** search missions */
  searchMissions(term: string): Observable<Mission[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http
      .get<GetMissionsResponse>(`${this.missionsApiUrl}/?missionName=${term}`)
      .pipe(
        map((res: GetMissionsResponse) => {
          const missionsFromDb = res.data;

          const missions = missionsFromDb.map(this.convertRowToMission);

          return missions;
        })
      )

      .pipe(
        tap((missions) =>
          missions.length
            ? this.log(`found missions matching "${term}"`)
            : this.log(`no mission matching "${term}"`)
        ),
        catchError(this.handleError<Mission[]>('searchMissions', []))
      );
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
