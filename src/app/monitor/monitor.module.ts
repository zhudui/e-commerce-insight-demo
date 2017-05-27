import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import {MaterialModule, MdNativeDateModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MonitorRoutingModule } from './monitor-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MonitorRoutingModule,
    MaterialModule,
    MdNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CommentComponent]
})
export class MonitorModule { }
