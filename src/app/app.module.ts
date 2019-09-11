import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core";
import { AppStoreModule } from "./store/app-store.module";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "job-orders" },
  {
    path: "job-orders",
    loadChildren: "app/job-orders/job-orders.module#JobOrdersModule"
  }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppStoreModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
