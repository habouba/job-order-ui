import { Injectable } from "@angular/core";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from "ngrx-data";
import { JobOrder } from "../core";

@Injectable({ providedIn: "root" })
export class JobOrderService extends EntityCollectionServiceBase<JobOrder> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super("Joborder", serviceElementsFactory);
  }
}
