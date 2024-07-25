import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchoolsPageRoutingModule } from './routing.module';

import { SchoolsPage } from './page';
import { AddSchoolPage } from './add/page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchoolsPageRoutingModule
  ],
  declarations: [SchoolsPage, AddSchoolPage]
})
export class PageModule {}
