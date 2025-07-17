import { Component } from '@angular/core';
import { StudentListComponent } from './components/student-list/student-list.component';

@Component({
  selector: 'app-root',
  imports: [StudentListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'Gestión de Estudiantes';
}
