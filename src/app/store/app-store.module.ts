import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { NgrxDataModule, DefaultDataServiceConfig } from "ngrx-data";
import { environment } from "../../environments/environment";
import { entityConfig } from "./entity-metadata";
import { NgrxDataToastService } from "./ngrx-data-toast.service";

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: "api/patate"
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
