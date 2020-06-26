import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GoalsComponent } from './goals/goals.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GoalsComponent,
    TasksComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  // Tells Angular that this component will be used even if Angular can't see it
  entryComponents: [AddTaskComponent]
})
export class AppModule { }
