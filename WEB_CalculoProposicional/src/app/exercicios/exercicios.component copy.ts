import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { ExercicioService} from './service/exercicio.service'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Request,RequestExercicio, Request_Exe } from '../model/request.model';
import { ActivatedRoute } from '@angular/router';
declare var gramLogic: any;
declare var gramLogic2: any;

@Component({
  selector: 'app-exercicios',
  templateUrl: './exercicios.component.html',
  styleUrls: ['./exercicios.component.css']
})
export class ExerciciosComponent implements OnInit {
  
  req_exercicio = new RequestExercicio();
  request = new Request_Exe();

  xml_input ='';
  data:any;
  dataUser:any;

  
  form: FormGroup;


// dados para requisicao
  usu_hash:any;
  exe_hash:any;


  constructor(private exercicioService: ExercicioService, private fb: FormBuilder, private route: ActivatedRoute) { 
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
      regra:[null],
      xml_entrada:''
    })
  }

  ngOnInit(): void {
    this.getParamsUrl();
    this.inicializar();
  }

  getParamsUrl(){
    this.route.queryParams.subscribe(
			params => {
        this.usu_hash =params['usu_hash'];
        this.exe_hash= params['exe_hash'];
		}) 
  }
  
  // getDataUser(){
  //   this.exercicioService.getUsuario(this.usu_hash).subscribe(
  //     (response:any)=> {
  //       this.dataUser = response;
  //     }
  //   )

  // }

  inicializar(): void {
    // var validacao = gramLogic.validar(this.xml_input,false);
  
    // if (validacao.sucesso == true){
    //   this.request.xml=validacao.xml

      this.request.exe_hash = this.exe_hash;

      this.exercicioService.inicializar(this.route.snapshot.params.id,this.request).subscribe(
				response=> this.data = response
			)
    // }
    // this.exercicioService.getUsuario(this.usu_hash).subscribe(
    //   (response:any)=> {
    //     // this.req_exercicio.exercicio =  this.route.snapshot.params.id;
    //     this.req_exercicio.exe_hash = this.exe_hash;
    //     this.req_exercicio.usu_hash = this.usu_hash;

    //     this.req_exercicio.jog_codigo = response.data.jog_codigo;
    //     this.req_exercicio.jog_email = response.data.jog_email;
    //     this.req_exercicio.jog_nome = response.data.jog_nome;
    //     this.req_exercicio.jog_usunome = response.data.jog_usunome;
    //     if(response.data.jog_ativo == 1){
    //       this.exercicioService.inicializar({"modulo":this.request, "exercicio":this.req_exercicio}).subscribe(
    //         response=> this.data = response
    //       )
    //     }
    //   }
    // )
  }

  derivar(){

    if(this.form.value){
      if(this.form.controls.regra.value){    
        this.request.regra = this.form.controls.regra.value;
        if(this.request.regra=="Introducao_Disjuncao" || this.request.regra=="Hipotese_PC"||this.request.regra=="Hipotese_Raa"){
          console.log(this.form.controls.xml_entrada.value)
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
          }
        )
      }
    
    }

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
