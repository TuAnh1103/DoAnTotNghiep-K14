import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { CommonService } from 'src/app/shared/common.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UploadFilesService {
private baseUrl="";
constructor(private commonService:CommonService,private http:HttpClient) {
  this.baseUrl=this.commonService.webApiUrl;
}
upload(file:File):Observable<HttpEvent<any>>{
  const formData: FormData=new FormData();
  formData.append('file',file);
  const req=new HttpRequest('POST',`${this.baseUrl}/upload`,formData,{
    reportProgress:true,
    responseType:'json'
  });
  return this.http.request(req);
}

}
