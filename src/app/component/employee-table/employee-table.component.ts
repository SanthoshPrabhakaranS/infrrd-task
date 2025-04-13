import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Employee } from '../models/employee.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-table',
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css',
})
export class EmployeeTableComponent {
  @Input() employeesList: Employee[] = [];
  @Input() openEditModal!: (employeeId: number) => void;
  @Input() openDeleteModal!: (employeeId: number) => void;

  onOpenEditModal(employeeId: number) {
    this.openEditModal(employeeId);
  }

  onOpenDeleteModal(employeeId: number) {
    this.openDeleteModal(employeeId);
  }
}
