import { Injectable } from "@angular/core";

import { JobOrder } from "../core";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from "@ngrx/data";

@Injectable({ providedIn: "root" })
export class JobOrderService extends EntityCollectionServiceBase<JobOrder> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super("Joborder", serviceElementsFactory);
  }
}
