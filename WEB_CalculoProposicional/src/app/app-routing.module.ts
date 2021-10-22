import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaDerivacaoComponent } from './area-derivacao/area-derivacao.component';
import { CalculoProposicionalComponent } from './estudo-conceitos/calculo-proposicional/calculo-proposicional.component';
import { ExerciciosComponent } from './exercicios/exercicios.component';

const routes: Routes = [
  {
    path: '',
    component: AreaDerivacaoComponent,
    // children: [
    //   { path: 'inicializar', component: TesteComponent },
    //   { path: 'teste2', component: Teste2Component }
    // ]
  },
  {
    path: 'exercicio/livre',
    component: AreaDerivacaoComponent,
    // children: [
    //   { path: 'inicializar', component: TesteComponent },
    //   { path: 'teste2', component: Teste2Component }
    // ]
  },
  {
    path: 'exercicio/:id',
    component: ExerciciosComponent,
    // children: [
    //   { path: 'inicializar', component: TesteComponent },
    //   { path: 'teste2', component: Teste2Component }
    // ]
  },
  {
    path: 'exercicio/estudo/intro-calculo-proposicional',
    component: CalculoProposicionalComponent,
    // children: [
    //   { path: 'inicializar', component: TesteComponent },
    //   { path: 'teste2', component: Teste2Component }
    // ]
  },
  //exercicio/estudo/intro-regras-calculo-proposicional
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
