import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { NgrxDataModule, DefaultDataServiceConfig } from "ngrx-data";
import { environment } from "../../environments/environment";
import { entityConfig } from "./entity-metadata";
import { NgrxDataToastService } from "./ngrx-data-toast.service";

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: "api/patate/", // default root path to the server's web api

  // Optionally specify resource URLS for HTTP calls
  entityHttpResourceUrls: {
    // Case matters. Match the case of the entity name.
    Joborder2: {
      // You must specify the root as part of the resource URL.
      entityResourceUrl: "api/joborder2",
      collectionResourceUrl: "api/joborders2/"
    },
    Joborder: {
      // You must specify the root as part of the resource URL.
      entityResourceUrl: "api/joborder/",
      collectionResourceUrl: "api/joborders"
    }
  }
};

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    NgrxDataModule.forRoot(entityConfig)
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
  ]
})
export class AppStoreModule {
  constructor(toastService: NgrxDataToastService) {}
}
