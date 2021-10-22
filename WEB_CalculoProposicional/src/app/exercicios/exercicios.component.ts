import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { ExercicioService} from './service/exercicio.service'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ExercicioFinish, Request_Exe } from '../model/request.model';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
declare var gramLogic: any;
declare var gramLogic2: any;

@Component({
  selector: 'app-exercicios',
  templateUrl: './exercicios.component.html',
  styleUrls: ['./exercicios.component.css']
})
export class ExerciciosComponent implements OnInit {
  
  @ViewChild('erroDerivacao', { static: false }) private erroDerivacao:any;
  @ViewChild('exercicioFinish', { static: false }) private exercicioFinish:any;

  request = new Request_Exe();
  req_exe_finish = new ExercicioFinish();
  xml_input ='';
  data:any;
  dataUser:any;
 
  
  form: FormGroup;

// dados para requisicao
  usu_hash:any;
  exe_hash:any;
  modalRef: BsModalRef;

  constructor(private exercicioService: ExercicioService, private fb: FormBuilder, private route: ActivatedRoute,private modalService: BsModalService) { 
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
      regra:[null],
      xml_entrada:''
    })
    this.modalRef =new BsModalRef
  }

  ngOnInit(): void {
    this.getParamsUrl();
    this.inicializar();
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
  
  inicializar(): void {
      this.request.exe_hash = this.exe_hash;

      this.exercicioService.inicializar(this.route.snapshot.params.id,this.request).subscribe(
				response=> this.data = response
			)

  }

  derivar(){
    if(this.form.value){
      if(this.form.controls.regra.value){    
        this.request.regra = this.form.controls.regra.value;
        if(this.request.regra=="Introducao_Disjuncao" || this.request.regra=="Hipotese_PC"||this.request.regra=="Hipotese_Raa"){
          // console.log(this.form.controls.xml_entrada.value)
          var validacao = gramLogic2.validarEntrada(this.form.controls.xml_entrada.value,false);
          if (validacao.sucesso == true){
            this.request.xml_entrada=validacao.xml;
          }
        }
        
        if(this.form.controls.checkArray.value.length == 1){
            this.request.entrada1 = this.form.controls.checkArray.value[0];
        }
        if(this.form.controls.checkArray.value.length == 2){
          this.request.entrada1 = this.form.controls.checkArray.value[0];
          this.request.entrada2 = this.form.controls.checkArray.value[1];
        }
        if(this.form.controls.checkArray.value.length == 3){
          this.request.entrada1 = this.form.controls.checkArray.value[0];
          this.request.entrada2 = this.form.controls.checkArray.value[1];
          this.request.entrada3 = this.form.controls.checkArray.value[2];
        }

        this.request.derivacoes = this.data.listaDerivacoes;
        this.request.formula = this.data.formula;
        this.request.msg = this.data.msg;
          

        this.exercicioService.derivar(this.route.snapshot.params.id,this.request).subscribe(
          response=> {
            this.data = response;
            this.form = this.fb.group({
              checkArray: this.fb.array([], [Validators.required]),
              regra:[null],
              xml_entrada:''
            })
            this.request.entrada1 = "";
            this.request.entrada2 = "";
            this.request.entrada3 = "";
            this.request.msg = "";        
            if(this.data.msg == 'Erro ao Tentar Derivar'){
              this.openModal(this.erroDerivacao)
            }
          }
        )
      }
    
    }

  }

  onClickTable(e:any){
    let input:any = document.getElementById(e);
    let linha:any = document.getElementById('linha-'+e)

    input.checked= !input.checked
     const checkArray: FormArray = this.form.get('checkArray') as FormArray;
     console.log(checkArray.controls)
    if(checkArray.controls.length>2){
      input.checked = false;
      
    }
    if (input.checked) {
      linha.classList.add('selecionado');
      checkArray.push(new FormControl(input.value));
    } 
    else {
      let i: number = 0;
      checkArray.controls.forEach((item) => {
        if (item.value == input.value) {
          checkArray.removeAt(i);
          linha.classList.remove('selecionado');
          return;
        }
        i++;
      });
    }
    ;
  }
  onCheckboxChange(e:any) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if(checkArray.controls.length>2){
      e.target.checked = false;
    }
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }    
  }

  finalizar_exercicio(){
    if(this.exe_hash){
      this.req_exe_finish.exe_hash = this.exe_hash;
      if(this.data.finish_exe){
        this.req_exe_finish.usx_completado = this.data.finish_exe;
      }

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
