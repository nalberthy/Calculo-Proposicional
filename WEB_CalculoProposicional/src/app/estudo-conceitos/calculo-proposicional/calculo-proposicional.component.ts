import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ExercicioFinish } from 'src/app/model/request.model';
import { ExeciciosConceituaisService } from '../service/execicios-conceituais.service';

@Component({
  selector: 'app-calculo-proposicional',
  templateUrl: './calculo-proposicional.component.html',
  styleUrls: ['./calculo-proposicional.component.css']
})
export class CalculoProposicionalComponent implements OnInit {
  @ViewChild('exercicioFinish', { static: false }) private exercicioFinish:any;

  usu_hash:any;
  exe_hash:any;
  req_exe_finish = new ExercicioFinish();

  modalRef: BsModalRef;

  constructor(private route: ActivatedRoute, private exercicioService: ExeciciosConceituaisService,private modalService: BsModalService ) {
    this.modalRef =new BsModalRef;
   }

  ngOnInit(): void {
    this.getParamsUrl();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    // this.modalRef.hidden()
  }

  getParamsUrl(){
    this.route.queryParams.subscribe(
			params => {
        this.usu_hash = params['usu_hash'];
        this.exe_hash = params['exe_hash'];
		}) 
  }

  concluir(){
    if(this.exe_hash){
      this.req_exe_finish.exe_hash = this.exe_hash;
      this.req_exe_finish.usx_completado = true;
    }
    this.exercicioService.finishExercicio(this.usu_hash, this.req_exe_finish).subscribe(
      (response:any)=>{
        if(response.mensagem == "Exercício já finalizado pelo jogador."){
          this.openModal(this.exercicioFinish)
        }
      }    
    )
  }

}
