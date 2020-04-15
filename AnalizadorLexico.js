"use strict";
var Salida;
var Errores;
var estado;
var fila;
var columna;
var columnaToken;
var auxlex;
var caracter;
var isDecimal;/*
var globalVariable={
    Salida
};*/
function test(){    
    alert('Hello World! - guapo');
}
function EnviarEntrada(text, textarea, textarea2){
    
   // alert('Hello World!'+text); 
    AnalizadorLexico(text);
    console.log(Salida);
    console.log(Errores);
    //  textarea.value = PrintTokens();
    SetUp(Salida, textarea, textarea2);
}
function PrintTokens(){
    var text ="";
    var i =0;
   for(let token of Salida){
       i++;
      // console.log(token);
      text+=i+". ";
      text+=token.tipo+", ";
      text+=token.lexema+", ";
      text+=token.fila+", ";
      text+=token.columna;
      text+="\n\n";
   }
    return text;
}
function PrintErrores(){
    var text ="";
    var i =0;
   for(let error of Errores){
       i++;
      // console.log(token);
      text+=i+". ";
      text+=error.valor+", ";
      text+=error.descripcion+", ";
      text+=error.fila+", ";
      text+=error.columna;
      text+="\n\n";
   }
   if(i>0){
       text="Erores Léxicos:\n"+text;
   }
    return text;
}
function AnalizadorLexico(entrada){
    Salida = new Array();
    Errores = new Array();
    entrada = entrada + "#";
    fila = 1;
    columna = 1;
    estado = 0;
    auxlex = "";
    caracter=false;
    isDecimal=false;
    var c;
    for (var i = 0; i < entrada.length /*- 1*/; i++)
    {
        c = entrada.charAt(i);
        /*
        if (c.localeCompare('#')==1)
        {
            postC = entrada.ElementAt(i + 1);
        }*/
        
        columna++;
        switch (estado)
        {
            case 0:
                if (isDigit(c))
                {
                    estado = 1;
                    auxlex += c;
                    columnaToken = columna;
                }
                else if (isLetter(c))
                {
                    estado = 2;
                    auxlex += c;
                    columnaToken = columna;
                }
                else if (c.localeCompare('"') == 0)
                {
                    estado = 3;
                    auxlex += c;
                    columnaToken = columna;
                }
                else if (c.localeCompare('{') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    agregarToken("ABRIR LLAVES");
                }
                else if (c.localeCompare('}') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    agregarToken("CERRAR LLAVES");
                }
                else if (c.localeCompare('(') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    agregarToken("ABRIR PARENTESIS");
                }
                else if (c.localeCompare(')') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    agregarToken("CERRAR PARENTESIS");
                }
                else if (c.localeCompare(',') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    agregarToken("COMA");
                }
                else if (c.localeCompare(';') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    agregarToken("PUNTO COMA");
                }
                else if (c.localeCompare(':') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    agregarToken("DOS PUNTOS");
                }
                else if (c.localeCompare('=') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    estado = 4;
                }
                else if (c.localeCompare('[') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    agregarToken("ABRE CORCHETE");
                }
                else if (c.localeCompare(']') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    agregarToken("CERRAR CORCHETE");
                }
                else if (c.localeCompare('.') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    agregarToken("PUNTO");
                }
                else if (c.localeCompare('/') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    estado = 5;
                }
                else if (c.localeCompare('*') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    estado = 6;
                }
                else if (c.localeCompare('<') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    estado = 7;
                }
                else if (c.localeCompare('>') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    estado = 8;
                }
                else if (c.localeCompare('|') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    estado =16;
                }else if(c.localeCompare('&')==0){  
                    auxlex+=c;                  
                    estado =17;
                }
                else if (c.localeCompare('!') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    estado=9;
                }
                else if (c.localeCompare('+') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    estado = 10;
                }
                else if (c.localeCompare('-') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    estado = 11;
                }
                else if (c.localeCompare('\n') == 0)
                {
                    fila ++;
                    columna = 1;
                    columnaToken = columna;
                }
                else if (c.localeCompare('\'') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    estado = 14;
                    caracter = true;
                }
                else if (c.localeCompare(' ') == 0)
                {
                }
                else if (c.localeCompare('\t') == 0)
                {
                }
                else
                {
                    if (c.localeCompare('#') == 0 && i == entrada.length - 1)
                    {
                        console.log("Se ha concluido el análisis léxico con éxito " + auxlex);
                       // agregarErrorLexico(fila, columna, auxlex, "Desconocido");
                    }
                    else
                    {
                        console.log("Error Léxico con " + c);
                        if(auxlex!=""){
                            agregarErrorLexico(fila, columna, auxlex, "Desconocido");
                        }
                        agregarErrorLexico(fila, columna, c, "Desconocido");
                        estado = 0;
                    }
                }
                break;
            case 1:
                if (isDigit(c))
                {
                    estado = 1;
                    auxlex += c;
                }
                else if (c.localeCompare('.')==0)
                {
                    estado = 1;
                    auxlex += c;
                    isDecimal = true;
                }
                else
                {
                    if (isDecimal == true)
                    {
                        agregarToken("NUMERO DECIMAL");
                        isDecimal = false;
                        columna--;
                        i -= 1;
                    }
                    else
                    {
                        agregarToken("NUMERO");
                        columna--;
                        i -= 1;
                    }
                    
                }
                break;
            case 2:
                if (alphanumeric(c) || c.localeCompare('_')==0)
                {
                    estado = 2;
                    auxlex += c;
                }
                else
                {
                    VerificarResevada();
                    columna--;
                    i -= 1;
                    /*agregarErrorLexico(fila, columna, auxlex, "Desconocido");
                    agregarErrorLexico(fila, columna, c.ToString(), "Desconocido");
                    estado = 0;*/
                }
                break;
            case 3:
                if (c.localeCompare('"') == 0)
                {
                    auxlex += c;
                    agregarToken("CADENA");
                }
                else
                {                    
                    if(c.localeCompare('\n')==0){
                        fila++;
                        columna = 1;
                        columnaToken = columna;
                    }
                    estado = 3;
                    auxlex += c;
                }
                break;
            case 4:
                if(c.localeCompare('=') == 0){
                    auxlex += c;
                    agregarToken("IGUAL IGUAL");
                }
                else
                {
                    columna--;
                    i -= 1;
                    agregarToken("IGUAL");
                }
                break;
            case 5:
                if (c.localeCompare('/') == 0)
                {
                    auxlex += c;
                    agregarToken("DOBLE DIAGONAL");
                    estado = 12;
                }
                else if (c.localeCompare('*') == 0)
                {
                    auxlex += c;
                    agregarToken("DIAGONAL ASTERISCO");
                    estado = 13;
                }
                else
                {
                    columna--;
                    i -= 1;
                    agregarToken("DIAGONAL");
                }
                break;
            case 6:
                if (c.localeCompare('/') == 0)
                {
                    auxlex += c;
                    agregarToken("ASTERISCO DIAGONAL");
                }
                else
                {
                    columna--;
                    i -= 1;
                    agregarToken("ASTERISCO");
                }
                break;
            case 7:
                if (c.localeCompare('=') == 0)
                {
                    auxlex += c;
                    agregarToken("MENOR IGUAL");
                }
                else
                {
                    i -= 1;
                    agregarToken("MENOR");
                }
                break;
            case 8:
                if (c.localeCompare('=') == 0)
                {
                    auxlex += c;
                    agregarToken("MAYOR IGUAL");
                }
                else
                {
                    columna--;
                    i -= 1;
                    agregarToken("MAYOR");
                }
                break;
            case 9:
                if (c.localeCompare('=') == 0)
                {
                    auxlex += c;
                    agregarToken("DISTINTO");
                }
                else
                {
                    columna--;
                    i -= 1;
                    agregarToken("NOT");
                }
                break;    
            case 10:
                if (c.localeCompare('+') == 0)
                {
                    auxlex += c;
                    agregarToken("MAS MAS");
                }
                else
                {
                    columna--;
                    i -= 1;
                    agregarToken("MAS");
                }
                break;
            case 11:
                if (c.localeCompare('-') == 0)
                {
                    auxlex += c;
                    agregarToken("MENOS MENOS");
                }
                else
                {
                    columna--;
                    i -= 1;
                    agregarToken("MENOS");
                }
                break;
            case 12:
                if (c.localeCompare('\n') == 0)
                { 
                    auxlex += c;
                    agregarToken("CADENA");
                    fila++;
                    columna = 0;
                    columnaToken = columna;
                }
                else
                {
                    
                    estado = 12;
                    auxlex += c;
                }
                break;
            case 13:
         //        if (c.localeCompare('*') == 0 && postC.localeCompare('/') == 0)
                if (c.localeCompare('*') == 0 && entrada.charAt(i+1).localeCompare('/')==0)
                {
                    agregarToken("CADENA");
                    columna--;
                    i -= 1;
                }
                else
                {
                    if(c.localeCompare('\n')==0){
                        fila++;
                        columna = 1;
                        columnaToken = columna;
                    }
                    estado = 13;
                    auxlex += c;
                }
                break;
            case 14:
                if (caracter == true)
                {
                    auxlex += c;
                    caracter = false;
                    estado = 14;
                }
                else if (c.localeCompare('\'')==0)
                {
                    auxlex += c;
                    agregarToken("CARACTER");
                }
                else
                {
                    auxlex += c;
                    estado=15;
                }
                break;
            case 15:
                if (c.localeCompare('\'')==0)
                {
                    auxlex += c;
                    agregarToken("CADENA HTML");
                }
                else
                {
                    auxlex += c;
                    estado=15;
                }
                break;
            case 16:
                if(c.localeCompare('|')==0){  
                    auxlex+=c;                  
                    agregarToken("OR");
                }else{      
                    console.log("Error Léxico con " + c);
                    agregarErrorLexico(fila, columna, auxlex, "Desconocido");
                    agregarErrorLexico(fila, columna, c, "Desconocido");
                    estado = 0;
                }
                break;
            case 17:
                if(c.localeCompare('&')==0){  
                    auxlex+=c;                  
                    agregarToken("AND");
                }else{      
                    console.log("Error Léxico con " + c);
                    agregarErrorLexico(fila, columna, auxlex, "Desconocido");
                    agregarErrorLexico(fila, columna, c, "Desconocido");
                    estado = 0;
                }
                break;
        }
    }
    return Salida;
}
function agregarToken(tipo)
{
            var token = new Object();
            token.tipo=tipo;
            token.lexema = auxlex;
            token.fila = fila;
            token.columna = columnaToken;
            Salida.push(token);
            auxlex = "";
            estado = 0;
}
function agregarErrorLexico(fila, columna, val, descripcion){
            if (val != "")
            {
                if (val != " ")
                {
                    var error = new Object();
                    error.fila=fila;
                    error.columna=columna;
                    error.valor=val;
                    error.descripcion=descripcion;
                    Errores.push(error);
                    auxlex = "";
                    estado = 0;
                }

            }

}
function VerificarResevada()
        {
            columnaToken=columna-1;
            switch (auxlex)
            {
                case "class":
                    agregarToken("PR CLASS");
                    break;
                case "static":
                    agregarToken("PR STATIC");
                    break;
                case "void":
                    agregarToken("PR VOID");
                    break;
                case "main":
                    agregarToken("PR MAIN");
                    break;
                case "int":
                    agregarToken("PR INT");
                    break;
                case "double":
                    agregarToken("PR DOUBLE");
                    break;
                case "string":
                    agregarToken("PR STRING");
                    break;
                case "bool":
                    agregarToken("PR BOOL");
                    break;
                case "char":
                    agregarToken("PR CHAR");
                    break;
                case "new":
                    agregarToken("PR NEW");
                    break;
                case "Console":
                    agregarToken("PR CONSOLE");
                    break;
                case "if":
                    agregarToken("PR IF");
                    break;
                case "else":
                    agregarToken("PR ELSE");
                    break;
                case "switch":
                    agregarToken("PR SWITCH");
                    break;
                case "case":
                    agregarToken("PR CASE");
                    break;
                case "break":
                    agregarToken("PR BREAK");
                    break;
                case "default":
                    agregarToken("PR DEFAULT");
                    break;
                case "true":
                    agregarToken("PR TRUE");
                    break;
                case "false":
                    agregarToken("PR FALSE");
                    break;
                case "for":
                    agregarToken("PR FOR");
                    break;
                case "while":
                    agregarToken("PR WHILE");
                    break;
                case "WriteLine":
                    agregarToken("PR WRITELINE");
                    break;
                case "Write":
                    agregarToken("PR WRITE");
                    break;
                case "do":
                    agregarToken("PR DO");
                    break;
                case "return":
                    agregarToken("PR RETURN");
                    break;
                case "continue":
                    agregarToken("PR CONTINUE");
                    break;
                default:
                    agregarToken("ID");
                    break;

            }
}
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}
function alphanumeric(inputtxt)
{
    var letterNumber = /^[0-9a-zA-Z]+$/;
    if((inputtxt.match(letterNumber))){
        return true;
    }
    else
    { 
        return false; 
    }
}

function isDigit(inputtxt)
{
    var eg = '^[0-9]+$';
    if((inputtxt.match(eg))){
        return true;
    }
    else
    { 
        return false; 
    }
}