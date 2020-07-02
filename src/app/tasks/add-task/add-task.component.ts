import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { TasksService } from '../tasks.service';

@Component({
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  types = [
    { value: "priority", label: "Priority" },
    { value: "recurrent", label: "Recurrent" },
    { value: "free-time", label: "Free Time" }
  ];
  id: string;
  task: string;
  type = "priority";
  hoursRequired: number;
  done: boolean;
  note: string;
  mode = 'create';

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tasksService: TasksService) {
      this.mode = data.mode;
      if (data.task) {
        this.id = data.task.id;
        this.task = data.task.task;
        this.type = data.task.type;
        this.hoursRequired = data.task.hoursRequired;
        this.done = data.task.done;
        this.note = data.task.note;
      }
    }

  onCancelClick() {
    this.dialogRef.close();
  }

  addTask(form: NgForm) {
    if (form.invalid) {
      return;
    }

    let data: Task = {
      id: null,
      task: form.value.task,
      type: form.value.type,
      note: form.value.note
    };

    if (data.type !== 'Free Time') {
      data.hoursRequired = form.value.hoursRequired;
      if (this.mode === 'edit') {
        data.done = form.value.done;
      }
    }

    if (this.mode === 'create') {
      this.tasksService.addTask(data).subscribe(res => {
        this.dialogRef.close(res.message);
      });
    } else {
      data.id = this.id;
      this.tasksService.editTask(data).subscribe(res => {
        this.dialogRef.close(res.message);
      });
    }
  }
}
