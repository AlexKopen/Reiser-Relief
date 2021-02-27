import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalaComponent } from './gala/gala.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [GalaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: GalaComponent, pathMatch: 'full' }
    ]),
  ]
})
export class GalaModule { }
