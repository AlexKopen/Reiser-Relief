import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyComponent } from './apply/apply.component';

const missionsRoutes: Routes = [
  { path: 'apply', component: ApplyComponent },
  { path: 'apply/:id', component: ApplyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(missionsRoutes)],
  exports: [RouterModule]
})
export class MissionsRoutingModule {}
