import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AlertComponent } from "../components/alert/alert.component";
import { AlertConfirmationComponent } from "../components/alert-confirmation/alert-confirmation.component";
import { Location } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class DialogService {
  errorOpened: boolean = false;

  constructor(public dialog: MatDialog, private location: Location) {}

  alert(
    text: string,
    icon: string = "check_circle",
    color: string = "primary",
    alertError: boolean = false
  ): Promise<any> {
    if (alertError && this.errorOpened) {
      return;
    }

    const dialogRef = this.dialog.open(AlertComponent, {
      width: "536px",
      data: { text, icon, color }
    });
    if (alertError) {
      this.errorOpened = alertError;
    }

    return new Promise(resolve => {
      dialogRef.afterClosed().subscribe(() => {
        this.errorOpened =
          this.errorOpened && alertError ? false : this.errorOpened;
        resolve();
      });
    });
  }

  confirm(
    title: string,
    text: string,
    btnOkLabel: string = "OK",
    btnOkColor: string = "primary",
    btnCancelLabel: string = "CANCEL"
  ): Promise<any> {
    const dialogRef = this.dialog.open(AlertConfirmationComponent, {
      width: "536px",
      data: { title, text, btnOkLabel, btnOkColor, btnCancelLabel }
    });

    return new Promise(resolve => {
      dialogRef.afterClosed().subscribe(resolve);
    });
  }

  success = (message = "Item salvo com sucesso!", goBack = true) => {
    return () =>
      this.alert(message).then(() => (goBack ? this.location.back() : null));
  };

  error = (error, message = null) => {
    if (typeof error != "string") {
      try {
        message = message || error.error.Messages.join(",");
      } catch (error) {
        message = "Um erro ocorreu";
      }
    } else {
      message = (message || "") + error;
    }

    return this.alert(message, "error", "warn", true);
  };
}
