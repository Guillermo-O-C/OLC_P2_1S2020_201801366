var ListaTokens;
var ListaErrores = new Array();
var indice;
var preAnalisis;
var errorSintactico;
var EnableBreakOrContinue;

function SetUp(Salida, textarea){
    ListaTokens = Salida;
    Consola1 = textarea;
    ListaErrores= new Array();
    indice = 0;
    EnableBreakOrContinue=0;
    preAnalisis = ListaTokens[indice];
    errorSintactico = false;
    console.log(ListaTokens);
    Start();
    console.log(ListaErrores);
    if(ListaErrores.length>0){
        textarea.value = ImprimirErrores();
    }else{
        //Traducir
    }
}
function Start(){
    if(preAnalisis!=null){
        if(preAnalisis.tipo == "PR INT"){
            Parea("PR INT");
            Parea("ID");
            if(preAnalisis.tipo == "ABRIR PARENTESIS"){//Declaración de un función
                Declaracion_Funcion();
            }else{//Declaración de variables
                Lista_ID_P();
                Declaracion_Asignacion_P();
            }
            Start();
        }else if(preAnalisis.tipo == "PR DOUBLE"){
            Parea("PR DOUBLE");
            Parea("ID");
            if(preAnalisis.tipo == "ABRIR PARENTESIS"){//Declaración de un función
                Declaracion_Funcion();
            }else{//Declaración de variables
                Lista_ID_P();
                Declaracion_Asignacion_P();
            }
            Start();
        }else if(preAnalisis.tipo == "PR STRING"){
            Parea("PR STRING");
            Parea("ID");
            if(preAnalisis.tipo == "ABRIR PARENTESIS"){//Declaración de un función
                Declaracion_Funcion();
            }else{//Declaración de variables
                Lista_ID_P();
                Declaracion_Asignacion_P();
            }
            Start();
        }else if(preAnalisis.tipo == "PR BOOL"){
            Parea("PR BOOL");
            Parea("ID");
            if(preAnalisis.tipo == "ABRIR PARENTESIS"){//Declaración de un función
                Declaracion_Funcion();
            }else{//Declaración de variables
                Lista_ID_P();
                Declaracion_Asignacion_P();
            }
            Start();
        }else if(preAnalisis.tipo == "PR CHAR"){
            Parea("PR CHAR");
            Parea("ID");
            if(preAnalisis.tipo == "ABRIR PARENTESIS"){//Declaración de un función
                Declaracion_Funcion();
            }else{//Declaración de variables
                Lista_ID_P();
                Declaracion_Asignacion_P();
            }
            Start();
        }else if(preAnalisis.tipo == "ID"){
            Parea("ID");
            if(preAnalisis.tipo == "ABRIR PARENTESIS"){//asignación
                Llamada_Metodo();
            }else if(preAnalisis.tipo == "MAS MAS"){
                Operador_INC_DEC();
            }else if(preAnalisis.tipo == "MENOS MENOS"){
                Operador_INC_DEC();    
            }else{
                Asignacion();
            }
            Start();
        }else if(preAnalisis.tipo == "PR VOID"){
            Parea("PR VOID");
            Parea("PR MAIN");
            Parea("ABRIR PARENTESIS");
            Parea("CERRAR PARENTESIS");
            Parea("ABRIR LLAVES");
            Sentencias();
            Parea("CERRAR LLAVES");
            Start();
        }else if(preAnalisis.tipo == "PR CONSOLE"){
            Parea("PR CONSOLE");
            Parea("PUNTO");
            Parea("PR WRITE");
            Parea("ABRIR PARENTESIS");
            if(preAnalisis.tipo == "CADENA HTML"){
                Parea("CADENA HTML");
                Impresion_P();
            }else{
                Expresion();
            }
            Parea("CERRAR PARENTESIS"); 
            Parea("PUNTO COMA");
            Start();
        }else if(preAnalisis.tipo == "DOBLE DIAGONAL"){
            Parea("DOBLE DIAGONAL");
            Parea("CADENA");
            Start();
        }else if(preAnalisis.tipo == "DIAGONAL ASTERISCO"){
            Parea("DIAGONAL ASTERISCO");
            Parea("CADENA");
            Parea("ASTERISCO DIAGONAL");
            Start();
        }else{            
            console.log(">> Error sintactico no se esperaba [" + preAnalisis.tipo + "], corresponde a otro ambiente, en la fila  "+preAnalisis.fila  );            
            agregarError(preAnalisis.tipo,  "No debía de aparecer aquí",preAnalisis.fila, preAnalisis.columna);
            errorSintactico = true;
            Start();
        }
    }
}
function Sentencias(){
    if(preAnalisis.tipo == "PR INT"){
        Parea("PR INT");
        Parea("ID");
        Lista_ID_P();
        Declaracion_Asignacion_P();
        Sentencias();
    }else if(preAnalisis.tipo == "PR DOUBLE"){
        Parea("PR DOUBLE");
        Parea("ID");
        Lista_ID_P();
        Declaracion_Asignacion_P();
        Sentencias();
    }else if(preAnalisis.tipo == "PR STRING"){
        Parea("PR STRING");
        Parea("ID");
        Lista_ID_P();
        Declaracion_Asignacion_P();
        Sentencias();
    }else if(preAnalisis.tipo == "PR BOOL"){
        Parea("PR BOOL");
        Parea("ID");
        Lista_ID_P();
        Declaracion_Asignacion_P();
        Sentencias();
    }else if(preAnalisis.tipo == "PR CHAR"){
        Parea("PR CHAR");
        Parea("ID");
        Lista_ID_P();
        Declaracion_Asignacion_P();
        Sentencias();
    }else if(preAnalisis.tipo == "ID"){
        Parea("ID");
        if(preAnalisis.tipo == "ABRIR PARENTESIS"){//Llamada a método o función
            Llamada_Metodo();
        }else if(preAnalisis.tipo == "MAS MAS"){
            Operador_INC_DEC();
        }else if(preAnalisis.tipo == "MENOS MENOS"){
            Operador_INC_DEC();    
        }else{
            Asignacion();
        }
        Sentencias();
    }else if(preAnalisis.tipo == "PR CONSOLE"){
        Parea("PR CONSOLE");
        Parea("PUNTO");
        Parea("PR WRITE");
        Parea("ABRIR PARENTESIS");
        if(preAnalisis.tipo == "CADENA HTML"){
            Parea("CADENA HTML");
            Impresion_P();
        }else{
            Expresion();
        }
        Parea("CERRAR PARENTESIS"); 
        Parea("PUNTO COMA");
        Sentencias();
    }else if(preAnalisis.tipo == "DOBLE DIAGONAL"){
        Parea("DOBLE DIAGONAL");
        Parea("CADENA");
        Sentencias();
    }else if(preAnalisis.tipo == "DIAGONAL ASTERISCO"){
        Parea("DIAGONAL ASTERISCO");
        Parea("CADENA");
        Parea("ASTERISCO DIAGONAL");
        Sentencias();
    }else if(preAnalisis.tipo == "PR IF"){
       Declaracion_If();
       Sentencias();
    }else if(preAnalisis.tipo == "PR SWITCH"){
        Declaracion_Swith();
        Sentencias();
    }else if(preAnalisis.tipo == "PR FOR"){
        Declaracion_For();
        Sentencias();
    }else if(preAnalisis.tipo == "PR WHILE"){
        Declaracion_While();
        Sentencias();
    }else if(preAnalisis.tipo == "PR DO"){
        Declaracion_Do_While();
        Sentencias();
    }else if(preAnalisis.tipo == "PR BREAK"){
        if(EnableBreakOrContinue>0){
            Parea("PR BREAK");
            Parea("PUNTO COMA");
        }else{
            console.log(">> Error no se esperaba [ break ] en la fila  "+preAnalisis.fila);
            errorSintactico = true;
            agregarError(preAnalisis.tipo,  " no está en ciclo de repetición ",preAnalisis.fila, preAnalisis.columna);
        }
    }else if(preAnalisis.tipo == "PR CONTINUE"){
        if(EnableBreakOrContinue>0){
            Parea("PR CONTINUE");
            Parea("PUNTO COMA");
        }else{
            console.log(">> Error no se esperaba [ continue ] en la fila  "+preAnalisis.fila);
            errorSintactico = true;
            agregarError(preAnalisis.tipo,  " no está en ciclo de repetición ",preAnalisis.fila, preAnalisis.columna);
        }
    }else{            
        //Epsilon
    }
}
function Declaracion_Do_While(){
    Parea("PR DO");
    Parea("ABRIR LLAVES");
    EnableBreakOrContinue++;
    Sentencias();
    Parea("CERRAR LLAVES");
    EnableBreakOrContinue--;
    Parea("PR WHILE");
    Parea("ABRIR PARENTESIS");
    Condicional_If();
    Parea("CERRAR PARENTESIS");
    Parea("PUNTO COMA");
}
function Declaracion_While(){
    Parea("PR WHILE");
    Parea("ABRIR PARENTESIS");
    Condicional_If();
    Parea("CERRAR PARENTESIS");
    Parea("ABRIR LLAVES");
    EnableBreakOrContinue++;
    Sentencias();
    Parea("CERRAR LLAVES");
    EnableBreakOrContinue--;
}
function Declaracion_For(){
    Parea("PR FOR");
    Parea("ABRIR PARENTESIS");
    Sentencias();
    Parea("CERRAR PARENTESIS");
    Expresion();
    Signo_Operador_Relacional();
    Expresion();
    Parea("PUNTO COMA");
    Sentencias();
    Parea("ABRIR LLAVES");
    EnableBreakOrContinue++;
    Sentencias();
    Parea("CERRAR LLAVES");
    EnableBreakOrContinue--;
}
function Operador_INC_DEC(){
    if(preAnalisis.tipo == "MAS MAS"){
        Parea("MAS MAS");
        Parea("PUNTO COMA");
    }else if(preAnalisis.tipo == "MENOS MENOS"){
        Parea("MENOS MENOS");
        Parea("PUNTO COMA");
    }else{
        console.log(">> Error sintactico se esperaba [ ++ o --] en lugar de [" + preAnalisis.tipo + "] en la fila  "+preAnalisis.fila);
        errorSintactico = true;
        agregarError(preAnalisis.tipo,  " ++ o -- ",preAnalisis.fila, preAnalisis.columna);
    }
}
function Declaracion_Swith(){
    Parea("PR SWITCH");
    Parea("ABRIR PARENTESIS");
    Parea("ID");
    Parea("CERRAR PARENTESIS");
    Parea("ABRIR LLAVES");
    EnableBreakOrContinue++;
    Declaracion_Case();
    Parea("CERRAR LLAVES");
    EnableBreakOrContinue++;
}
function Declaracion_Case(){
    Parea("PR CASE");
    Expresion();
    Parea("DOS PUNTOS");
    Sentencias();
    Declaracion_Case_P();
}
function Declaracion_Case_P(){
    if(preAnalisis.tipo == "PR CASE"){
        Declaracion_Case();
    }else if(preAnalisis.tipo == "PR DEFAULT"){
        Parea("PR DEFAULT");
        Parea("DOS PUNTOS");
        Sentencias();
    }else{
        console.log(">> Error sintactico se esperaba [ case o default] en lugar de [" + preAnalisis.tipo + "] en la fila  "+preAnalisis.fila);
        errorSintactico = true;
        agregarError(preAnalisis.tipo,  "case o default ",preAnalisis.fila, preAnalisis.columna);
    }
}
function Declaracion_If(){
    Parea("PR IF");
    Parea("ABRIR PARENTESIS");    
    Condicional_If();
    Parea("CERRAR PARENTESIS");
    Parea("ABRIR LLAVES");
    Sentencias();
    Parea("CERRAR LLAVES");
    Declaracion_If_P();
}
function Declaracion_If_P(){
    if(preAnalisis.tipo == "PR ELSE"){
        Parea("PR ELSE");
        Declaracion_Else();
    }else{
        //Epsilon
    }
}
function Declaracion_Else(){
    if(preAnalisis.tipo == "ABRIR LLAVES"){
        Parea("ABRIR LLAVES");
        Sentencias();
        Parea("CERRAR LLAVES");
    }else if(preAnalisis.tipo == "PR IF"){
        Declaracion_If();
    }else{
        console.log(">> Error sintactico se esperaba [ { o if ] en lugar de [" + preAnalisis.tipo + "] en la fila  "+preAnalisis.fila);
        errorSintactico = true;
        agregarError(preAnalisis.tipo,  "{ o if ",preAnalisis.fila, preAnalisis.columna);
    }
}
function Condicional_If(){
    Operador_Not();
    Expresion();
    Operador_Relacional();
    Operador_Logico();
}
function Operador_Relacional(){
    if(preAnalisis.tipo == "MENOR"){
        Signo_Operador_Relacional();
        Expresion();
    }else if(preAnalisis.tipo == "MAYOR"){
        Signo_Operador_Relacional();
        Expresion();
    }else if(preAnalisis.tipo == "MENOR IGUAL"){
        Signo_Operador_Relacional();
        Expresion();
    }else if(preAnalisis.tipo == "MAYOR IGUAL"){
        Signo_Operador_Relacional();
        Expresion();
    }else if(preAnalisis.tipo == "IGUAL IGUAL"){
        Signo_Operador_Relacional();
        Expresion();
    }else if(preAnalisis.tipo == "DISTINTO"){
        Signo_Operador_Relacional();
        Expresion();
    }else{
        //Epsilon
    }
}
function Signo_Operador_Relacional(){
    if(preAnalisis.tipo == "MENOR"){
        Parea("MENOR");
    }else if(preAnalisis.tipo == "MAYOR"){
        Parea("MAYOR");
    }else if(preAnalisis.tipo == "MENOR IGUAL"){
        Parea("MENOR IGUAL");
    }else if(preAnalisis.tipo == "MAYOR IGUAL"){
        Parea("MAYOR IGUAL");
    }else if(preAnalisis.tipo == "IGUAL IGUAL"){
        Parea("IGUAL IGUAL");
    }else if(preAnalisis.tipo == "DISTINTO"){
        Parea("DISTINTO");
    }else{
        console.log(">> Error sintactico se esperaba [ operador relacional ] en lugar de [" + preAnalisis.tipo + "] en la fila  "+preAnalisis.fila);
        errorSintactico = true;
        agregarError(preAnalisis.tipo,  "operador relacional ",preAnalisis.fila, preAnalisis.columna);
    }
}
function Operador_Logico(){
    if(preAnalisis.tipo == "AND"){
        Signo_Operador_Logico();
        Condicional_If();
    }else if(preAnalisis.tipo == "OR"){
        Signo_Operador_Logico();
        Condicional_If();
    }else{
        //Epsilon
    }
}
function Signo_Operador_Logico(){
    if(preAnalisis.tipo == "AND"){
        Parea("AND");
    }else if(preAnalisis.tipo == "OR"){
        Parea("OR");
    }else{
        console.log(">> Error sintactico se esperaba [ operador lógico ] en lugar de [" + preAnalisis.tipo + "] en la fila  "+preAnalisis.fila);
        errorSintactico = true;
        agregarError(preAnalisis.tipo,  "operador lógico ",preAnalisis.fila, preAnalisis.columna);
    }
}
function Operador_Not(){
    if(preAnalisis.tipo == "NOT"){
        Parea("NOT");
    }else{
        //Epsilon
    }
}
function Impresion_P(){
    if(preAnalisis.tipo == "MAS"){
        Parea("MAS");
        Parea("CADENA HTML");
        Impresion_P();
    }else{
        //Epsilon
    }
}
function Llamada_Metodo(){
    Parea("ABRIR PARENTESIS");
    Argumentos();
    Parea("CERRAR PARENTESIS");
    Parea("PUNTO COMA");
}
function Declaracion_Asignacion_P(){
    if(preAnalisis.tipo == "PUNTO COMA"){
        Parea("PUNTO COMA");
    }else if(preAnalisis.tipo == "IGUAL"){
        Parea("IGUAL");
        Expresion();
        Parea("PUNTO COMA");
    }else{
        console.log(">> Error sintactico se esperaba [ = o ; ] en lugar de [" + preAnalisis.tipo + "] en la fila  "+preAnalisis.fila  );
        errorSintactico = true;
        agregarError(preAnalisis.tipo,  " = o ; ",preAnalisis.fila, preAnalisis.columna);
    }
}
function Asignacion(){
    if(preAnalisis.tipo=="IGUAL"){
        Parea("IGUAL");
        Expresion();
        Parea("PUNTO COMA");
    }else{
        console.log(">> Error sintactico se esperaba [ = ] en lugar de [" + preAnalisis.tipo + "] en la fila  "+preAnalisis.fila  );
        errorSintactico = true;
        agregarError(preAnalisis.tipo,  "IGUAL",preAnalisis.fila, preAnalisis.columna);
    }
}
function Lista_ID_P(){
    if(preAnalisis.tipo == "COMA"){
        Parea("COMA");
        Parea("ID");
        Lista_ID_P()
    }else{
        //Epsilon
    }
}
function Declaracion_Funcion(){
    Parea("ABRIR PARENTESIS");
    Parametros();
    Parea("CERRAR PARENTESIS");
    Parea("ABRIR LLAVES");
    Sentencias();
    Parea("PR RETURN");
    Expresion();
    Parea("PUNTO COMA");
    Parea("CERRAR LLAVES");
}
function ACCIONES_CLASE(){

}
function Expresion(){
    Termino();
    Expresion_P();
}
function Expresion_P(){
    if(preAnalisis.tipo =="MAS"){
        Parea("MAS");
        Termino();
        Expresion_P();
    }else if(preAnalisis.tipo =="MENOS"){
        Parea("MENOS");
        Termino();
        Expresion_P();
    } else{
        //Epsilon
    }
}
function Termino(){
    Factor();
    Termino_P();
}
function Termino_P(){
    if(preAnalisis.tipo =="ASTERISCO"){
        Parea("ASTERISCO");
        Factor();
        Termino_P();
    }else if(preAnalisis.tipo =="DIAGONAL"){
        Parea("DIAGONAL");
        Factor();
        Termino_P();
    }else{
        //Epsilon
    }
}
function Factor(){
    if(preAnalisis.tipo =="ABRIR PARENTESIS"){
        Parea("ABRIR PARENTESIS");
        Expresion();
        Parea("CERRAR PARENTESIS");
    }else if(preAnalisis.tipo == "NUMERO"){
        Parea("NUMERO");
    }else if(preAnalisis.tipo == "ID"){
        Parea("ID");
        Llamada_Funcion();
    }else if(preAnalisis.tipo == "CADENA"){
        Parea("CADENA");
    }else if(preAnalisis.tipo == "PR TRUE"){
        Parea("PR TRUE");
    }else if(preAnalisis.tipo == "PR FALSE"){
        Parea("PR FALSE");
    }else if(preAnalisis.tipo == "NUMERO DECIMAL"){
        Parea("NUMERO DECIMAL");
    }else{        
        console.log(">> Error sintactico se esperaba [ un factor ] en lugar de [" + preAnalisis.tipo + "] en la fila  "+preAnalisis.fila  );
        agregarError(preAnalisis.tipo,  "FACTOR",preAnalisis.fila, preAnalisis.columna);
        errorSintactico = true;
    }
}
function Llamada_Funcion(){
    if(preAnalisis.tipo == "ABRIR PARENTESIS"){
        Parea("ABRIR PARENTESIS");
        Argumentos();
        Parea("CERRAR PARENTESIS");
    }else{
        //Epsilon
    }
}
function Argumentos(){
    if(preAnalisis.tipo =="ABRIR PARENTESIS"){
        Expresion();
        Argumentos_P();
    }else if(preAnalisis.tipo == "NUMERO"){
        Expresion();
        Argumentos_P();
    }else if(preAnalisis.tipo == "ID"){
        Expresion();
        Argumentos_P();
    }else if(preAnalisis.tipo == "CADENA"){
        Expresion();
        Argumentos_P();
    }else if(preAnalisis.tipo == "PR TRUE"){
        Expresion();
        Argumentos_P();
    }else if(preAnalisis.tipo == "PR FALSE"){
        Expresion();
        Argumentos_P();
    }else if(preAnalisis.tipo == "NUMERO DECIMAL"){
        Expresion();
        Argumentos_P();
    }else{
        //epsilon
    }
}
function Argumentos_P(){
    if(preAnalisis.tipo == "COMA"){
        Parea("COMA");
        Argumentos();
    }else{
        //Epsilon
    }
}
function Parametros(){
    if(preAnalisis.tipo != "CERRAR PARENTESIS"){
        Tipo_Dato();
        Parea("ID");
        Parametros_P();
    }else{
        //Epsilon
    }
}
function Parametros_P(){
    if(preAnalisis.tipo =="COMA"){
        Parea("COMA");
        Parametros();
    }else{
        //Epsilon
    }
}
function Tipo_Dato(){
    if(preAnalisis.tipo == "PR INT"){
        Parea("PR INT");
    }else if(preAnalisis.tipo == "PR DOUBLE"){
        Parea("PR DOUBLE");
    }else if(preAnalisis.tipo == "PR STRING"){
        Parea("PR STRING");
    }else if(preAnalisis.tipo == "PR BOOL"){
        Parea("PR BOOL");
    }else if(preAnalisis.tipo == "PR CHAR"){
        Parea("PR CHAR");
    }else{        
        console.log(">> Error sintactico se esperaba [ Tipo de Dato ] en lugar de [" + preAnalisis.tipo + "] en la fila "+preAnalisis.fila );
        agregarError(preAnalisis.tipo,  "TIPO DE DATO",preAnalisis.fila, preAnalisis.columna);
        errorSintactico = true;
    }
}
function Parea(tipoToken)
{
    if (errorSintactico==true)
    {
      
        if(preAnalisis.tipo == tipoToken){
            indice++;
            if(indice==ListaTokens.length-1){
                preAnalisis==null;
            }else{
                preAnalisis = ListaTokens[indice];
            } 
            errorSintactico=false; 
        }                                    
    }
    else
    {
        if (indice < ListaTokens.length)//le quité el length -1
        {
            console.log("se compara " + preAnalisis.tipo +" con " +  tipoToken);
            if (preAnalisis.tipo == tipoToken)
            {
                indice++;
                preAnalisis = ListaTokens[indice];
                if(indice == ListaTokens.length){
                    preAnalisis=null;                    
                }
            }
            else
            {
                //Se genera un error sintactico y se agrega a la lista de errores sintacitos
                agregarError(preAnalisis.tipo,  tipoToken,preAnalisis.fila, preAnalisis.columna);
                //En la impresión solo falta hacer un método para que cunado mande el tipo PR_ALGO me devuleva el palabra resevada algo   !!!
                console.log(">> Error sintactico se esperaba [" + tipoToken + "] en lugar de [" + preAnalisis.tipo +"] en la fila  "+preAnalisis.fila  );
                errorSintactico = true;
            }
        }
    }
}
function agregarError(obtenido, esperado, fila, columna)
{
            var Error =  new Object();
            Error.obtenido = obtenido;
            Error.esperado = esperado;
            Error.fila = fila;
            Error.columna = columna;
            ListaErrores.push(Error);   
            if (indice < ListaTokens.length)
            {
                while(true){
                    if(preAnalisis.tipo == "PUNTO COMA" || preAnalisis.tipo == "CERRAR LLAVES"){
                        indice++;
                        if(indice==ListaTokens.length-1){
                            preAnalisis==null;
                        }else{
                            preAnalisis = ListaTokens[indice];                            
                        } 
                        errorSintactico=false;
                        break;
                    }else{
                        indice++;
                        if(indice==ListaTokens.length-1){
                            preAnalisis==null;
                            break;
                        }else{
                            preAnalisis = ListaTokens[indice];                            
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