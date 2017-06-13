import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';

import {MaterialModule, MdNativeDateModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularEchartsModule } from 'ngx-echarts';
import { ModalModule } from 'ng2-bootstrap/modal';
import { PaginationModule } from 'ng2-bootstrap/pagination';

import { MonitorRoutingModule } from './monitor-routing.module';

import { LineChartComponent } from '../common/line-chart/line-chart.component';
import { RadarChartComponent } from '../common/radar-chart/radar-chart.component';



@NgModule({
  imports: [
    CommonModule,
    MonitorRoutingModule,
    MaterialModule,
    MdNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEchartsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot()
  ],
  declarations: [CommentComponent, LineChartComponent, RadarChartComponent]
})
export class MonitorModule { }
