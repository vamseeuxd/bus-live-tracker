import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SchoolsPage } from "./page";
import { AddSchoolPage } from "./add/page";

const routes: Routes = [
  {
    path: "",
    component: SchoolsPage,
  },
  {
    path: "add",
    component: AddSchoolPage,
  },
  {
    path: "edit/:itemId",
    component: AddSchoolPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolsPageRoutingModule {}
