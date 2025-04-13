import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  visible = input<boolean>(false);
  title = input<string>('Default Title');
  closeModal = output<void>();
  onSubmit = output<void>();
  updateEmployee = output<void>();
  buttonName = input<string>('');

  close() {
    this.closeModal.emit();
  }

  submit() {
    if (this.title() == 'Add Employee' || this.title() == 'Delete Employee') {
      this.onSubmit.emit();
    } else if (this.title() == 'Edit Employee') {
      this.updateEmployee.emit();
    }
  }
}
