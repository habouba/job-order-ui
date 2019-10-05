import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  EntityCollectionDataService,
  DefaultDataService,
  HttpUrlGenerator,
  Logger,
  QueryParams,
  DefaultDataServiceConfig
} from "@ngrx/data";

import { JobOrder } from "../../core";

@Injectable()
export class JobOrderDataService extends DefaultDataService<JobOrder> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super("Joborder", http, httpUrlGenerator);
  }
}
