import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExeciciosConceituaisService {
  private readonly API =  `${environment.API}`;
  constructor( private http:HttpClient) { }

  

  finishExercicio(usu_hash:any,request:any){
    console.log(usu_hash)
    var header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${usu_hash}` });
    return this.http.post(`https://api.thelogiclive.com/api/v1/respostas`, request, {headers: header}).pipe(take(1));
  }

}
