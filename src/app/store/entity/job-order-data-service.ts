import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  EntityCollectionDataService,
  DefaultDataService,
  HttpUrlGenerator,
  Logger,
  QueryParams
} from "ngrx-data";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { JobOrder } from "../../core";

@Injectable()
export class JobOrderDataService extends DefaultDataService<JobOrder> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    logger: Logger
  ) {
    super("Joborder", http, httpUrlGenerator);
    logger.log("Created custom Job Order EntityDataService");
  }

  getAll(): Observable<JobOrder[]> {
    return super
      .getAll()
      .pipe(
        map(Joborders => Joborders.map(joborder => this.mapJoborder(joborder)))
      );
  }

  getById(id: string | number): Observable<JobOrder> {
    return super.getById(id).pipe(map(joborder => this.mapJoborder(joborder)));
  }

  getWithQuery(params: string | QueryParams): Observable<JobOrder[]> {
    return super
      .getWithQuery(params)
      .pipe(
        map(jobOrders => jobOrders.map(jobOrder => this.mapJoborder(jobOrder)))
      );
  }

  private mapJoborder(jobOrder: JobOrder): JobOrder {
    return { ...jobOrder, dateLoaded: new Date() };
  }
}
