import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JobOrder } from "../../core";

@Component({
  selector: "app-job-order-detail",
  templateUrl: "./job-order-detail.component.html",
  styleUrls: ["./job-order-detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobOrderDetailComponent implements OnChanges {
  @Input() jobOrder: JobOrder;
  @Output() unselect = new EventEmitter<string>();
  @Output() add = new EventEmitter<JobOrder>();
  @Output() update = new EventEmitter<JobOrder>();

  @ViewChild("name", { static: true }) nameElement: ElementRef;

  addMode = false;

  form = this.fb.group({
    id: [],
    name: ["", Validators.required],
    saying: [""]
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    this.setFocus();
    if (this.jobOrder && this.jobOrder.id) {
      this.form.patchValue(this.jobOrder);
      this.addMode = false;
    } else {
      this.form.reset();
      this.addMode = true;
    }
  }

  addJobOrder(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.add.emit({ ...this.jobOrder, ...value });
    }
    this.close();
  }

  close() {
    this.unselect.emit();
  }

  saveJobOrder(form: FormGroup) {
    if (this.addMode) {
      this.addJobOrder(form);
    } else {
      this.updateJobOrder(form);
    }
  }

  setFocus() {
    this.nameElement.nativeElement.focus();
  }

  updateJobOrder(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.update.emit({ ...this.jobOrder, ...value });
    }
    this.close();
  }
}
