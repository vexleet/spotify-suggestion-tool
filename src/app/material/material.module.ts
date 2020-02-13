import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {}
