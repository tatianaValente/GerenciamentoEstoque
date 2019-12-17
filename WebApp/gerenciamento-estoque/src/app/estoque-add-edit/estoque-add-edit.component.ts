import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Validators, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { EstoqueService } from "../services/estoque.service";
import { EstoqueModel } from "../models/estoque.model";
import { FormConfigService } from "../shared/services/form-config.service";
import { DialogService } from "../shared/services/dialog.service";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";

@Component({
  selector: "app-estoque-add-edit",
  templateUrl: "./estoque-add-edit.component.html",
  styleUrls: ["./estoque-add-edit.component.scss"],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
})
export class EstoqueAddEditComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  screen: string = "ADICIONAR";
  icon: string = "add";
  edit: boolean;
  id: number = null;

  form = this.fb.group({
    id: [this.id],
    nome: [null, Validators.required],
    quantidade: [null, Validators.required],
    valor: [null, Validators.required]
  });

  constructor(
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    public formConfig: FormConfigService,
    private dialog: DialogService,
    private service: EstoqueService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const routeName = this.router.url;
    if (routeName.indexOf("estoque-edit") != -1) this.edit = true;
    else this.edit = false;
    if (this.edit === true) {
      this.screen = "EDITAR";
      this.icon = "edit";
      this.id = this.activatedRoute.snapshot.params.id;

      this.subs.push(
        this.service.getById(this.id).subscribe(
          (estoque: EstoqueModel) => {
            if (!estoque) {
              return this.router.navigate(["estoque-list"]);
            }
            this.form.setValue({
              id: this.id,
              nome: estoque.nome,
              quantidade: estoque.quantidade,
              valor: estoque.valor
            });
          },
          err => {
            return this.router.navigate(["estoque-list"]);
          }
        )
      );
    }
  }

  onSubmit() {
    const estoque = new EstoqueModel();
    const form = this.form.value;
    estoque.id = form.id ? +form.id : 0;
    estoque.nome = form.nome;
    estoque.quantidade = +form.quantidade;
    estoque.valor = form.valor;

    const observer = {
      next: () => {
        this.dialog.success()();
      },
      error: this.dialog.error
    };

    // Add estoque
    if (this.edit != true) {
      this.subs.push(this.service.post(estoque).subscribe(observer));

      //Edit estoque
    } else {
      this.subs.push(
        this.service.put(estoque, this.form.value.id).subscribe(observer)
      );
    }
  }

  delete() {
    this.dialog
      .confirm(
        null,
        "Gostaria de deletar este item permanentemente?",
        "SIM, DELETAR",
        "warn"
      )
      .then(value => {
        if (value === true) {
          this.subs.push(
            this.service
              .delete(this.form.value.id)
              .subscribe(
                this.dialog.success("Item deletado com sucesso!"),
                this.dialog.error
              )
          );
        }
      });
  }

  cancel() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
