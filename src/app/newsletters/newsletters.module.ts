import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewslettersComponent} from './newsletters/newsletters.component';
import {RouterModule} from "@angular/router";
import {BannerComponent} from "../home/banner/banner.component";
import {PageHeaderModule} from "../shared/modules/page-header/page-header.module";

@NgModule({
    declarations: [NewslettersComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: NewslettersComponent, pathMatch: 'full'}
        ]),
        PageHeaderModule
    ]
})
export class NewslettersModule {
}
