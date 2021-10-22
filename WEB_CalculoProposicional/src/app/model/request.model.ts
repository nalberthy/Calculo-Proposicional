export class Request {
    xml: string='';
    xml_entrada:string='';
    entrada1:string='';
    entrada2:string='';
    entrada3:string='';
    regra:string='';
    derivacoes:string='';
    formula:string='';
    msg:string='';
    exe_hash?: string ;
}
export class Request_Exe {
    xml_entrada:string='';
    entrada1:string='';
    entrada2:string='';
    entrada3:string='';
    regra:string='';
    derivacoes:string='';
    formula:string='';
    msg:string='';
    exe_hash?: string ;
}

export class ExercicioFinish {
        exe_hash:string = '';
        usx_completado?: boolean = false;
        uer_log?: string;
        tempo_exercicio?: number;
}

