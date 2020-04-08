var ListaTokens;
var ListaErrores = new Array();
var indice;
var preAnalisis;
var errorSintactico;


function SetUp(Salida, textarea){
    ListaTokens = Salida;
    ListaErrores= new Array();
    indice = 0;
    preAnalisis = ListaTokens[indice];
    errorSintactico = false;
    console.log(ListaTokens);
    Start();
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
            }
            Start();
        }else if(preAnalisis.tipo == "PR FLOAT"){
            Parea("PR FLOAT");
            Parea("ID");
            if(preAnalisis.tipo == "ABRIR PARENTESIS"){//Declaración de un función
                Declaracion_Funcion();
            }else{//Declaración de variables
                Lista_ID_P();
            }
            Start();
        }else if(preAnalisis.tipo == "PR STRING"){
            Parea("PR STRING");
            Parea("ID");
            if(preAnalisis.tipo == "ABRIR PARENTESIS"){//Declaración de un función
                Declaracion_Funcion();
            }else{//Declaración de variables
                Lista_ID_P();
            }
            Start();
        }else if(preAnalisis.tipo == "PR BOOL"){
            Parea("PR BOOL");
            Parea("ID");
            if(preAnalisis.tipo == "ABRIR PARENTESIS"){//Declaración de un función
                Declaracion_Funcion();
            }else{//Declaración de variables
                Lista_ID_P();
            }
            Start();
        }else if(preAnalisis.tipo == "PR CHAR"){
            Parea("PR CHAR");
            Parea("ID");
            if(preAnalisis.tipo == "ABRIR PARENTESIS"){//Declaración de un función
                Declaracion_Funcion();
            }else{//Declaración de variables
                Lista_ID_P();
            }
            Start();
        }else if(preAnalisis.tipo == "ID"){
            Parea("ID");
            if(preAnalisis.tipo == "ABRIR PARENTESIS"){//asignación
                Llamada_Metodo();
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
        }else{
            //Epsilon
        }
    }
}
function Llamada_Metodo(){
    Parea("ABRIR PARENTESIS");
    Argumentos();
    Parea("CERRAR PARENTESIS");
    Parea("PUNTO COMA");
}
function Asignacion(){
    if(preAnalisis.tipo=="IGUAL"){
        Parea("IGUAL");
        Expresion();
        Parea("PUNTO COMA");
    }else{
        console.log(">> Error sintactico se esperaba [ = ] en lugar de [" + preAnalisis.tipo + "]");
        errorSintactico = true;
    }
}
function Lista_ID_P(){
    if(preAnalisis.tipo == "COMA"){
        Parea("COMA");
        Parea("ID");
        Lista_ID_P()
    }else if(preAnalisis.tipo=="PUNTO COMA"){
        Parea("PUNTO COMA");
    }else{
        console.log(">> Error sintactico se esperaba [ , o ; ] en lugar de [" + preAnalisis.tipo + "]");
        errorSintactico = true;
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
    Parea("ABRIR LLAVES");
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
        console.log(">> Error sintactico se esperaba [ un factor ] en lugar de [" + preAnalisis.tipo + "]");
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
    Tipo_Dato();
    Parea("ID");
    Parametros_P();
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
    }else if(preAnalisis.tipo == "PR FLOAT"){
        Parea("PR FLOAT");
    }else if(preAnalisis.tipo == "PR STRING"){
        Parea("PR STRING");
    }else if(preAnalisis.tipo == "PR BOOL"){
        Parea("PR BOOL");
    }else if(preAnalisis.tipo == "PR CHAR"){
        Parea("PR CHAR");
    }else{        
        console.log(">> Error sintactico se esperaba [ Tipo de Dato ] en lugar de [" + preAnalisis.tipo + "]");
        errorSintactico = true;
    }
}
function Parea(tipoToken)
{
    if (errorSintactico==true)
    {
        
                        if (indice < ListaTokens.length)
                        {
                            while(preAnalisis.tipo != "PUNTO COMA" )
                            {
                                indice++;
                                preAnalisis = ListaTokens[indice];
                                if (preAnalisis.tipo == "PUNTO COMA")
                                {
                                    errorSintactico = false;
                                }
                            }

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
                agregarError(preAnalisis.tipo,  tipoToken);
                //En la impresión solo falta hacer un método para que cunado mande el tipo PR_ALGO me devuleva el palabra resevada algo   !!!
                console.log(">> Error sintactico se esperaba [" + tipoToken + "] en lugar de [" + preAnalisis.tipo +"]");
                errorSintactico = true;
            }
        }
    }
}
function agregarError(obtenido, esperado)
{
            var Error =  new Object();
            Error.obtenido = obtenido;
            Error.esperado = esperado;
            ListaErrores.push(Error);         
}