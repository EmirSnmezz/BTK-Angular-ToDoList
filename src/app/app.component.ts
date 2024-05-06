import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatInputModule,MatButtonModule,FormsModule,MatIconModule,MatCheckboxModule,MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ToDoList2';
  newTask:TaskModel = { name :"", status : false} ;
  taskList:TaskModel[] = []
  viewList:TaskModel[] = []
  isEditMode : boolean = false;
  selectedIndex:number = 0 ; 
  
  constructor(private _snackBar: MatSnackBar, public dialog:MatDialog) {}


  addTask()
  {
    this.taskList.push({...this.newTask});
    this.newTask.name = ""
    this.newTask.status = false;
    this._snackBar.open('Task Başarıyla Eklendi!', 'Kapat', {duration: 2000}); // Bildirimin gösterileceği süre (milisaniye cinsinden)
  }

  statusChange(task:TaskModel)
  {
    task.status = !task.status;
    console.log(task.name, task.status);
  }

  allTasks()
  {
    this.viewList = [];
    this.viewList = this.taskList;
    return this.viewList;
  }

  doneTasks()
  {
    this.viewList = [];
    this.viewList = this.taskList.filter(x => x.status == true)
    return this.viewList;
  }

  toDoTasks()
  {
    this.viewList = [];
    this.viewList = this.taskList.filter(x => x.status == false)
    return this.viewList;
  }

  deleteTask(index:number)
{
  this.viewList.splice(index, 1)
  this._snackBar.open("Task Başarıyla Silindi","Kapat",{duration:2000});
}

  editTask(index:number)
  {
    this.isEditMode = true;
    this.selectedIndex = index;
    // this.dialog.open(edit-dialog,{         // Dialog Component
    //   data: index
    // })
  }

  deleteDoneTasks()
  {

  }
}

export interface TaskModel{
  name:string ;
  status:boolean ;
}
