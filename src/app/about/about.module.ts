import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { CoreValuesComponent } from './core-values/core-values.component';
import { BoardMembersComponent } from './board-members/board-members.component';
import { FounderComponent } from './founder/founder.component';
import { PageHeaderModule } from '../shared/modules/page-header/page-header.module';

@NgModule({
  declarations: [
    AboutComponent,
    CoreValuesComponent,
    BoardMembersComponent,
    FounderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AboutComponent, pathMatch: 'full' },
      { path: ':sub-page', component: AboutComponent, pathMatch: 'full' }
    ]),
    PageHeaderModule
  ]
})
export class AboutModule {}
