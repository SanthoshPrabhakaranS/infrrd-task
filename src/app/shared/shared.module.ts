import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogComponent } from '../component/dialog/dialog.component';
import { EmployeeTableComponent } from '../component/employee-table/employee-table.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, DialogComponent, EmployeeTableComponent],
  exports: [DialogComponent, EmployeeTableComponent, CommonModule],
})
export class SharedModule {}
