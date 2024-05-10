       //vlidar Session

       let u = sessionStorage.getItem("user");

       if(u == null){
         
          window.location="../index.html"; 
       }else{
       // console.log('login valido');
       }

    window.addEventListener("load", function () {
        let myuser = JSON.parse(localStorage.getItem("usuario"));
        var nombrelog =  document.getElementById('nombre');
        var pass2log = document.getElementById("p2");
        
        if(myuser == null){

            if(nombrelog != null){
                
                if(nombrelog.style.display === "none"){
                    nombrelog.style.display = "block";
                }
                if(pass2log.style.display === "none"){
                    pass2log.style.display = "block"
                } 
            }
               
        }else{
            if(nombrelog != null){
                if(nombrelog.style.display === "block"){
                    nombrelog.style.display = "none";
                }
                if(pass2log.style.display === "block"){
                    pass2log.style.display = "none"
                } 
            }
             
            // let username =  JSON.parse(localStorage.getItem("usuario"));
            //     console.log(username.user);
            //     document.getElementById('user').innerHTML = username.user ?? "";

            getmodel().then((value) =>{
                let username =  JSON.parse(localStorage.getItem("usuario"));
                document.getElementById('user').innerHTML =  username.name ?? "";
                this.document.getElementById('Newitem').style.display = "none";
                const selectype = this.document.getElementById("type");
                const container = this.document.querySelector(".container");
                const typeoption = this.document.getElementById("typeoption");
                const dtags = this.document.getElementById('type-tag');
                const bloque = this.document.getElementById('bloque');
              
    
                let buttons = value.app.mod;
                let tags = value.app.tags;
    
                const head = this.document.createElement('div');
                head.setAttribute("id","head");
    
                container.appendChild(head);
              
      
                let contador = 1;
                let i = 0;
                buttons.forEach(element => {
                    //se crean button
                    var newButton = document.createElement("button");
                    newButton.innerHTML = element;
                    newButton.id = "btn" + element;
                    newButton.style.width = "45%";
                    //newButton.setAttribute("onclick", element);
                    newButton.setAttribute("class","btn btn-dark btn-lg m-1");
                    head.appendChild(newButton);
    
                    // var bloque por button
                    var b = document.createElement("div");
                    b.id = "b-div" + element;
                    b.style.display = "none";
                    //b.style.height = "100vh";
                    bloque.appendChild(b);
    
                   //Se cre option type value
                    var c = document.createElement("option");
                    c.text = element;
                    selectype.options.add(c,contador); 
    
                    
    
                     var x = Object.values(value.app.type)[i];
    
                    var p = document.createElement("div");
                    p.id = "dp" + element;
                    p.style.display = "none";
                    typeoption.appendChild(p);
    
                    //input
                     x.forEach(v => {
    
                            var type = document.createElement("div");
                            type.className = "form-outline mb-4";
                            type.id = "d-" + element;
                           // type.style.display = "none";
                            p.appendChild(type);
        
                            //console.log(value);
                            var input = document.createElement("input");
                            input.className = "form-control form-control-lg";
                            input.id = v;
                            input.placeholder = v;
                            type.appendChild(input);
    
                     });
    
    
                    contador += 1;
                    i += 1;
    
                });
                //se crean button new
                var n = document.createElement("button");
                n.innerHTML = "New";
               // n.style.width = "8%";
                n.setAttribute("onclick", "nuevo()");
                n.setAttribute("class","btn btn-dark btn-lg");
                head.appendChild(n);
    
                //tags
                contador = 1;
                tags.forEach(element => {
                     //Se cre option tag value
                    var t = document.createElement("option");
                    t.text = element;
                    dtags.options.add(t,contador);
                    
                    contador +=1;
                });
    
    
                let selectedOptiontype;
                selectype.addEventListener('change',
                     function(){
                        selectedOptiontype = this.options[selectype.selectedIndex];
                        var div = document.getElementById('dpPaginas');
                        var div2 = document.getElementById('dpUsuarios');
                        
                        if(selectedOptiontype.text == "Paginas"){
                            if(div.style.display === "none"){
                                div.style.display = "block";
                                if(div2.style.display === "block"){
                                    div2.style.display = "none";
                                }
                            }
                            
                        }else if(selectedOptiontype.text == "Usuarios"){
                            if(div2.style.display === "none"){
                                div2.style.display = "block";
                                if(div.style.display === "block"){
                                    div.style.display = "none";
                                }
                            }
                        }
    
                    });
            
                let selectedOptiontags;
                
                dtags.addEventListener("change", function(){
                    selectedOptiontags = this.options[dtags.selectedIndex];
                    //console.log(selectedOption.value + ': ' + selectedOption.text);
                });
                
              
               btnGuardar.addEventListener("click", () => {
    
                try {
                    let name = this.document.getElementById('name').value;
                    let url = this.document.getElementById('url').value;
                    let usuario = this.document.getElementById('usuario').value;
                    let password = this.document.getElementById('contraseña').value;
                    let tagtype = selectedOptiontags.text ?? "";
                
    
                var nuevoreg = {
                    name: name,
                    type: selectedOptiontype.text ?? "",
                    url: url,
                    user: usuario != ""? en_data(usuario) : usuario,
                    pass : password != ""? en_data(password) : password,
                    tags: tagtype
               }
    
               this.localStorage.setItem(name,JSON.stringify(nuevoreg));
               alert('Registro agregado correctamente....');
                } catch (error) {
                    this.alert("ERROR: " + error)
                }
                finally{
                    this.document.getElementById('name').value = "";
                    this.document.getElementById('url').value ="";
                    this.document.getElementById('usuario').value ="";
                    this.document.getElementById('contraseña').value ="";
    
                    //this.document.getElementById('Newitem').style.display = "none";
                    ocultar(1);
                }
                  // creando objeto
    
               });
               
                //Insertando en bloque de paginas
               btnPaginas.addEventListener("click",(event) =>{
                ocultar(1);
                mostrar(2);
                ocultar(3);
                ocultar(4);
               
    
                var bloqP = this.document.getElementById("b-divPaginas");
                var bloqU = this.document.getElementById("b-divUsuarios");
                var nev =  this.document.getElementById('Newitem');
    
            
    
                getStorage()[0].forEach(value => {
                    //console.log(value);
                    var exist = document.getElementById(value.name);
                    if(exist == null){
                        var n = document.createElement("a");
                        n.innerHTML = value.name;
                        n.id = value.name;
                        n.setAttribute("class","pag btn btn-secondary btn-lg m-1 ");
                        bloqP.appendChild(n);
                    }
                    
                })
            
                var butts = document.querySelectorAll('.pag')
                
                for(var i = 0; i < butts.length; i++) {
    
                    // aqui generas el equivalente a onclick
                    butts[i].addEventListener('click', manejadorCallback);
                }
                
                function manejadorCallback(evento) {
                    
                    mostrar(4);
                    mostrar(5);
    
                    let value = JSON.parse(localStorage.getItem(evento.target.id));
                    let responce = document.getElementById("responce");
                    
                    let exist = document.getElementById("myspam");
                    let spamtag = document.getElementById("spamtag");
                    

                    //console.log(value);
                    if(exist == null){
                        //console.log(value.url);
                        
                        var spam = document.createElement("samp");
                        spam.innerHTML = "url: " + value.url + "<br>";
                        spam.id = "myspam";
                        spam.style.color = "black";
    
                        var spam2 = document.createElement("samp");
                        spam2.innerHTML = "tag: " + value.tags;
                        spam2.id = "spamtag";
                        spam2.style.color = "black";
    
    
                        responce.appendChild(spam);
                        responce.appendChild(spam2);
                        
                        
                    }else{
                       // document.getElementById("myspam").value = "";
                        exist.innerHTML = "url: " + value.url + "<br>" ;
                        exist.id = "myspam";
                        exist.style.color = "black";
    
                        spamtag.innerHTML = "tag: " + value.tags;
                        spamtag.id = "spamtag";
                        spamtag.style.color = "black";
                        
                        responce.appendChild(exist);
                        responce.appendChild(spamtag);
                        
                    }
                    
                  
                }
                
      
               });
               //Insertando en bloque de usuarios
               btnUsuarios.addEventListener("click",(event) => {
    
                ocultar(1);
                ocultar(2);
                mostrar(3);
                ocultar(4);
                //mostrar(5);
                
                  var bloqU = this.document.getElementById("b-divUsuarios");
                  var bloqP = this.document.getElementById("b-divPaginas");
                  var nev =  this.document.getElementById('Newitem');
                
                
    
                  getStorage()[1].forEach(value => {
                    //console.log(value);
                    if(username.name != value.name){
                        var exist = this.document.getElementById(value.name);
                        if(exist == null){
                            var n = document.createElement("a");
                            n.innerHTML = value.name;
                            n.id = value.name;
                            n.setAttribute("class","user btn btn-secondary btn-lg m-1");
                            bloqU.appendChild(n);
                        }
                    }
                    
                    
                })
    
                var butts = document.querySelectorAll('.user')
                
                for(var i = 0; i < butts.length; i++) {
    
                    // aqui generas el equivalente a onclick
                    butts[i].addEventListener('click', manejadorCallback);
                }
                function manejadorCallback(evento) {
                    
                    mostrar(4);
                    ocultar(5);
    
                    let value = JSON.parse(localStorage.getItem(evento.target.id));
                    let responce = document.getElementById("responce");
                    
                    let exist = document.getElementById("myspam");
                    let tag = document.getElementById("spamtag");
                    if(tag != null) {tag.innerHTML = "";}
                    
                    if(exist == null){
                       
                        var spam = document.createElement("samp");
                        spam.innerHTML = "usuario: " + de_data(value.user) + "<br>" + "contraseña: " + de_data(value.pass) + " <br>" + "tag: " + value.tags;
                        spam.id = "myspam";
                        spam.style.color = "black";
    
    
                        responce.appendChild(spam);
                        
                    }else{
                        
                        exist.innerHTML = "usuario: " + de_data(value.user) + "<br>" + "contraseña: " + de_data(value.pass) + " <br>" + "tag: " + value.tags;
                        exist.id = "myspam";
                        exist.style.color = "black";
                       // console.log(exist.innerHTML);
                        responce.appendChild(exist);
                       
                        
                    }
                }
    
    
               });
    
               ir.addEventListener("click",() => {
                let spam = document.getElementById("myspam");
                let btnir = document.getElementById('ir');
    
                if(spam.innerHTML != null){
                    btnir.target= "_blank";
                    btnir.href = spam.innerHTML.replace("url: ","").replace("<br>","");
    
                }
               
                
                //console.log(spam.innerHTML);
               });
               copiar.addEventListener("click",() => {
                    var myspam =  document.getElementById("myspam").innerHTML
                    var aux = document.createElement("input");
                    aux.setAttribute("value", myspam.replace("<br>" ," ").replace(" <br>"," "));
                    document.body.appendChild(aux);
                    aux.select();
                    document.execCommand("copy");
                    document.body.removeChild(aux);
               });
              
    
                         
             })
             
        }
        

       
       
         

    });

    
    function Login(){

        let usuario = document.getElementById('Unombre').value;
        let email = document.getElementById('email').value;
        let pass = document.getElementById("password").value;
        let pass2 = document.getElementById("password2").value;
        let user = JSON.parse(localStorage.getItem("usuario"));

        if (user == null){
            if(pass != pass2){
                alert('Las contraseñas deben de ser iguales.');
            }else{
                var nuevoreg = {
                    name: usuario,
                    type: "otro",
                    url: "",
                    user: email,
                    pass : password != ""? en_data(pass) : pass,
                    tags: "otro"
               }
               
                localStorage.setItem("usuario",JSON.stringify(nuevoreg));
                sessionStorage.setItem("user" , email);
                window.location="view/home.html"; 
            }
    
            //console.log("1");
        }else{
            //console.log("2");
            let userr = user.user;
            let passw = de_data(user.pass);
            
            if (email != '' && pass != ''){
                //validar login
                if(email == userr && pass == passw){
                    sessionStorage.setItem("user" , userr);
                    window.location="view/home.html"; 
                }else{
                    alert('el email o el password es incorrecto.')
                }
            }else{
                    alert('Por favor introduzca el email o el password.')
                }
            }
            
        }
        

    function getmodel(){
        return fetch('../data/model.json')
        .then(res => res.json())
        .catch(error => {
            console.error(error);
        });
    }

    function nuevo(){
       mostrar(1); //this.document.getElementById('Newitem').style.display = "block";
       ocultar(3); //this.document.getElementById("b-divUsuarios").style.display = "none";
       ocultar(2); //this.document.getElementById("b-divPaginas").style.display = "none";
       ocultar(4);
    }
    
    function getStorage(){
        let paginas = [];
        let userus = [];
        let data = [paginas,userus]
  
        for(var i = 0; i < localStorage.length; i++){
  
          let clave = localStorage.key(i);
          let data = JSON.parse(localStorage.getItem(clave));
           
              if(data.type == "Paginas"){
                  paginas.push(data);
              }else{
                  userus.push(data);
              }
           // console.log(data);   
         }

         return data;
    }
    // 1: form 2:paginas 3:usuarios 4:responce 5:btnir

     function  mostrar(movimiento){
       let formnuevo = this.document.getElementById('Newitem'); 
       let bloquser = this.document.getElementById("b-divUsuarios"); 
       let bloqpag = this.document.getElementById("b-divPaginas"); 
       let responce = document.getElementById('responce');
       let btnir = document.getElementById('btnir');

       if(movimiento == 1){
            if(formnuevo.style.display === "none" ){
                formnuevo.style.display = "block";
            }
       }else if(movimiento == 2){
            if(bloqpag.style.display === "none" ){
                bloqpag.style.display = "block";
            }
       }
       else if(movimiento == 3){
            if(bloquser.style.display === "none" ){
                bloquser.style.display = "block";
            }
       }
       else if(movimiento == 4){
        if(responce.style.display === "none" ){
            responce.style.display = "block";
        }
      }
      else if(movimiento == 5){
        if(btnir.style.display === "none" ){
            btnir.style.display = "block";
            //console.log("entra");
        }
      }
    }
 
    function  ocultar(movimiento){
       let formnuevo = this.document.getElementById('Newitem'); 
       let bloquser = this.document.getElementById("b-divUsuarios"); 
       let bloqpag = this.document.getElementById("b-divPaginas"); 
       let responce = document.getElementById('responce');
       let btnir = document.getElementById('btnir');
      
       if(movimiento == 1){
            if(formnuevo.style.display === "block" ){
                formnuevo.style.display = "none";
            }
       }else if(movimiento == 2){
            if(bloqpag.style.display === "block" ){
                bloqpag.style.display = "none";
            }
       }
       else if(movimiento == 3){
            if(bloquser.style.display === "block" ){
                bloquser.style.display = "none";
            }
       }
       else if(movimiento == 4){
        if(responce.style.display === "block" ){
            responce.style.display = "none";
        }
         
    }
    else if(movimiento == 5){
        if(btnir.style.display === "block" ){
            btnir.style.display = "none";
        }
    }
}

