"use strict"
var Jsontabs;
var ConsolaJson;
function TraduccionJsonHTML(cadenaHTML, consola3){
    Jsontabs=0;
    var OUTPUT = document.createElement("html");
    OUTPUT.innerHTML = cadenaHTML;
    var hijos =OUTPUT.childNodes;
    console.log(hijos);
    ConsolaJson="\"HTML\"\":{";
    for(var i =0;i <hijos.length;i++){
       Etiquetas(hijos[i].nodeName, hijos[i]);
    }
    ConsolaJson+="\n}";
    consola3.value=ConsolaJson;
}
function Etiquetas(Tag, Father){
    console.log(Father.nodeName); 
    if(Tag =="HEAD"){
        Jsontabs++;
        ConsolaJson+=AddTabulation()+"\"HEAD\":{";
        for(var i =0;i<Father.childNodes.length;i++){
            Etiquetas(Father.childNodes[i].nodeName, Father.childNodes[i]);
        }        
        ConsolaJson+=AddTabulation()+"}";
        Jsontabs--;
    }else if(Tag =="BODY"){
        Jsontabs++;
        ConsolaJson+=AddTabulation()+"\"BODY\":{";
        for(var i =0;i<Father.childNodes.length;i++){
            Etiquetas(Father.childNodes[i].nodeName, Father.childNodes[i]);
        }        
        ConsolaJson+=AddTabulation()+"}";
        Jsontabs--;
    }else if(Tag =="TITLE"){
        Jsontabs++;
        ConsolaJson+=AddTabulation()+"\"TITLE\":{";
        for(var i =0;i<Father.childNodes.length;i++){
            Etiquetas(Father.childNodes[i].nodeName, Father.childNodes[i]);
        }        
        ConsolaJson+=AddTabulation()+"}";
        Jsontabs--;
    }else if(Tag =="DIV"){
        console.log(Father.style);
        Jsontabs++;
        ConsolaJson+=AddTabulation()+"\"DIV\":{";    
        ConsolaJson+=AddTabulation()+"\"STYLE\":\""+Father.style.cssText+"\"";
        for(var i =0;i<Father.childNodes.length;i++){
            Etiquetas(Father.childNodes[i].nodeName, Father.childNodes[i]);
        }        
        ConsolaJson+=AddTabulation()+"}";
        Jsontabs--;
    }else if(Tag =="BR"){
        Jsontabs++;
        ConsolaJson+=AddTabulation()+"\"BR\":\"\"";
       /* ConsolaJson+=AddTabulation()+"\"BR\":{";
        for(var i =0;i<Father.childNodes.length;i++){
            Etiquetas(Father.childNodes[i].nodeName, Father.childNodes[i]);
        }        
        ConsolaJson+=AddTabulation()+"}";*/
        Jsontabs--;
    }else if(Tag =="P"){
        Jsontabs++;
        ConsolaJson+=AddTabulation()+"\"P\":{";
        for(var i =0;i<Father.childNodes.length;i++){
            Etiquetas(Father.childNodes[i].nodeName, Father.childNodes[i]);
        }        
        ConsolaJson+=AddTabulation()+"}";
        Jsontabs--;
    }else if(Tag =="H1"){
        Jsontabs++;
        ConsolaJson+=AddTabulation()+"\"H1\":{";
        for(var i =0;i<Father.childNodes.length;i++){
            Etiquetas(Father.childNodes[i].nodeName, Father.childNodes[i]);
        }        
        ConsolaJson+=AddTabulation()+"}";
        Jsontabs--;
    }else if(Tag =="H2"){
        Jsontabs++;
        ConsolaJson+=AddTabulation()+"\"H2\":{";
        for(var i =0;i<Father.childNodes.length;i++){
            Etiquetas(Father.childNodes[i].nodeName, Father.childNodes[i]);
        }        
        ConsolaJson+=AddTabulation()+"}";
        Jsontabs--;
    }else if(Tag =="H3"){
        Jsontabs++;
        ConsolaJson+=AddTabulation()+"\"H3\":{";
        for(var i =0;i<Father.childNodes.length;i++){
            Etiquetas(Father.childNodes[i].nodeName, Father.childNodes[i]);
        }        
        ConsolaJson+=AddTabulation()+"}";
        Jsontabs--;
    }else if(Tag =="H4"){
        Jsontabs++;
        ConsolaJson+=AddTabulation()+"\"H4\":{";
        for(var i =0;i<Father.childNodes.length;i++){
            Etiquetas(Father.childNodes[i].nodeName, Father.childNodes[i]);
        }        
        ConsolaJson+=AddTabulation()+"}";
        Jsontabs--;
    }else if(Tag =="BUTTON"){
        Jsontabs++;
        ConsolaJson+=AddTabulation()+"\"BUTTON\":{";
        for(var i =0;i<Father.childNodes.length;i++){
            Etiquetas(Father.childNodes[i].nodeName, Father.childNodes[i]);
        }        
        ConsolaJson+=AddTabulation()+"}";
        Jsontabs--;
    }else if(Tag =="LABEL"){
        Jsontabs++;
        ConsolaJson+=AddTabulation()+"\"LABEL\":{";
        for(var i =0;i<Father.childNodes.length;i++){
            Etiquetas(Father.childNodes[i].nodeName, Father.childNodes[i]);
        }        
        ConsolaJson+=AddTabulation()+"}";
        Jsontabs--;
    }else if(Tag =="INPUT"){
        Jsontabs++;
        ConsolaJson+=AddTabulation()+"\"INPUT\":{";
        for(var i =0;i<Father.childNodes.length;i++){
            Etiquetas(Father.childNodes[i].nodeName, Father.childNodes[i]);
        }        
        ConsolaJson+=AddTabulation()+"}";
        Jsontabs--;
    }else if(Tag =="#text"){   
        console.log(Father);
        Jsontabs++;
        ConsolaJson+=AddTabulation()+"\"TEXT\":\""+Father.data+"\"";
        Jsontabs--;
    }
}
function AddTabulation(){
    var text ="\n";
    for(var i =0;i <Jsontabs;i++){
        text+="\t";
    }
    return text;
}