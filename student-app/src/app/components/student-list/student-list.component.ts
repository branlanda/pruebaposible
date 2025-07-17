import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  selectedStudent: Student | null = null;
  isEditing = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  // Form with validation
  studentForm: FormGroup;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder
  ) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  addStudent(): void {
    this.selectedStudent = null;
    this.isEditing = false;
    this.studentForm.reset();
    this.clearMessages();
  }

  editStudent(student: Student): void {
    this.selectedStudent = student;
    this.isEditing = true;
    this.studentForm.patchValue({
      name: student.name,
      age: student.age,
      email: student.email
    });
    this.clearMessages();
  }

  saveStudent(): void {
    if (this.studentForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    this.clearMessages();

    const formData = this.studentForm.value;

    if (this.isEditing && this.selectedStudent) {
      this.studentService.updateStudent(this.selectedStudent.id!, formData).subscribe({
        next: (updatedStudent) => {
          const index = this.students.findIndex(s => s.id === updatedStudent.id);
          if (index !== -1) {
            this.students[index] = updatedStudent;
          }
          this.successMessage = 'Estudiante actualizado exitosamente';
          this.resetForm();
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.isLoading = false;
        }
      });
    } else {
      this.studentService.createStudent(formData).subscribe({
        next: (newStudent) => {
          this.students.push(newStudent);
          this.successMessage = 'Estudiante creado exitosamente';
          this.resetForm();
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.isLoading = false;
        }
      });
    }
  }

  deleteStudent(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este estudiante?')) {
      this.isLoading = true;
      this.clearMessages();

      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          this.students = this.students.filter(s => s.id !== id);
          this.successMessage = 'Estudiante eliminado exitosamente';
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.isLoading = false;
        }
      });
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.selectedStudent = null;
    this.isEditing = false;
    this.studentForm.reset();
    this.clearMessages();
  }

  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  private markFormGroupTouched(): void {
    Object.keys(this.studentForm.controls).forEach(key => {
      const control = this.studentForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for template
  getFieldError(fieldName: string): string {
    const field = this.studentForm.get(fieldName);
    if (field?.invalid && field?.touched) {
      if (field.errors?.['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} es requerido`;
      }
      if (field.errors?.['email']) {
        return 'Formato de email inválido';
      }
      if (field.errors?.['maxlength']) {
        return `Máximo ${field.errors?.['maxlength'].requiredLength} caracteres`;
      }
      if (field.errors?.['min']) {
        return `Edad mínima: ${field.errors?.['min'].min}`;
      }
      if (field.errors?.['max']) {
        return `Edad máxima: ${field.errors?.['max'].max}`;
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.studentForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }
} 