import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatDialogModule,
    MatListModule
  ],
  exports: [
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatDialogModule,
    MatListModule
  ]
})
export class MaterialModule {}
