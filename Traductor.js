"use strict";
var indice;
var preAnalisis_T;
var errorSintactico;
var EnableBreakOrContinue;
var ConsolaErrores = "";
var ConsolaSalida="";
var Tabulaciones =0;
var CurrentLine=1;
var temporalID="";
function BegginTranslating(Salida, textarea, textarea2){
    ConsolaSalida="";
    textarea.value="Realizando traducción..";
    ListaTokens = Salida;
    ListaErrores= new Array();
    indice = 0;
    EnableBreakOrContinue=0;
    preAnalisis_T = ListaTokens[indice];
    errorSintactico = false;
    console.log(ListaTokens);
    Sentencias_T();
    console.log(ListaErrores);
    if(ListaErrores.length>0){
        textarea.value = ImprimirErrores();
    }else{
        textarea.value = ConsolaSalida;
        //Traducir
    }
}
function Sentencias_T(){
    if(preAnalisis_T!=null){
        if(preAnalisis_T.tipo == "PR INT"){
            Parea_T("PR INT");
            temporalID=preAnalisis_T.lexema;
            Parea_T("ID");
            if(preAnalisis_T.tipo == "ABRIR PARENTESIS"){//Declaración de un función
                ConsolaSalida+="def "+temporalID;
                Declaracion_Funcion_T();
            }else{//Declaración de variables
                ConsolaSalida+="var "+temporalID;
                Lista_ID_P_T();
                Declaracion_Asignacion_P_T();
            }
            Sentencias_T();
        }else if(preAnalisis_T.tipo == "PR DOUBLE"){
            Parea_T("PR DOUBLE");
            temporalID=preAnalisis_T.lexema;
            Parea_T("ID");
            if(preAnalisis_T.tipo == "ABRIR PARENTESIS"){//Declaración de un función
                ConsolaSalida+="def "+temporalID;
                Declaracion_Funcion_T();
            }else{//Declaración de variables
                ConsolaSalida+="var "+temporalID;
                Lista_ID_P_T();
                Declaracion_Asignacion_P_T();
            }
            Sentencias_T();
        }else if(preAnalisis_T.tipo == "PR STRING"){
            Parea_T("PR STRING");
            temporalID=preAnalisis_T.lexema;
            Parea_T("ID");
            if(preAnalisis_T.tipo == "ABRIR PARENTESIS"){//Declaración de un función
                ConsolaSalida+="def "+temporalID;
                Declaracion_Funcion_T();
            }else{//Declaración de variables
                ConsolaSalida+="var "+temporalID;
                Lista_ID_P_T();
                Declaracion_Asignacion_P_T();
            }
            Sentencias_T();
        }else if(preAnalisis_T.tipo == "PR BOOL"){
            Parea_T("PR BOOL");
            temporalID=preAnalisis_T.lexema;
            Parea_T("ID");
            if(preAnalisis_T.tipo == "ABRIR PARENTESIS"){//Declaración de un función
                ConsolaSalida+="def "+temporalID;
                Declaracion_Funcion_T();
            }else{//Declaración de variables
                ConsolaSalida+="var "+temporalID;
                Lista_ID_P_T();
                Declaracion_Asignacion_P_T();
            }
            Sentencias_T();
        }else if(preAnalisis_T.tipo == "PR CHAR"){
            Parea_T("PR CHAR");
            temporalID=preAnalisis_T.lexema;
            Parea_T("ID");
            if(preAnalisis_T.tipo == "ABRIR PARENTESIS"){//Declaración de un función
                ConsolaSalida+="def "+temporalID;
                Declaracion_Funcion_T();
            }else{//Declaración de variables
                ConsolaSalida+=addTabs()+"var "+temporalID;
                Lista_ID_P_T();
                Declaracion_Asignacion_P_T();
            }
            Sentencias_T();
        }else if(preAnalisis_T.tipo == "ID"){
            ConsolaSalida+=preAnalisis_T.lexema;
            Parea_T("ID");
            if(preAnalisis_T.tipo == "ABRIR PARENTESIS"){//Llamada a método o función
                ConsolaSalida+="(";
                Llamada_Metodo_T();
            }else if(preAnalisis_T.tipo == "MAS MAS"){
                Operador_INC_DEC_T();
            }else if(preAnalisis_T.tipo == "MENOS MENOS"){
                Operador_INC_DEC_T();    
            }else{
                Asignacion_T();
            }
            Sentencias_T();
        }else if(preAnalisis_T.tipo == "PR VOID"){
            ConsolaSalida+="def "+temporalID;
            Parea_T("PR VOID");
            if(preAnalisis_T.tipo =="PR MAIN"){
                Parea_T("PR MAIN");
            }else{
                Parea_T("ID");
            }
            Parea_T("ABRIR PARENTESIS");
            Parea_T("CERRAR PARENTESIS");
            Parea_T("ABRIR LLAVES");
            Sentencias_T();
            Parea_T("CERRAR LLAVES");
            Sentencias_T();
        }else if(preAnalisis_T.tipo == "PR CLASS"){
                Parea_T("PR CLASS");
                Parea_T("ID");
                Parea_T("ABRIR LLAVES");
                Sentencias_T();
                Parea_T("CERRAR LLAVES");
                Sentencias_T();
        }else if(preAnalisis_T.tipo == "PR CONSOLE"){
            Parea_T("PR CONSOLE");
            Parea_T("PUNTO");
            Parea_T("PR WRITE");
            Parea_T("ABRIR PARENTESIS");
            if(preAnalisis_T.tipo == "CADENA HTML"){
                Parea_T("CADENA HTML");
                Impresion_P_T();
            }else{
                Expresion_T();
            }
            Parea_T("CERRAR PARENTESIS"); 
            Parea_T("PUNTO COMA");
            Sentencias_T();
        }else if(preAnalisis_T.tipo == "DOBLE DIAGONAL"){
            ConsolaSalida+="# ";
            Parea_T("DOBLE DIAGONAL");
            ConsolaSalida+=preAnalisis_T.lexema;
            Parea_T("CADENA");            
            Sentencias_T();
        }else if(preAnalisis_T.tipo == "DIAGONAL ASTERISCO"){
            ConsolaSalida+="''' ";
            Parea_T("DIAGONAL ASTERISCO");
            ConsolaSalida+=preAnalisis_T.lexema;
            Parea_T("CADENA");
            ConsolaSalida+="'''";
            Parea_T("ASTERISCO DIAGONAL");
            Sentencias_T();
        }else if(preAnalisis_T.tipo == "PR IF"){
        Declaracion_If_T();
        Sentencias_T();
        }else if(preAnalisis_T.tipo == "PR SWITCH"){
            Declaracion_Swith_T();
            Sentencias_T();
        }else if(preAnalisis_T.tipo == "PR FOR"){
            Declaracion_For_T();
            Sentencias_T();
        }else if(preAnalisis_T.tipo == "PR WHILE"){
            Declaracion_While_T();
            Sentencias_T();
        }else if(preAnalisis_T.tipo == "PR DO"){
            Declaracion_Do_While_T();
            Sentencias_T();
        }else if(preAnalisis_T.tipo == "PR BREAK"){
            if(EnableBreakOrContinue>0){
                Parea_T("PR BREAK");
                Parea_T("PUNTO COMA");
            }else{
                console.log(">> Error no se esperaba [ break ] en la fila  "+preAnalisis_T.fila);
                errorSintactico = true;
                agregarError_T(preAnalisis_T.tipo,  " no está en ciclo de repetición ",preAnalisis_T.fila, preAnalisis_T.columna);
            }
        }else if(preAnalisis_T.tipo == "PR CONTINUE"){
            if(EnableBreakOrContinue>0){
                Parea_T("PR CONTINUE");
                Parea_T("PUNTO COMA");
            }else{
                console.log(">> Error no se esperaba [ continue ] en la fila  "+preAnalisis_T.fila);
                errorSintactico = true;
                agregarError_T(preAnalisis_T.tipo,  " no está en ciclo de repetición ",preAnalisis_T.fila, preAnalisis_T.columna);
            }
        }else{            
            //Epsilon
         //   ConsolaErrores+="El análisi sintáctico ha finalizado";
        }
    }
}
function Expresion_Relacional_T(){
    Termino_Relacional_T();
    Expresion_Relacional_T_P();
}
function Expresion_Relacional_T_P(){
    if(preAnalisis_T.tipo =="MAS"){
        Parea_T("MAS");
        Termino_Relacional_T();
        Expresion_Relacional_T_P();
    }else if(preAnalisis_T.tipo =="MENOS"){
        Parea_T("MENOS");
        Termino_Relacional_T();
        Expresion_Relacional_T_P();
    }else if(preAnalisis_T.tipo =="ASTERISCO"){
        Parea_T("ASTERISCO");
        Termino_Relacional_T();
        Expresion_Relacional_T_P();
    }else if(preAnalisis_T.tipo =="DIAGONAL"){
        Parea_T("DIAGONAL");
        Termino_Relacional_T();
        Expresion_Relacional_T_P();
    }else{
        //Epsilon
    }
}
function Termino_Relacional_T(){
    Factor_Relacional_T();
    Termino_Relacional_T_P();
}
function Termino_Relacional_T_P(){
    if(preAnalisis_T.tipo == "MENOR"){
        Parea_T("MENOR");
        Factor_Relacional_T();
        Termino_Relacional_T_P();
    }else if(preAnalisis_T.tipo == "MAYOR"){
        Parea_T("MAYOR");
        Factor_Relacional_T();
        Termino_Relacional_T_P();
    }else if(preAnalisis_T.tipo == "MENOR IGUAL"){
        Parea_T("MENOR IGUAL");
        Factor_Relacional_T();
        Termino_Relacional_T_P();
    }else if(preAnalisis_T.tipo == "MAYOR IGUAL"){
        Parea_T("MAYOR IGUAL");
        Factor_Relacional_T();
        Termino_Relacional_T_P();
    }else if(preAnalisis_T.tipo == "IGUAL IGUAL"){
        Parea_T("IGUAL IGUAL");
        Factor_Relacional_T();
        Termino_Relacional_T_P();
    }else if(preAnalisis_T.tipo == "DISTINTO"){
        Parea_T("DISTINTO");
        Factor_Relacional_T();
        Termino_Relacional_T_P();
    }else{
        //Epsilon
    }
}
function Factor_Relacional_T(){
    if(preAnalisis_T.tipo =="ABRIR PARENTESIS"){
        Parea_T("ABRIR PARENTESIS");
        Expresion_Relacional_T();
        Parea_T("CERRAR PARENTESIS");
    }else if(preAnalisis_T.tipo == "NUMERO"){
        Parea_T("NUMERO");
    }else if(preAnalisis_T.tipo == "ID"){
        Parea_T("ID");
        Llamada_Funcion_T();
    }else if(preAnalisis_T.tipo == "CADENA"){
        Parea_T("CADENA");
    }else if(preAnalisis_T.tipo == "PR TRUE"){
        Parea_T("PR TRUE");
    }else if(preAnalisis_T.tipo == "PR FALSE"){
        Parea_T("PR FALSE");
    }else if(preAnalisis_T.tipo == "NUMERO DECIMAL"){
        Parea_T("NUMERO DECIMAL");
    }else{        
        console.log(">> Error sintactico se esperaba [ un factor ] en lugar de [" + preAnalisis_T.tipo + "] en la fila  "+preAnalisis_T.fila  );
        agregarError_T(preAnalisis_T.tipo,  "FACTOR",preAnalisis_T.fila, preAnalisis_T.columna);
        errorSintactico = true;
    }
}
function Declaracion_Do_While_T(){
    Parea_T("PR DO");
    Parea_T("ABRIR LLAVES");
    EnableBreakOrContinue++;
    Sentencias_T();
    Parea_T("CERRAR LLAVES");
    EnableBreakOrContinue--;
    Parea_T("PR WHILE");
    Parea_T("ABRIR PARENTESIS");
    Condicional_If_T();
    Parea_T("CERRAR PARENTESIS");
    Parea_T("PUNTO COMA");
}
function Declaracion_While_T(){
    Parea_T("PR WHILE");
    Parea_T("ABRIR PARENTESIS");
    Condicional_If_T();
    Parea_T("CERRAR PARENTESIS");
    Parea_T("ABRIR LLAVES");
    EnableBreakOrContinue++;
    Sentencias_T();
    Parea_T("CERRAR LLAVES");
    EnableBreakOrContinue--;
}
function Declaracion_For_T(){
    Parea_T("PR FOR");
    Parea_T("ABRIR PARENTESIS");
    Initializaer_For_T();
    Expresion_Relacional_T();
    Parea_T("PUNTO COMA");
    Sentencias_T();
    Parea_T("CERRAR PARENTESIS");
    Parea_T("ABRIR LLAVES");
    EnableBreakOrContinue++;
    Sentencias_T();
    Parea_T("CERRAR LLAVES");
    EnableBreakOrContinue--;
}
function Operador_INC_DEC_T(){
    if(preAnalisis_T.tipo == "MAS MAS"){
        Parea_T("MAS MAS");
        if(preAnalisis_T.tipo != "CERRAR PARENTESIS"){
            Parea_T("PUNTO COMA");
        }else{
            //Epsilon
            //Para que se pueda declarar como aumento nomrel o dentro de un for
        }
    }else if(preAnalisis_T.tipo == "MENOS MENOS"){
        Parea_T("MENOS MENOS");
        if(preAnalisis_T.tipo != "CERRAR PARENTESIS"){
            Parea_T("PUNTO COMA");
        }else{
            //Epsilon
            //Para que se pueda declarar como aumento nomrel o dentro de un for
        }
    }else{
        console.log(">> Error sintactico se esperaba [ ++ o --] en lugar de [" + preAnalisis_T.tipo + "] en la fila  "+preAnalisis_T.fila);
        errorSintactico = true;
        agregarError_T(preAnalisis_T.tipo,  " ++ o -- ",preAnalisis_T.fila, preAnalisis_T.columna);
    }
}
function Declaracion_Swith_T(){
    Parea_T("PR SWITCH");
    Parea_T("ABRIR PARENTESIS");
    Parea_T("ID");
    Parea_T("CERRAR PARENTESIS");
    Parea_T("ABRIR LLAVES");
    EnableBreakOrContinue++;
    Declaracion_Case_T();
    Parea_T("CERRAR LLAVES");
    EnableBreakOrContinue++;
}
function Declaracion_Case_T(){
    Parea_T("PR CASE");
    Expresion_T();
    Parea_T("DOS PUNTOS");
    Sentencias_T();
    Declaracion_Case_T_P();
}
function Declaracion_Case_T_P(){
    if(preAnalisis_T.tipo == "PR CASE"){
        Declaracion_Case_T();
    }else if(preAnalisis_T.tipo == "PR DEFAULT"){
        Parea_T("PR DEFAULT");
        Parea_T("DOS PUNTOS");
        Sentencias_T();
    }else{
        console.log(">> Error sintactico se esperaba [ case o default] en lugar de [" + preAnalisis_T.tipo + "] en la fila  "+preAnalisis_T.fila);
        errorSintactico = true;
        agregarError_T(preAnalisis_T.tipo,  "case o default ",preAnalisis_T.fila, preAnalisis_T.columna);
    }
}
function Declaracion_If_T(){
    Parea_T("PR IF");
    Parea_T("ABRIR PARENTESIS");    
    Condicional_If_T();
    Parea_T("CERRAR PARENTESIS");
    Parea_T("ABRIR LLAVES");
    Sentencias_T();
    Parea_T("CERRAR LLAVES");
    Declaracion_If_P_T();
}
function Declaracion_If_P_T(){
    if(preAnalisis_T.tipo == "PR ELSE"){
        Parea_T("PR ELSE");
        Declaracion_Else_T();
    }else{
        //Epsilon
    }
}
function Declaracion_Else_T(){
    if(preAnalisis_T.tipo == "ABRIR LLAVES"){
        Parea_T("ABRIR LLAVES");
        Sentencias_T();
        Parea_T("CERRAR LLAVES");
    }else if(preAnalisis_T.tipo == "PR IF"){
        Declaracion_If_T();
    }else{
        console.log(">> Error sintactico se esperaba [ { o if ] en lugar de [" + preAnalisis_T.tipo + "] en la fila  "+preAnalisis_T.fila);
        errorSintactico = true;
        agregarError_T(preAnalisis_T.tipo,  "{ o if ",preAnalisis_T.fila, preAnalisis_T.columna);
    }
}
function Condicional_If_T(){
    Operador_Not_T();
    Expresion_Relacional_T();
    Operador_Logico_T();
}
function Operador_Relacional_T(){
    if(preAnalisis_T.tipo == "MENOR"){
        Signo_Operador_Relacional_T();
        Expresion_T();
    }else if(preAnalisis_T.tipo == "MAYOR"){
        Signo_Operador_Relacional_T();
        Expresion_T();
    }else if(preAnalisis_T.tipo == "MENOR IGUAL"){
        Signo_Operador_Relacional_T();
        Expresion_T();
    }else if(preAnalisis_T.tipo == "MAYOR IGUAL"){
        Signo_Operador_Relacional_T();
        Expresion_T();
    }else if(preAnalisis_T.tipo == "IGUAL IGUAL"){
        Signo_Operador_Relacional_T();
        Expresion_T();
    }else if(preAnalisis_T.tipo == "DISTINTO"){
        Signo_Operador_Relacional_T();
        Expresion_T();
    }else{
        //Epsilon
    }
}
function Signo_Operador_Relacional_T(){
    if(preAnalisis_T.tipo == "MENOR"){
        Parea_T("MENOR");
    }else if(preAnalisis_T.tipo == "MAYOR"){
        Parea_T("MAYOR");
    }else if(preAnalisis_T.tipo == "MENOR IGUAL"){
        Parea_T("MENOR IGUAL");
    }else if(preAnalisis_T.tipo == "MAYOR IGUAL"){
        Parea_T("MAYOR IGUAL");
    }else if(preAnalisis_T.tipo == "IGUAL IGUAL"){
        Parea_T("IGUAL IGUAL");
    }else if(preAnalisis_T.tipo == "DISTINTO"){
        Parea_T("DISTINTO");
    }else{
        console.log(">> Error sintactico se esperaba [ operador relacional ] en lugar de [" + preAnalisis_T.tipo + "] en la fila  "+preAnalisis_T.fila);
        errorSintactico = true;
        agregarError_T(preAnalisis_T.tipo,  "operador relacional ",preAnalisis_T.fila, preAnalisis_T.columna);
    }
}
function Operador_Logico_T(){
    if(preAnalisis_T.tipo == "AND"){
        Signo_Operador_Logico_T();
        Condicional_If_T();
    }else if(preAnalisis_T.tipo == "OR"){
        Signo_Operador_Logico_T();
        Condicional_If_T();
    }else{
        //Epsilon
    }
}
function Signo_Operador_Logico_T(){
    if(preAnalisis_T.tipo == "AND"){
        Parea_T("AND");
    }else if(preAnalisis_T.tipo == "OR"){
        Parea_T("OR");
    }else{
        console.log(">> Error sintactico se esperaba [ operador lógico ] en lugar de [" + preAnalisis_T.tipo + "] en la fila  "+preAnalisis_T.fila);
        errorSintactico = true;
        agregarError_T(preAnalisis_T.tipo,  "operador lógico ",preAnalisis_T.fila, preAnalisis_T.columna);
    }
}
function Operador_Not_T(){
    if(preAnalisis_T.tipo == "NOT"){
        Parea_T("NOT");
    }else{
        //Epsilon
    }
}
function Impresion_P_T(){
    if(preAnalisis_T.tipo == "MAS"){
        Parea_T("MAS");
        Parea_T("CADENA HTML");
        Impresion_P_T();
    }else{
        //Epsilon
    }
}
function Llamada_Metodo_T(){
    Parea_T("ABRIR PARENTESIS");
    Argumentos_T();
    ConsolaSalida+=")";
    Parea_T("CERRAR PARENTESIS");
    ConsolaSalida+=";";
    Parea_T("PUNTO COMA");
}
function Declaracion_Asignacion_P_T(){
    if(preAnalisis_T.tipo == "PUNTO COMA"){
        ConsolaSalida+=";";
        Parea_T("PUNTO COMA");
    }else if(preAnalisis_T.tipo == "IGUAL"){
        ConsolaSalida+=" = ";
        Parea_T("IGUAL");
        Expresion_T();
        ConsolaSalida+=";";
        Parea_T("PUNTO COMA");
    }else{
        console.log(">> Error sintactico se esperaba [ = o ; ] en lugar de [" + preAnalisis_T.tipo + "] en la fila  "+preAnalisis_T.fila  );
        errorSintactico = true;
        agregarError_T(preAnalisis_T.tipo,  " = o ; ",preAnalisis_T.fila, preAnalisis_T.columna);
    }
}
function Asignacion_T(){
    if(preAnalisis_T.tipo=="IGUAL"){
        ConsolaSalida+=" = ";
        Parea_T("IGUAL");
        Expresion_T();
        ConsolaSalida+=";";
        Parea_T("PUNTO COMA");
    }else{
        console.log(">> Error sintactico se esperaba [ = ] en lugar de [" + preAnalisis_T.tipo + "] en la fila  "+preAnalisis_T.fila  );
        errorSintactico = true;
        agregarError_T(preAnalisis_T.tipo,  "IGUAL",preAnalisis_T.fila, preAnalisis_T.columna);
    }
}
function Lista_ID_P_T(){
    if(preAnalisis_T.tipo == "COMA"){
        ConsolaSalida+=", ";
        Parea_T("COMA");
        ConsolaSalida+=preAnalisis_T.lexema;
        Parea_T("ID");
        Lista_ID_P_T()
    }else{
        //Epsilon
    }
}
function Declaracion_Funcion_T(){
    ConsolaSalida+=preAnalisis_T.lexema;
    Parea_T("ABRIR PARENTESIS");
    Parametros_T();
    ConsolaSalida+=preAnalisis_T.lexema;
    Parea_T("CERRAR PARENTESIS");
    ConsolaSalida+=":";
    Tabulaciones++;
    Parea_T("ABRIR LLAVES");
    Sentencias_T();
    Parea_T("PR RETURN");
    Condicional_If_T();
    Parea_T("PUNTO COMA");
    Parea_T("CERRAR LLAVES");
    Tabulaciones--;
}
function Expresion_T(){
    Termino_T();
    Expresion_P_T();
}
function Expresion_P_T(){
    if(preAnalisis_T.tipo =="MAS"){
        ConsolaSalida+="+";
        Parea_T("MAS");
        Termino_T();
        Expresion_P_T();
    }else if(preAnalisis_T.tipo =="MENOS"){
        ConsolaSalida+="-";
        Parea_T("MENOS");
        Termino_T();
        Expresion_P_T();
    } else{
        //Epsilon
    }
}
function Termino_T(){
    Factor_T();
    Termino_P_T();
}
function Termino_P_T(){
    if(preAnalisis_T.tipo =="ASTERISCO"){
        ConsolaSalida+="*";
        Parea_T("ASTERISCO");
        Factor_T();
        Termino_P_T();
    }else if(preAnalisis_T.tipo =="DIAGONAL"){
        ConsolaSalida+="/";
        Parea_T("DIAGONAL");
        Factor_T();
        Termino_P_T();
    }else{
        //Epsilon
    }
}
function Factor_T(){
    if(preAnalisis_T.tipo =="ABRIR PARENTESIS"){
        ConsolaSalida+="(";
        Parea_T("ABRIR PARENTESIS");
        Expresion_T();
        ConsolaSalida+=")";
        Parea_T("CERRAR PARENTESIS");
    }else if(preAnalisis_T.tipo == "NUMERO"){
        ConsolaSalida+=preAnalisis_T.lexema;
        Parea_T("NUMERO");
    }else if(preAnalisis_T.tipo == "ID"){
        ConsolaSalida+=preAnalisis_T.lexema;
        Parea_T("ID");
        Llamada_Funcion_T();
    }else if(preAnalisis_T.tipo == "CADENA"){
        ConsolaSalida+=preAnalisis_T.lexema;
        Parea_T("CADENA");
    }else if(preAnalisis_T.tipo == "PR TRUE"){
        ConsolaSalida+="True";
        Parea_T("PR TRUE");
    }else if(preAnalisis_T.tipo == "PR FALSE"){
        ConsolaSalida+="False";
        Parea_T("PR FALSE");
    }else if(preAnalisis_T.tipo == "NUMERO DECIMAL"){
        ConsolaSalida+=preAnalisis_T.lexema;
        Parea_T("NUMERO DECIMAL");
    }else{        
        console.log(">> Error sintactico se esperaba [ un factor ] en lugar de [" + preAnalisis_T.tipo + "] en la fila  "+preAnalisis_T.fila  );
        agregarError_T(preAnalisis_T.tipo,  "FACTOR",preAnalisis_T.fila, preAnalisis_T.columna);
        errorSintactico = true;
    }
}
function Llamada_Funcion_T(){
    if(preAnalisis_T.tipo == "ABRIR PARENTESIS"){
        Parea_T("ABRIR PARENTESIS");
        Argumentos_T();
        Parea_T("CERRAR PARENTESIS");
    }else{
        //Epsilon
    }
}
function Argumentos_T(){
    if(preAnalisis_T.tipo =="ABRIR PARENTESIS"){
        ConsolaSalida+=preAnalisis_T.lexema;
        Expresion_T();
        Argumentos_T_P();
    }else if(preAnalisis_T.tipo == "NUMERO"){
        ConsolaSalida+=preAnalisis_T.lexema;
        Expresion_T();
        Argumentos_T_P();
    }else if(preAnalisis_T.tipo == "ID"){
        ConsolaSalida+=preAnalisis_T.lexema;
        Expresion_T();
        Argumentos_T_P();
    }else if(preAnalisis_T.tipo == "CADENA"){
        ConsolaSalida+=preAnalisis_T.lexema;
        Expresion_T();
        Argumentos_T_P();
    }else if(preAnalisis_T.tipo == "PR TRUE"){
        ConsolaSalida+=preAnalisis_T.lexema;
        Expresion_T();
        Argumentos_T_P();
    }else if(preAnalisis_T.tipo == "PR FALSE"){
        ConsolaSalida+=preAnalisis_T.lexema;
        Expresion_T();
        Argumentos_T_P();
    }else if(preAnalisis_T.tipo == "NUMERO DECIMAL"){
        ConsolaSalida+=preAnalisis_T.lexema;
        Expresion_T();
        Argumentos_T_P();
    }else{
        //epsilon
    }
}
function Argumentos_T_P(){
    if(preAnalisis_T.tipo == "COMA"){
        Parea_T("COMA");
        Argumentos_T();
    }else{
        //Epsilon
    }
}
function Parametros_T(){
    if(preAnalisis_T.tipo != "CERRAR PARENTESIS"){
        Tipo_Dato_T();
        ConsolaSalida+=preAnalisis_T.lexema;
        Parea_T("ID");
        Parametros_P_T();
    }else{
        //Epsilon
    }
}
function Parametros_P_T(){
    if(preAnalisis_T.tipo =="COMA"){
        ConsolaSalida+=preAnalisis_T.lexema;
        Parea_T("COMA");
        Parametros_T();
    }else{
        //Epsilon
    }
}
function Tipo_Dato_T(){
    if(preAnalisis_T.tipo == "PR INT"){
        Parea_T("PR INT");
    }else if(preAnalisis_T.tipo == "PR DOUBLE"){
        Parea_T("PR DOUBLE");
    }else if(preAnalisis_T.tipo == "PR STRING"){
        Parea_T("PR STRING");
    }else if(preAnalisis_T.tipo == "PR BOOL"){
        Parea_T("PR BOOL");
    }else if(preAnalisis_T.tipo == "PR CHAR"){
        Parea_T("PR CHAR");
    }else{        
        console.log(">> Error sintactico se esperaba [ Tipo de Dato ] en lugar de [" + preAnalisis_T.tipo + "] en la fila "+preAnalisis_T.fila );
        agregarError_T(preAnalisis_T.tipo,  "TIPO DE DATO",preAnalisis_T.fila, preAnalisis_T.columna);
        errorSintactico = true;
    }
}
function Initializaer_For_T(){
    if(preAnalisis_T.tipo == "PR INT"){
        Parea_T("PR INT");
        Parea_T("ID");
        Lista_ID_P_T();
        Declaracion_Asignacion_P_T();
    }else if(preAnalisis_T.tipo == "PR DOUBLE"){
        Parea_T("PR DOUBLE");
        Parea_T("ID");
        Lista_ID_P_T();
        Declaracion_Asignacion_P_T();
    }else if(preAnalisis_T.tipo == "PR STRING"){
        Parea_T("PR STRING");
        Parea_T("ID");
        Lista_ID_P_T();
        Declaracion_Asignacion_P_T();
    }else if(preAnalisis_T.tipo == "PR BOOL"){
        Parea_T("PR BOOL");
        Parea_T("ID");
        Lista_ID_P_T();
        Declaracion_Asignacion_P_T();
    }else if(preAnalisis_T.tipo == "PR CHAR"){
        Parea_T("PR CHAR");
        Parea_T("ID");
        Lista_ID_P_T();
        Declaracion_Asignacion_P_T();
    }else if(preAnalisis_T.tipo == "ID"){
        Parea_T("ID");
        if(preAnalisis_T.tipo == "ABRIR PARENTESIS"){//Llamada a método o función
            Llamada_Metodo_T();
        }else if(preAnalisis_T.tipo == "MAS MAS"){
            Operador_INC_DEC_T();
        }else if(preAnalisis_T.tipo == "MENOS MENOS"){
            Operador_INC_DEC_T();    
        }else{
            Asignacion_T();
        }
    }
}
function Parea_T(tipoToken)
{
    if (errorSintactico==true)
    {
      
        if(preAnalisis_T.tipo == tipoToken){
            indice++;
            if(indice==ListaTokens.length-1){
                preAnalisis_T==null;
                ConsolaErrores+="-ERROR- No se puede seguir analizando, corrige los erroers señalados e intenta de nuevo."
            }else{
                preAnalisis_T = ListaTokens[indice];
            } 
            errorSintactico=false; 
        }                                    
    }
    else
    {
        if (indice < ListaTokens.length)//le quité el length -1
        {
            console.log("se compara " + preAnalisis_T.tipo +" con " +  tipoToken);
            if (preAnalisis_T.tipo == tipoToken)
            {
                indice++;
                preAnalisis_T = ListaTokens[indice];
                
                if(indice == ListaTokens.length){
                    preAnalisis_T=null;                    
                }else{
                    if(CurrentLine!=preAnalisis_T.fila){
                        ConsolaSalida+="\n";
                        addTabs();
                        CurrentLine=preAnalisis_T.fila;
                    }
                }
            }
            else
            {
                //Se genera un error sintactico y se agrega a la lista de errores sintacitos
                agregarError_T(preAnalisis_T.tipo,  tipoToken,preAnalisis_T.fila, preAnalisis_T.columna);
                //En la impresión solo falta hacer un método para que cunado mande el tipo PR_ALGO me devuleva el palabra resevada algo   !!!
                console.log(">> Error sintactico se esperaba [" + tipoToken + "] en lugar de [" + preAnalisis_T.tipo +"] en la fila  "+preAnalisis_T.fila  );
                errorSintactico = true;
            }
        }
    }
}
function agregarError_T(obtenido, esperado, fila, columna)
{
            var Error =  new Object();
            Error.obtenido = obtenido;
            Error.esperado = esperado;
            Error.fila = fila;
            Error.columna = columna;
            ListaErrores.push(Error);  
            ConsolaErrores+="Se obtuvo: "+Error.obtenido;
            if(esperado=="No debía de aparecer aquí")
            {
                ConsolaErrores+=" No debía de aparecer aquí";
            }else{                 
                ConsolaErrores+=" -Se buscaba: "+Error.esperado;
            }
            ConsolaErrores+=" -Fila: "+Error.fila;
            ConsolaErrores+=+" -Columna: "+Error.columna;
            ConsolaErrores+="\n\n"; 
            if (indice < ListaTokens.length)
            {
                while(true){
                    if(preAnalisis_T.tipo == "PUNTO COMA" || preAnalisis_T.tipo == "CERRAR LLAVES"){
                        indice++;
                        if(indice>=ListaTokens.length-1){
                            preAnalisis_T==null;
                            ConsolaErrores+="-ERROR- No se puede seguir analizando, corrige los erroers señalados e intenta de nuevo."
                        }else{
                            preAnalisis_T = ListaTokens[indice];                            
                        } 
                        errorSintactico=false;
                        break;
                    }else{
                        indice++;
                        if(indice==ListaTokens.length-1){
                            preAnalisis_T==null;
                            break;
                        }else{
                            preAnalisis_T = ListaTokens[indice];                            
                        } 
                    }
                    
                }
            }      
}
function ImprimirErrores(){
    var text ="";
    var i =0;
   for(let Error of ListaErrores){
       i++;
      text+=i+".Se obtuvo: ";
      text+=Error.obtenido+" -Se buscaba: ";
      text+=Error.esperado+" -Fila: ";
      text+=Error.fila+" -Columna: ";
      text+=Error.columna;
      text+="\n\n";
   }
    return text;
}
function addTabs(traducido){
    var tabs = "";
    for(var i=0;i<Tabulaciones;i++){
        tabs+="\t";
    }
    ConsolaSalida+=tabs;
}