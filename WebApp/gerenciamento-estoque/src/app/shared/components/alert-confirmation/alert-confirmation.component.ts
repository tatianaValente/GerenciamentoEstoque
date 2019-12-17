import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export class DialogData {
  title: string;
  text: string;
  btnOkLabel?: string;
  btnOkColor?: string;
  btnCancelLabel?: string;
}

@Component({
  selector: "app-alert-confirmation",
  templateUrl: "./alert-confirmation.component.html",
  styleUrls: ["./alert-confirmation.component.scss"]
})
export class AlertConfirmationComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AlertConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {}
}
