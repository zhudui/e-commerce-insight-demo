import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import {MaterialModule, MdNativeDateModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularEchartsModule } from 'ngx-echarts';

import { MonitorRoutingModule } from './monitor-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MonitorRoutingModule,
    MaterialModule,
    MdNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEchartsModule
  ],
  declarations: [CommentComponent]
})
export class MonitorModule { }
