import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class MaterialModule {}
