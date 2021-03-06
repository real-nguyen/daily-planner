import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/models/task.model';
import { TasksService } from '../tasks.service';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task: Task;
  faTimes = faTimes;

  constructor(private tasksService: TasksService, public dialog: MatDialog) { }

  onCheck(event: Event, id: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.tasksService.markDone(id, isChecked);
  }

  deleteTask(id: string) {
    this.tasksService.deleteTask(id).subscribe(() => {
      this.tasksService.fetchTasks();
    });
  }

  editTask(task: Task) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '40%',
      data: {
        mode: 'edit',
        task: task
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasksService.fetchTasks();
      }
    });
  }
}
