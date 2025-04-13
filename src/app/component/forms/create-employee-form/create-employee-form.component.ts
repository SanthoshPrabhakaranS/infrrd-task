import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-employee-form.component.html',
  styleUrl: './create-employee-form.component.css',
})
export class CreateEmployeeFormComponent {
  @Input() employeeForm!: FormGroup;

  getControl(name: string) {
    return this.employeeForm.get(name) as FormControl;
  }

  formatContactNo(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    value = value.substring(0, 10);
    input.value = value;
    this.getControl('contactNo').setValue(value);
  }
}
