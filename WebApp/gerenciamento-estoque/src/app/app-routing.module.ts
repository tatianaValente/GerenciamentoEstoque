import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EstoqueListComponent } from "./estoque-list/estoque-list.component";
import { EstoqueAddEditComponent } from "./estoque-add-edit/estoque-add-edit.component";

const routes: Routes = [
  {
    path: "estoque-list",
    component: EstoqueListComponent
  },
  {
    path: "estoque-add",
    component: EstoqueAddEditComponent
  },
  {
    path: "estoque-edit/:id",
    component: EstoqueAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
