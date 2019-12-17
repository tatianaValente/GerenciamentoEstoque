import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { EstoqueModel } from "../models/estoque.model";

import { EstoqueService } from "../services/estoque.service";
import { Router } from "@angular/router";
import { DialogService } from "../shared/services/dialog.service";

@Component({
  selector: "app-estoque-list",
  templateUrl: "./estoque-list.component.html",
  styleUrls: ["./estoque-list.component.scss"]
})
export class EstoqueListComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  displayedColumns: string[] = [
    "nome",
    "quantidade",
    "valor",
    "edit",
    "delete"
  ];

  dataSource = new MatTableDataSource<EstoqueModel>();

  constructor(
    private service: EstoqueService,
    private router: Router,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.subs.push(
      this.service.get().subscribe(data => {
        this.dataSource = new MatTableDataSource<EstoqueModel>(data);
      })
    );
  }

  edit(element) {
    this.router.navigate(["/estoque-edit", element.id]);
  }

  delete(element) {
    const observer = {
      next: () => {
        this.dialog.success("Item deletado com sucesso!", false);
        this.loadData();
      },
      error: this.dialog.error
    };

    this.dialog
      .confirm(
        null,
        "Gostaria de deletar este item permanentemente?",
        "SIM, DELETAR",
        "warn"
      )
      .then(value => {
        if (value === true) {
          this.subs.push(this.service.delete(element.id).subscribe(observer));
        }
      });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
