import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { JobOrder, ModalComponent } from "../../core";

@Component({
  selector: "app-job-order-list",
  templateUrl: "./job-order-list.component.html",
  styleUrls: ["./job-order-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobOrderListComponent {
  @Input() jobOrders: JobOrder[];
  @Input() selectedjobOrder: JobOrder;
  @Output() deleted = new EventEmitter<JobOrder>();
  @Output() selected = new EventEmitter<JobOrder>();

  constructor(public dialog: MatDialog) {}

  byId(jobOrder: JobOrder) {
    return jobOrder.id;
  }

  select(jobOrder: JobOrder) {
    this.selected.emit(jobOrder);
  }

  deletejobOrder(jobOrder: JobOrder) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "250px";
    dialogConfig.data = {
      title: "Delete job Order",
      message: `Do you want to delete ${jobOrder.name}`
    };

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(deleteIt => {
      console.log("The dialog was closed");
      if (deleteIt) {
        this.deleted.emit(jobOrder);
      }
    });
  }
}
