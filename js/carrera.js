$(document).ready(function(){ /* $(funcion(){ //Método abreviado.Hace lo mismo */

    //Declaración de variables globales
    var cars=[];
    var posicion=[];
    var times=[];
    /* Finalmente no se ha trabajado con las dimensiones de window
    var windowHeight=window.screen.availHeight;//1032
    var windowWidht=window.screen.availWidth;//1920 */
    
    //Cuando carga la página reduce la portada al vertice superior izquierdo en 5 seg.
    window.addEventListener("load", reducePortada);
    
    //Carga la función principal
    start();
    
 


    //Configura la presentación de los botones
    /* $("#iniciar").show(); */
    $("#reiniciar").hide();
    $("#parar").hide();

    /* E V E N T O S */
    // Click 
$("#portada").click(reducePortada);

    
function reducePortada(){
    $("#portada").animate({ left: '0px',
    
    height: '25%',
    width: '25%'}, 5000);
}
    
    
    
    // Botón Iniciar
    $("#iniciar").click(function(){
       
          
        $("#iniciar").hide();
        $("#reiniciar").show();
        $("#parar").show();

        //Establece aleatoriamente los tiempos de llegada  para cada participante
        for (let i=0;i<cars.length;i++){
            let ident=`#${i}`;
            let time=(Math.random(1)+1)*1000;
            $(ident).animate({"left":"1000px"},time);
            //guardamos en un array los tiempos para cada participante
            times[i]=time;
            console.log(time+" erqwre");
        }
        //Para establecer la posición de cada participante...
        //contamos cuantas  veces hay un tiempo mejor que el propio
        //si es 0 es el primero, si hay  1 es el segundo
        let lose=0;
        let posicion=[];
        for (let i=0;i<cars.length;i++){
            lose=0;
            for (let j=0;j<cars.length;j++){
                if (times[j]<times[i])  lose++;
            }
            console.log(lose);
            posicion[i]=lose;
        }


        //Mostrar posiciones
        console.log("Posición es: "+posicion.length);
        generateTable(posicion); //prueba de generar tabla



    }); 

    // Botón Parar
    $( "#parar" ).click(function() {
        $( ".car" ).stop();

        $("#iniciar").show();
        $("#reiniciar").show();
        $("#parar").hide();

    });

    // Botón Reiniciar
    $( "#reiniciar" ).click(function() {
        $( ".car" ).animate({ left: "0px" }, 3000 );

        $("#iniciar").show();
        $("#reiniciar").hide();
        $("#parar").hide();

    });
  



  
    function start(){
        $("#iniciar").show();
        
        carList=updateParticipantes();
        muestraParticipantes(carList);
        
    }
    
    function reStart(){
        alert("Restat pressed");
        $("#iniciar").show();
     /*    $("#reiniciar").hide(); */
        $(".car").animate({"left":"0px"},2000);
    }
    function crearArray(numberElements){
        //Declaramos el array    
        carList=[];
      
        //Inicializamos el array
        for (let i=0; i<numberElements;i++){
            carList[i]=`img/car${i+1}.png`;
        
        }
        return carList;
    }
    
    function updateParticipantes(){
        //Cuando se actualiza el valor se llama a esta función que
        //recupera el nuevo valor y genera un nuevo array 
        //con las imágenes de los coches
        //Devuelve la lista de coches
        participantes =  document.getElementById("participantes");
        numParticipantes = parseInt(participantes.value);
        $("#iniciar").show();
        $("#reiniciar").hide();
        $("#parar").hide();

        return crearArray(numParticipantes);
        
    }
    
    
    function muestraParticipantes(carList){
        const pista=document.getElementById("pista");
        console.log("Dentro de muestraParticipantes " + carList.length);
        pista.innerHTML="";
        for (let i=0;i<carList.length;i++){
            
            pista.innerHTML+=`<img class="car" id="${i}" src=${carList[i]} alt="">`; 
        }
        pista.innerHTML+="</div>"
        console.log(pista.innerHTML);
        
       cars =  document.getElementsByClassName("car");
   
   }
 
      
    $("#iniciar").click(function(){
      /*   start(); */
    });
        
    $("#reiniciar").click(function(){
        reStart();
    });
        
    



//Se dispara cuando se cambia el valor de los participantes
    $("#participantes").change(function(){
    carList=updateParticipantes();
    muestraParticipantes(carList);
    });


    //https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
    function generateTable(posiciones) {
        // creates a <table> element and a <tbody> element
  
        const tbl = document.createElement("table");
        const tblBody = document.createElement("tbody");
              
        tbl.classList.add("row"); //todo
        
        //Creating the headers
        
        const row = document.createElement("tr");
        const header = document.createElement("th");
        const headerText = document.createTextNode("Corredor");
        header.appendChild(headerText);
        row.appendChild(header);
        tblBody.appendChild(row);
        
        
        const headerb = document.createElement("th");
        const headerTextb = document.createTextNode("Posición");
        headerb.appendChild(headerTextb);
        row.appendChild(headerb);
        tblBody.appendChild(row);

        
        

        // creating all cells

        for (let i = 0; i < posiciones.length; i++) {
          // creates a table row
          const row = document.createElement("tr");
          
          
          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          let cell = document.createElement("td");
          let cellText = document.createTextNode(`coche ${i+1}` );
          
          cell.appendChild(cellText);
          row.appendChild(cell);
          
          cell = document.createElement("td");
          cellText = document.createTextNode(`${posiciones[i]+1}º` );
          
          cell.appendChild(cellText);
          row.appendChild(cell);
          
 
          
      
          // add the row to the end of the table body
          tblBody.appendChild(row);
        }
      
        // put the <tbody> in the <table>
        tbl.appendChild(tblBody);
        // appends <table> into <body>
        /* document.body.appendChild(tbl); */
        
    
       //Añadimos al elemento tabla con id="clasificación" los resultados de la carrera
        var elementoTabla= document.getElementById("clasificacion");
        elementoTabla.innerHTML=  tbl.innerHTML;
       
    }



});