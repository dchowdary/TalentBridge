import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TaskserviceService {

  private taskListApi = 'http://139.59.21.164/application/service/task/list?emailId=' ;
  private viewTaskApi = 'http://139.59.21.164/application/service/task/details?emailId=';
  private updateTaskApi = 'http://139.59.21.164/application/service/task/update/status?emailId=';
  private newtaskApi = 'http://139.59.21.164/application/service/task/add?emailId=';

  constructor(private http: HttpClient) { }

  getHostname() : string {
    let host = '';
    if(window.location.hostname == 'localhost') host = window.location.protocol + '//' + window.location.hostname + ':8020';
    else  host = window.location.origin + '/qa';
    return host;
  }


  public getTaskList(data,email){
    console.log("email",email,this.taskListApi+email )
    return this.http.post(this.taskListApi+email, data);
  }

  public getViewTask(data,email){
    return this.http.post(this.viewTaskApi+email, data);
  }

  public updateTask(data,email){
    return this.http.post(this.updateTaskApi+email, data);
  }

  public getnewTask(data,email){
    return this.http.post(this.newtaskApi+email, data);
  }
}
