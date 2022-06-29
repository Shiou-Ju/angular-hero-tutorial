import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { MissionsComponent } from './missions/missions.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// route paths
const paths = {
  missionRoute: 'missions',
  dashBoardRoute: 'dashboard',
};

// declaration route
const defaultRoute: Route = {
  path: '',
  redirectTo: paths.dashBoardRoute,
  pathMatch: 'full',
};
const missionRoute: Route = {
  path: paths.missionRoute,
  component: MissionsComponent,
};
const dashBoardRoute: Route = {
  path: paths.dashBoardRoute,
  component: DashboardComponent,
};

const routes: Routes = [defaultRoute, missionRoute, dashBoardRoute];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
