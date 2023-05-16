import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DashboardComponent } from './dashboard.component';
import { TilesComponent } from './tiles/tiles.component';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { DiskSpaceComponent } from './disk-space/disk-space.component';
import { TodoComponent } from './todo/todo.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { TeamComponent } from './team/team.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DialogOverviewExampleDialog } from './dialog.component';
// TradingObjectiveDialog
import { HttpClientModule } from '@angular/common/http';
import { TradingObjectiveDialog } from './tradingObjective.component';

import { ChartsModule } from 'ng2-charts';
//HttpClientModule
// DialogOverviewExampleDialog
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
export const routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    // BrowserModule,
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    NgxChartsModule,
    ReactiveFormsModule ,
    PerfectScrollbarModule,
    CarouselModule,
    HttpClientModule,
    ChartsModule
  ],
  declarations: [
    DashboardComponent,
    TilesComponent,
    InfoCardsComponent,
    DiskSpaceComponent,
    TodoComponent,
    AnalyticsComponent,
    TeamComponent,
    DialogOverviewExampleDialog,
    TradingObjectiveDialog
  ],
  entryComponents:[DialogOverviewExampleDialog,TradingObjectiveDialog]
})
export class DashboardModule { }
