import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaDerivacaoService {
  private readonly API =  `${environment.API}`;
  constructor(
    private http:HttpClient
  ) { }

  inicializar(request:any){
    return this.http.post(`${this.API}derivacao/inicializar`,request).pipe(take(1));
  }
  derivar(request:any){
    console.log(request)
    return this.http.post(`${this.API}derivacao/derivar`,request).pipe(take(1));
  }

}
