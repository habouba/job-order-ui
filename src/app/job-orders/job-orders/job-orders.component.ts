import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { JobOrder } from "../../core";
import { JobOrderService } from "../job-order.service";

@Component({
  selector: "app-job-orders",
  templateUrl: "./job-orders.component.html",
  styleUrls: ["./job-orders.component.scss"]
})
export class JobOrdersComponent implements OnInit {
  loading$: Observable<boolean>;
  selected: JobOrder;
  jobOrders$: Observable<JobOrder[]>;

  constructor(private jobOrderService: JobOrderService) {
    this.jobOrders$ = jobOrderService.entities$;
    this.loading$ = jobOrderService.loading$;
  }

  ngOnInit() {
    this.getJobOrders();
  }

  add(jobOrder: JobOrder) {
    this.jobOrderService.add(jobOrder);
  }

  close() {
    this.selected = null;
  }

  delete(jobOrder: JobOrder) {
    this.jobOrderService.delete(jobOrder.id);
    this.close();
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  getJobOrders() {
    this.jobOrderService.getAll();
    this.close();
  }

  select(jobOrder: JobOrder) {
    this.selected = jobOrder;
  }

  update(jobOrder: JobOrder) {
    this.jobOrderService.update(jobOrder);
  }
}
