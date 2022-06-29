import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { MissionsComponent } from './missions/missions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MissionDetailComponent } from './mission-detail/mission-detail.component';

// route paths
const paths = {
  missionDetail: 'detail/:id',
  missions: 'missions',
  dashBoard: 'dashboard',
};

// default route
const defaultRoute: Route = {
  path: '',
  redirectTo: paths.dashBoard,
  pathMatch: 'full',
};
// declaration route
const missionDetailRoute: Route = {
  path: paths.missionDetail,
  component: MissionDetailComponent,
};
const missionsRoute: Route = {
  path: paths.missions,
  component: MissionsComponent,
};
const dashBoardRoute: Route = {
  path: paths.dashBoard,
  component: DashboardComponent,
};

const routes: Routes = [
  defaultRoute,
  missionDetailRoute,
  missionsRoute,
  dashBoardRoute,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
