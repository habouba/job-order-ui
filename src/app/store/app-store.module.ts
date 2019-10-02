import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import {
  NgrxDataModule,
  EntityDataService,
  DefaultDataServiceConfig,
  EntityCollectionDataService,
  HttpUrlGenerator,
  QueryParams,
  HttpMethods,
  Update,
  EntityHttpResourceUrls
} from "ngrx-data";
import { environment } from "../../environments/environment";
import { entityConfig } from "./entity-metadata";
import { NgrxDataToastService } from "./ngrx-data-toast.service";
import { JobOrderDataService } from "./entity/job-order-data-service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

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
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    http
      .get("https://api.github.com/users/habouba/repos")
      .pipe(
        tap(val => {
          /*testServ.setConf(
            {
              root: val[0].owner.url,
              entityHttpResourceUrls: {
                Joborder: {
                  // You must specify the root as part of the resource URL.
                  entityResourceUrl: val[0].owner.url,
                  collectionResourceUrl: val[0].owner.url
                }
              }
            });*/

          //httpUrlGenerator.collectionResource('Joborder','api');
          //httpUrlGenerator.entityResource('Joborder','kakak/ttt');
          var g = {
            Joborder: {
              // You must specify the root as part of the resource URL.
              entityResourceUrl: "api/joborder/",
              collectionResourceUrl: "api/joborders"
            }
          } as EntityHttpResourceUrls;
          httpUrlGenerator.registerHttpResourceUrls(g);
          var t = new JobOrderDataService(http, httpUrlGenerator);
          // Register custom EntityDataServices
          entityDataService.registerService("Joborder", t); // <-- register it
        })
      )
      .subscribe();
  }
}
