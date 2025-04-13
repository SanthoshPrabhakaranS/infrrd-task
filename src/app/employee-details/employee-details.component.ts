import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Employee } from '../component/models/employee.type';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-employee-details',
  imports: [RouterLink],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent {
  constructor(private route: ActivatedRoute) {}
  employeesService = inject(EmployeesService);
  employeeDetail = signal<Employee | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.employeeDetail.set(
      this.employeesService.getEmployeeById(Number(id)) || null
    );

    console.log(this.employeeDetail());
  }
}
