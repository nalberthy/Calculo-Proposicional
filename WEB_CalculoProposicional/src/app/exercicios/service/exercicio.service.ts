import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExercicioService {
  private readonly API =  `${environment.API}`;
  constructor(
    private http:HttpClient
  ) { }

  inicializar(id:any, dataRequest:any){
    return this.http.post(`${this.API}derivacao/inicializar/exercicio/`+id,dataRequest).pipe(take(1));
  }
  derivar(id:any, request:any){
    // console.log(request)
    return this.http.post(`${this.API}derivacao/derivar/exercicio/`+id,request).pipe(take(1));
  }
  getUsuario(usu_hash:any){
    var header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${usu_hash}` });
    return this.http.get(`https://api.thelogiclive.com/api/v1/jogador`,{headers: header}).pipe(take(1));
  }
  finishExercicio(usu_hash:any,request:any){
    console.log(usu_hash)
    var header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${usu_hash}` });
    return this.http.post(`https://api.thelogiclive.com/api/v1/respostas`, request, {headers: header}).pipe(take(1));
  }

}
