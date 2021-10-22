import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { AreaDerivacaoService } from './service/area-derivacao.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Request } from '../model/request.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

declare var gramLogic: any;
declare var gramLogic2: any;

@Component({
  selector: 'app-area-derivacao',
  templateUrl: './area-derivacao.component.html',
  styleUrls: ['./area-derivacao.component.css']
})
export class AreaDerivacaoComponent implements OnInit {
  @ViewChild('erroDerivacao', { static: false }) private erroDerivacao:any;
  @ViewChild('exercicioFinish', { static: false }) private exercicioFinish:any;
  @ViewChild('atingiuConclusao', { static: false }) private atingiuConclusao:any;

  req = new Request;
  xml_input ='';

  data:any;


  // Derivação

  form: FormGroup;
  // modal
  modalRef: BsModalRef;

  constructor(private derivacaoService: AreaDerivacaoService, private fb: FormBuilder, private modalService: BsModalService) { 
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
      regra:[null],
      xml_entrada:''
    })
    this.modalRef =new BsModalRef;
  }

  ngOnInit(): void {
    
  }
  
  refresh(): void {
    window.location.reload(); 
  }
     
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    // this.modalRef.hidden()
  }

  inicializar(): void {

    var validacao = gramLogic.validar(this.xml_input,false);
  

    if (validacao.sucesso == true){
      this.req.xml=validacao.xml
      this.derivacaoService.inicializar(this.req).subscribe(
				response=> this.data = response
			)
    }
  }

  derivar(){

    if(this.form.value){
      if(this.form.controls.regra.value){    
        this.req.regra = this.form.controls.regra.value;
        if(this.req.regra=="Introducao_Disjuncao" || this.req.regra=="Hipotese_PC"||this.req.regra=="Hipotese_Raa"){
          console.log(this.form.controls.xml_entrada.value)
          var validacao = gramLogic2.validarEntrada(this.form.controls.xml_entrada.value,false);
          if (validacao.sucesso == true){
            console.log(validacao.xml)
            this.req.xml_entrada=validacao.xml;
          }
        }
        
        if(this.form.controls.checkArray.value.length == 1){
            this.req.entrada1 = this.form.controls.checkArray.value[0];
        }
        if(this.form.controls.checkArray.value.length == 2){
          this.req.entrada1 = this.form.controls.checkArray.value[0];
          this.req.entrada2 = this.form.controls.checkArray.value[1];
        }
        if(this.form.controls.checkArray.value.length == 3){
          this.req.entrada1 = this.form.controls.checkArray.value[0];
          this.req.entrada2 = this.form.controls.checkArray.value[1];
          this.req.entrada3 = this.form.controls.checkArray.value[2];
        }

        this.req.derivacoes = this.data.listaDerivacoes;
        this.req.formula = this.data.formula;
        this.req.msg = this.data.msg;
          

        this.derivacaoService.derivar(this.req).subscribe(
          response=> {
            this.data = response;
            this.form = this.fb.group({
              checkArray: this.fb.array([], [Validators.required]),
              regra:[null],
              xml_entrada:''
            })
            this.req.entrada1 = "";
            this.req.entrada2 = "";
            this.req.entrada3 = "";
            this.req.msg = "";       
            if(this.data.msg == 'Atingiu a Conclusão'){
              this.openModal(this.atingiuConclusao)
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


}

