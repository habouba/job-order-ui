import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { JobOrderDetailComponent } from "./job-order-detail/job-order-detail.component";
import { JobOrderListComponent } from "./job-order-list/job-order-list.component";
import { JobOrdersComponent } from "./job-orders/job-orders.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: JobOrdersComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [JobOrdersComponent, JobOrderDetailComponent],
  declarations: [
    JobOrdersComponent,
    JobOrderDetailComponent,
    JobOrderListComponent
  ]
})
export class JobOrdersModule {}