function en_data(string) {
    string = unescape(encodeURIComponent(string));
    var newString = '',
       char, nextChar, combinedCharCode;
    for (var i = 0; i < string.length; i += 2) {
    char = string.charCodeAt(i);

    if ((i + 1) < string.length) {
        nextChar = string.charCodeAt(i + 1) - 31;
        combinedCharCode = char + "" + nextChar.toLocaleString('en', {
    minimumIntegerDigits: 2
    });
    newString += String.fromCharCode(parseInt(combinedCharCode, 10));

    } else {

        newString += string.charAt(i);
    }
  }

  return newString.split("").reduce((hex,c)=>hex+=c.charCodeAt(0).toString(16).padStart(4,"0"),"");

}
function de_data(string) {

        var newString = '',
        char, codeStr, firstCharCode, lastCharCode;
        string = string.match(/.{1,4}/g).reduce((acc,char)=>acc+String.fromCharCode(parseInt(char, 16)),"");
        for (var i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        if (char > 132) {
        codeStr = char.toString(10);

        firstCharCode = parseInt(codeStr.substring(0, codeStr.length - 2), 10);

        lastCharCode = parseInt(codeStr.substring(codeStr.length - 2, codeStr.length), 10) + 31;

        newString += String.fromCharCode(firstCharCode) + String.fromCharCode(lastCharCode);
        } else {
        newString += string.charAt(i);
        }
        }
        return newString;
}


    



