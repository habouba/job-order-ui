import { Component } from "@angular/core";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent {
  labTitle = "job-order-poc";
  labState = "now using ngrx-data";
}
