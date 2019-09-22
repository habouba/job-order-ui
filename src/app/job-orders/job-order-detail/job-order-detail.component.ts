import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  OnInit
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JobOrder } from "../../core";
import { GenericValidator } from "../../shared/generic-validator";

@Component({
  selector: "app-job-order-detail",
  templateUrl: "./job-order-detail.component.html",
  styleUrls: ["./job-order-detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobOrderDetailComponent implements OnInit, OnChanges {
  @Input() jobOrder: JobOrder;
  @Output() unselect = new EventEmitter<string>();
  @Output() add = new EventEmitter<JobOrder>();
  @Output() update = new EventEmitter<JobOrder>();

  @ViewChild("name", { static: true }) nameElement: ElementRef;

  addMode = false;
  form: FormGroup;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [],
      name: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      saying: ["", Validators.required]
    });

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      name: {
        required: "Name is required.",
        minlength: "Name must be at least three characters.",
        maxlength: "Name cannot exceed 50 characters."
      },
      saying: {
        required: "saying is required."
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Watch for value changes
    this.form.valueChanges.subscribe(
      value =>
        (this.displayMessage = this.genericValidator.processMessages(this.form))
    );
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.form);
  }

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

  getErrorMessage() {
    return this.form.get("saying").hasError("required")
      ? "You must enter a value"
      : "";
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
