import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { NgrxDataModule, EntityDataService } from "ngrx-data";
import { environment } from "../../environments/environment";
import { entityConfig } from "./entity-metadata";
import { NgrxDataToastService } from "./ngrx-data-toast.service";
import { JobOrderDataService } from "./entity/job-order-data-service";

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    NgrxDataModule.forRoot(entityConfig)
  ],
  providers: [
    JobOrderDataService // <-- provide the custom data service
  ]
})
export class AppStoreModule {
  constructor(
    entityDataService: EntityDataService,
    jobOrderDataService: JobOrderDataService,
    toastService: NgrxDataToastService
  ) {
    // Register custom EntityDataServices
    entityDataService.registerService("Joborder", jobOrderDataService); // <-- register it
  }
}
