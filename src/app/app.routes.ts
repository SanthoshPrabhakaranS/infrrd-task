import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'employee/:id',
    loadComponent: () =>
      import('./employee-details/employee-details.component').then(
        (m) => m.EmployeeDetailsComponent
      ),
  },
];
