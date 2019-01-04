import { Component } from '@angular/core';
import { TaskserviceService } from './taskservice.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  email_value: any;
  error_flag: boolean = false;
  btn_flag: boolean = false;
  addtask_flag: boolean = false;
  taskListarray = [];
  modalMsg: any;
  modalTitle: any;
  task: any;
  textareaValue: any;
  calValue: any;
  titleValue: any;

  constructor(
    private taskserviceService: TaskserviceService,
    private modalService: NgbModal) { }

  trackByIndex(index: number, value: number) {
    return index;
  }

  taskSubmit(type) {
    if (type == 'refresh') {
      this.email_value = "";
      this.btn_flag = false;
      this.error_flag = false;

    } else {
      var email_reg = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
      if (!email_reg.test(this.email_value)) {
        this.error_flag = true;
      } ​else {
        this.error_flag = false;
        this.btn_flag = true;
        this.taskListarray = [
          { "completedOnDate": "", "createdOnDate": "2018-12-18", "description": "Lorem Ipsum is simply dummy text of the printing industry.", "emailId": "test@test.com", "id": "b87c3faa-e18e-4e05-9d9e-1e25d894020f", "scheduledOn": "22 Dec, 2018", "status": "pending", "title": "Call Michel and wish him happy birthday" }, { "completedOnDate": "2018-12-18", "createdOnDate": "2018-12-18", "description": "Update 'Task' project code base", "emailId": "test@test.com", "id": "f000f3ae-62f7-449a-bcb4-9dcff6edff09", "scheduledOn": "23 Dec, 2018", "status": "done", "title": "Move project to server" },
          {
            "completedOnDate": "", "createdOnDate": "2018-12-18", "description": "Party at Samual's place. All of my college friends are invited too.",
            "emailId": "test@test.com", "id": "d3473cb3-7926-40c2-90bd-7d3207210b1b", "scheduledOn": "25 Dec, 2018", "status": "deleted", "title": "Attend christmas party"
          }]
        let data = {
          "status": 'all'
        }
        this.taskserviceService.getTaskList(data, this.email_value).subscribe(resp => {
          console.log("resp", resp)

        });
      }
    }
  }

  viewTask() {
    let data = {
      "recordId": "f000f3ae-62f7-449a-bcb4-9dcff6edff09"
    }

    this.taskserviceService.getViewTask(data, this.email_value).subscribe(res => {
      console.log("res", res);
    });
  }

  deleteTask(content) {
    this.task = 'delete';
    this.modalService.open(content);
    this.modalTitle = "Delete Task";
    this.modalMsg = "You are about to delete the task. Click OK to confirm";
  }

  doneTask(content) {
    this.task = 'done';
    this.modalService.open(content);
    this.modalTitle = "Mark as Done";
    this.modalMsg = "You are about to mark the task as Done. Click OK to confirm";
  }

  addTaskList() {
    this.addtask_flag = true;
  }

  updatetask(from) {
    if (from == 'cancel') {
      this.addtask_flag = false;
    } else if (from == 'done') {
      let data = {
        "recordId": "d3473cb3-7926-40c2-90bd-7d3207210b1b",
        "status": "done"
      }
      this.taskserviceService.updateTask(data, this.email_value).subscribe(res => {
        console.log("resp", res)
      });
    } else if (from == 'delete') {
      let data = {
        "recordId": "d3473cb3-7926-40c2-90bd-7d3207210b1b",
        "status": "deleted"
      }
      this.taskserviceService.updateTask(data, this.email_value).subscribe(res => {
        console.log("resp", res)
      })

    } else if (from == 'save') {

      let data = {
        "title": this.titleValue,
        "scheduledOn": this.calValue,
        "description": this.textareaValue
      }
      this.taskserviceService.getnewTask(data, this.email_value).subscribe(resp => {
        console.log("resp", resp);
      })
    }
  }
}
