import { Injectable, signal } from '@angular/core';
import { Employee } from '../component/models/employee.type';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  _employees = signal<Employee[]>([
    {
      id: 1,
      name: 'John Doe',
      companyName: 'Tech Corp',
      contactNo: '1234567890',
      designation: 'Software Engineer',
      profile: 'https://api.dicebear.com/9.x/micah/svg?flip=false',
    },
    {
      id: 2,
      name: 'Jane Smith',
      companyName: 'Web Solutions',
      contactNo: '1234567890',
      designation: 'Project Manager',
      profile: 'https://api.dicebear.com/9.x/micah/svg?flip=true',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      companyName: 'Design Studio',
      contactNo: '1234567890',
      designation: 'UX/UI Designer',
      profile: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Felix',
    },
  ]);

  get employees() {
    return this._employees;
  }

  addEmployee(emp: Employee) {
    this._employees.update((prev) => [...prev, emp]);
  }

  deleteEmployee(id: number) {
    this._employees.update((prev) => prev.filter((e) => e.id !== id));
  }

  updateEmployee(id: number, data: Partial<Employee>) {
    this._employees.update((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...data } : emp))
    );
  }

  getEmployeeById(id: number): Employee | null {
    return this._employees().find((emp) => emp.id === id) ?? null;
  }

  constructor() {}
}
