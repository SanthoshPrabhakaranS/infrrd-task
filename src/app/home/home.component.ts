import { Component, computed, inject, signal } from '@angular/core';
import { EmployeesService } from '../services/employees.service';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../component/dialog/dialog.component';
import { EmployeeTableComponent } from '../component/employee-table/employee-table.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateEmployeeFormComponent } from '../component/forms/create-employee-form/create-employee-form.component';
import { DeleteEmployeeFormComponent } from '../component/forms/delete-employee-form/delete-employee-form.component';
import { PROFILE_IMAGES } from '../component/constants/constants';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    DialogComponent,
    EmployeeTableComponent,
    CreateEmployeeFormComponent,
    DeleteEmployeeFormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  employeesService = inject(EmployeesService);
  employeesList = this.employeesService._employees;

  visible = signal<boolean>(false);
  showDeleteModal = signal<boolean>(false);
  title = signal<string>('Add Employee');
  employeeId = signal<number>(0);
  itemsPerPage = 5;
  pageNumbers = computed(() => {
    const totalEmployees = this.employeesList().length;
    const pageCount = Math.ceil(totalEmployees / this.itemsPerPage);
    return Array.from({ length: pageCount }).map((_, i) => i + 1);
  });
  currentPage = signal<number>(1);
  paginatedEmployeesList = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.employeesList().slice(start, start + this.itemsPerPage);
  });

  employeeForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    companyName: new FormControl('', [Validators.required]),
    contactNo: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/),
    ]),
    designation: new FormControl('', [Validators.required]),
  });

  getContactNoControl() {
    return this.employeeForm.get('contactNo') as FormControl;
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.addEmployee();
      this.employeeForm.reset();
      this.closeModal();
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  addEmployee() {
    const profileImg =
      PROFILE_IMAGES[Math.floor(Math.random() * PROFILE_IMAGES.length)];

    const newEmployee = {
      id: this.employeesList().length + 1,
      name: this.employeeForm.value.name,
      companyName: this.employeeForm.value.companyName,
      contactNo: this.employeeForm.value.contactNo,
      designation: this.employeeForm.value.designation,
      profile: profileImg,
    };

    this.employeesService.addEmployee(newEmployee);
    this.closeModal();
  }

  openEditModal = (id: number) => {
    this.employeeId.set(id);
    const employee = this.employeesService.getEmployeeById(id);

    if (employee) {
      this.title.set('Edit Employee');
      this.employeeForm.patchValue({
        name: employee.name,
        companyName: employee.companyName,
        contactNo: employee.contactNo,
        designation: employee.designation,
      });
      this.openModal();
    } else return;
  };

  updateEmployee() {
    const employee = this.employeesService.getEmployeeById(this.employeeId());

    if (employee) {
      this.employeesService.updateEmployee(this.employeeId(), {
        name: this.employeeForm.value.name,
        companyName: this.employeeForm.value.companyName,
        contactNo: this.employeeForm.value.contactNo,
        designation: this.employeeForm.value.designation,
      });
      this.closeModal();
    }
  }

  openModal() {
    this.visible.set(true);
  }

  closeModal() {
    this.employeeForm.reset();
    this.visible.set(false);
    this.title.set('Add Employee');
  }

  openDeleteModal = (id: number) => {
    this.employeeId.set(id);
    this.showDeleteModal.set(true);
  };

  closeDeleteModal() {
    this.showDeleteModal.set(false);
  }

  deleteEmployee() {
    this.employeesService.deleteEmployee(this.employeeId());
    this.closeDeleteModal();
  }

  onPageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > this.pageNumbers().length) {
      return;
    }

    this.currentPage.set(pageNumber);
  };
}
