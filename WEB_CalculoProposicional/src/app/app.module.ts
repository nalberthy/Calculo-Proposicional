import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AreaDerivacaoComponent } from './area-derivacao/area-derivacao.component';

import { AreaDerivacaoService } from './area-derivacao/service/area-derivacao.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExerciciosComponent } from './exercicios/exercicios.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CalculoProposicionalComponent } from './estudo-conceitos/calculo-proposicional/calculo-proposicional.component';
import { RegrasComponent } from './estudo-conceitos/regras/regras.component';



@NgModule({
  declarations: [
    AppComponent,
    AreaDerivacaoComponent,
    ExerciciosComponent,
    CalculoProposicionalComponent,
    RegrasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ModalModule.forRoot(),  

    
  ],
  providers: [AreaDerivacaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
