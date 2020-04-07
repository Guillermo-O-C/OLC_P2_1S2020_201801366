"use strict";
var Salida;
var Errores;
var estado;
var fila;
var columna;
var columnaToken;
var auxlex;
var caracter;
var isDecimal;
function test(){    
    alert('Hello World! - guapo');
}
function EnviarEntrada(text, textarea, textarea2){
    
   // alert('Hello World!'+text); 
    AnalizadorLexico(text);
    console.log(Salida);
    console.log(Errores);
    if(Errores.length>0){        
        textarea.value = PrintErrores();
    }else{
        textarea.value = PrintTokens();
    }
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
    var text ="Se encontraron los siguientes errores léxicos:\n";
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
    return text;
}
function AnalizadorLexico(entrada){
    Salida = new Array();
    Errores = new Array();
    entrada = entrada + "#";
    fila = 1;
    columna = 0;
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
                    agregarToken("S_ABRIR_LLAVES");
                }
                else if (c.localeCompare('}') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    agregarToken("S_CERRAR_LLAVES");
                }
                else if (c.localeCompare('(') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    agregarToken("S_ABRIR_PARENTESIS");
                }
                else if (c.localeCompare(')') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    agregarToken("S_CERRAR_PARENTESIS");
                }
                else if (c.localeCompare(',') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    agregarToken("S_COMA");
                }
                else if (c.localeCompare(';') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    agregarToken("S_PUNTO_COMA");
                }
                else if (c.localeCompare(':') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    agregarToken("S_DOS_PUNTOS");
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
                    agregarToken("S_ABRE_CORCHETE");
                }
                else if (c.localeCompare(']') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    agregarToken("S_CERRAR_CORCHETE");
                }
                else if (c.localeCompare('.') == 0)
                {
                    auxlex += c;
                    columnaToken = columna;
                    agregarToken("S_PUNTO");
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
                    columna = 0;
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
                        console.log("hemos concluido el análisis con éxito " + auxlex);
                       // agregarError(fila, columna, auxlex, "Desconocido");
                    }
                    else
                    {
                        console.log("Error Léxico con " + c);
                        agregarError(fila, columna, auxlex, "Desconocido");
                        agregarError(fila, columna, c, "Desconocido");
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
                        agregarToken("NUMERO_DECIMAL");
                        isDecimal = false;
                        i -= 1;
                    }
                    else
                    {
                        agregarToken("NUMERO");
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
                    i -= 1;
                    /*agregarError(fila, columna, auxlex, "Desconocido");
                    agregarError(fila, columna, c.ToString(), "Desconocido");
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
                    estado = 3;
                    auxlex += c;
                }
                break;
            case 4:
                if(c.localeCompare('=') == 0){
                    auxlex += c;
                    agregarToken("S_IGUAL_IGUAL");
                }
                else
                {
                    i -= 1;
                    agregarToken("S_IGUAL");
                }
                break;
            case 5:
                if (c.localeCompare('/') == 0)
                {
                    auxlex += c;
                    agregarToken("S_DOBLE_DIAGONAL");
                    estado = 12;
                }
                else if (c.localeCompare('*') == 0)
                {
                    auxlex += c;
                    agregarToken("S_DIAGONAL_ASTERISCO");
                    estado = 13;
                }
                else
                {
                    i -= 1;
                    agregarToken("S_DIAGONAL");
                }
                break;
            case 6:
                if (c.localeCompare('/') == 0)
                {
                    auxlex += c;
                    agregarToken("S_ASTERISCO_DIAGONAL");
                }
                else
                {
                    i -= 1;
                    agregarToken("S_ASTERISCO");
                }
                break;
            case 7:
                if (c.localeCompare('=') == 0)
                {
                    auxlex += c;
                    agregarToken("S_MENOR_IGUAL");
                }
                else
                {
                    i -= 1;
                    agregarToken("S_MENOR");
                }
                break;
            case 8:
                if (c.localeCompare('=') == 0)
                {
                    auxlex += c;
                    agregarToken("S_MAYOR_IGUAL");
                }
                else
                {
                    i -= 1;
                    agregarToken("S_MAYOR");
                }
                break;
            case 9:
                if (c.localeCompare('=') == 0)
                {
                    auxlex += c;
                    agregarToken("S_DISTINTO");
                }
                else
                {
                    i -= 1;
                    agregarToken("S_NOT");
                }
                break;    
            case 10:
                if (c.localeCompare('+') == 0)
                {
                    auxlex += c;
                    agregarToken("S_MAS_MAS");
                }
                else
                {
                    i -= 1;
                    agregarToken("S_MAS");
                }
                break;
            case 11:
                if (c.localeCompare('-') == 0)
                {
                    auxlex += c;
                    agregarToken("S_MENOS_MENOS");
                }
                else
                {
                    i -= 1;
                    agregarToken("S_MENOS");
                }
                break;
            case 12:
                if (c.localeCompare('\n') == 0)
                {
                    auxlex += c;
                    agregarToken("CADENA");
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
                    i -= 1;
                }
                else
                {
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
                    agregarToken("Caracter");
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
                    agregarToken("CADENA");
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
                    agregarToken("S_OR");
                }else{      
                    console.log("Error Léxico con " + c);
                    agregarError(fila, columna, auxlex, "Desconocido");
                    agregarError(fila, columna, c, "Desconocido");
                    estado = 0;
                }
                break;
            case 17:
                if(c.localeCompare('&')==0){  
                    auxlex+=c;                  
                    agregarToken("S_AND");
                }else{      
                    console.log("Error Léxico con " + c);
                    agregarError(fila, columna, auxlex, "Desconocido");
                    agregarError(fila, columna, c, "Desconocido");
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
function agregarError(fila, columna, val, descripcion){
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
            switch (auxlex)
            {
                case "class":
                    agregarToken("PR_CLASS");
                    break;
                case "static":
                    agregarToken("PR_STATIC");
                    break;
                case "void":
                    agregarToken("PR_VOID");
                    break;
                case "Main":
                    agregarToken("PR_MAIN");
                    break;
                case "int":
                    agregarToken("PR_INT");
                    break;
                case "float":
                    agregarToken("PR_FLOAT");
                    break;
                case "string":
                    agregarToken("PR_STRING");
                    break;
                case "bool":
                    agregarToken("PR_BOOL");
                    break;
                case "char":
                    agregarToken("PR_CHAR");
                    break;
                case "new":
                    agregarToken("PR_NEW");
                    break;
                case "Console":
                    agregarToken("PR_CONSOLE");
                    break;
                case "if":
                    agregarToken("PR_IF");
                    break;
                case "else":
                    agregarToken("PR_ELSE");
                    break;
                case "switch":
                    agregarToken("PR_SWITCH");
                    break;
                case "case":
                    agregarToken("PR_CASE");
                    break;
                case "break":
                    agregarToken("PR_BREAK");
                    break;
                case "default":
                    agregarToken("PR_DEFAULT");
                    break;
                case "true":
                    agregarToken("PR_TRUE");
                    break;
                case "false":
                    agregarToken("PR_FALSE");
                    break;
                case "for":
                    agregarToken("PR_FOR");
                    break;
                case "while":
                    agregarToken("PR_WHILE");
                    break;
                case "WriteLine":
                    agregarToken("PR_WRITELINE");
                    break;
                case "Write":
                    agregarToken("PR_WRITE");
                    break;
                case "do":
                    agregarToken("PR_DO");
                    break;
                case "return":
                    agregarToken("PR_RETURN");
                    break;
                case "continue":
                    agregarToken("PR_CONTINUE");
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