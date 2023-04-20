$(document).ready(function(){ /* $(funcion(){ //Método abreviado.Hace lo mismo */

    //Declaración de variables globales
    var cars=[];
    var posicion=[];
    var times=[];
    /* Finalmente no se ha trabajado con las dimensiones de window
    var windowHeight=window.screen.availHeight;//1032
    var windowWidht=window.screen.availWidth;//1920 */
    
    
    //Carga la función principal
    start();
       
    /************************************************************************************
     *                                   E V E N T O S
     ************************************************************************************/
    
    //**************  L O A D*************
    //Cuando carga la página reduce la portada al vertice superior izquierdo en 5 seg.
    window.addEventListener("load", reducePortada); //TODO desactivamos mientras escribos código
    
    //**************  C H A N G E *************
    //Se dispara cuando se cambia el valor de los participantes
    $("#participantes").change(function(){
        carList=updateParticipantes();
        muestraParticipantes(carList);
    });
  
 
    
    // ********** B  O  T  O  N  E  S *********************

    // B O T Ó N   I N I C I A R 
    $("#iniciar").click(function(){
        //Actualiza los botones que se han de mostrar
        $("#iniciar").hide();
        $("#reiniciar").show();
        $("#parar").show();

        generaTiemposCorredores();
        
        generaPodio();
        
        //Mostrar posiciones
        crearYMostrarTablaClasificacion();        
    }); 
    


    // B O T Ó N   P A R A R
    $( "#parar" ).click(function() {
        //Detiene las animaciones jQuery animate
        $( ".car" ).stop();
        
        //Actualiza los estados de los botones
        $("#iniciar").show();
        $("#reiniciar").show();
        $("#parar").hide();
    });
    
  
    // B O T Ó N   R E I N I C I A R
    $( "#reiniciar" ).click(function() {
        //Animación animate para retroceder los coches
        $( ".car" ).animate({ left: "0px" }, 3000 );

        //Actualiza el estado de los botones
        $("#iniciar").show();
        $("#reiniciar").hide();
        $("#parar").hide();

    });
  

    $("#portada").click(function(){
       
        let autor=document.getElementById("autor");
        autor.innerHTML='<a target=".new" href="https://www.flickr.com/photos/144594988@N02/38516424674">flickr</a>'; 
    })
    // ****************** F U N C I O N E S ****************** 

    function reducePortada(){
        $("#portada").animate({ left: '0px',  
        height: '25%',
        width: '25%'}, 5000);
    }

    function start(){     
    //Configura la presentación de los botones   
        $("#iniciar").show();
        $("#reiniciar").hide();
        $("#parar").hide();
        
        //Recupera el valor de participantes informado en el select
        carList=updateParticipantes();
        //pasa el valor recuperado para alinear en la línea de salida a los coches
        muestraParticipantes(carList);
    }
    
    function reStart(){
        $("#iniciar").show();
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
    
    function generaTiemposCorredores(){
        //Establece aleatoriamente los tiempos de llegada  para cada participante
        //Los anima a partir del método animate
        for (let i=0;i<cars.length;i++){    //cars[].length variable Global devuelve el número de participantes
            //2 variables locales recogen el id del elemento html y el tiempo de desplazamiento
            let ident=`#${i}`;
            let time=(Math.random(1)+1)*1000;
            $(ident).animate({"left":"1000px"},time);
            
            //guardamos en un array Global los tiempos para cada participante
            times[i]=time;         
        }
    }

    function generaPodio(){    
        //Para establecer la posición de cada participante...
        //contamos cuantas  veces hay un tiempo mejor que el propio
        //si es 0 es el primero, si hay  1 es el segundo, etc
        let lose=0;
        for (let i=0;i<cars.length;i++){
            lose=0;
            for (let j=0;j<cars.length;j++){
                if (times[j]<times[i])  lose++;
            }
            posicion[i]=lose;
        }
    }

    //Coloca los coches en la línea de salida
    function muestraParticipantes(carList){
        //asigna a pista el  div id=pista
        const pista=document.getElementById("pista");
        //inserta el código HTML de img y sus coches
        pista.innerHTML="";
        for (let i=0;i<carList.length;i++){
            pista.innerHTML+=`<img class="car" id="${i}" src=${carList[i]} alt="">`; 
        }
        pista.innerHTML+="</div>"
        
        // Variable global que tiene el array de los coches
        cars =  document.getElementsByClassName("car");
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
    
 

    function crearYMostrarTablaClasificacion() {
        //https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
        
        // creates a <table> element and a <tbody> element
        const tbl = document.createElement("table");
        const tblBody = document.createElement("tbody");
              
        /* tbl.classList.add("row"); //todo */
        
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

        for (let i = 0; i < posicion.length; i++) {
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
          cellText = document.createTextNode(`${posicion[i]+1}º` );
          
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