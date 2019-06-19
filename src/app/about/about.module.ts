import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '../shared/components/page-header/page-header.component';
import { CoreValuesComponent } from './core-values/core-values.component';
import { BoardMembersComponent } from './board-members/board-members.component';
import { FounderComponent } from './founder/founder.component';

@NgModule({
  declarations: [
    AboutComponent,
    PageHeaderComponent,
    CoreValuesComponent,
    BoardMembersComponent,
    FounderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AboutComponent, pathMatch: 'full' }
    ])
  ]
})
export class AboutModule {}
