import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { EstoqueListComponent } from "./estoque-list/estoque-list.component";
import { EstoqueAddEditComponent } from "./estoque-add-edit/estoque-add-edit.component";
import { AlertComponent } from "./shared/components/alert/alert.component";
import { AlertConfirmationComponent } from "./shared/components/alert-confirmation/alert-confirmation.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NumberOnlyDirective } from "./shared/directives/number.directive";
import { MaterialModule } from "./material.module";
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { EstoqueService } from "./services/estoque.service";
import { AppComponent } from "./app-root-component/app.component";

@NgModule({
  declarations: [
    AppComponent,
    EstoqueListComponent,
    AlertConfirmationComponent,
    EstoqueAddEditComponent,
    AlertComponent,
    NumberOnlyDirective
  ],
  imports: [
    MaterialModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    BrowserAnimationsModule
  ],
  exports: [MatIconModule],
  entryComponents: [AlertComponent, AlertConfirmationComponent],
  providers: [EstoqueService],
  bootstrap: [AppComponent]
})
export class AppModule {}
