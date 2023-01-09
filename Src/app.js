/*Funcion Start */
const contenedorMokepones = document.getElementById('opciones-de-mokepon');
const seleccionarAtaque = document.getElementById('seleccionar-ataque');
const reiniciar = document.getElementById('reiniciar');
const mascotaJugador = document.getElementById('btn-mascota-jugador');
const btnFuego = document.getElementById('btn-fuego');
const btnAgua = document.getElementById('btn-agua');
const btnPlanta = document.getElementById('btn-planta');
const btnReinicio = document.getElementById('btn-reiniciar');

/*Funcion Seleccionar Mascota Jugador */
const spanMascotaJugador = document.getElementById('mascota-jugador');
const seleccionarMascota = document.getElementById('seleccionar-mascota');

/*Funcion Seleccionar Mascota Rival */
const spanMascotaRival = document.getElementById('mascota-rival');

/*Funcion Resultado Pelea */
const spanVidasJugador = document.getElementById('mascota-jugador-vida');
const spanVidasRival = document.getElementById('mascota-rival-vida');

/*Funcion Mensaje de pelea */
const contenedorMensajes = document.getElementById('resultado');
const contenedorAtaqueJugador = document.getElementById('ataque-jugador');
const contenedorAtaqueEnemigo = document.getElementById('ataque-enemigo');

/*Funcion Mensaje Final */
const botonFuego=document.getElementById('btn-fuego');
const botonAgua=document.getElementById('btn-agua');
const botonPlanta=document.getElementById('btn-planta');

const Mokepones = [];
const inputDeMokepones = [];
let opcionDeMokepones='';
let ataqueJugador = '';
let ataqueRival = '';
let resultadoCombate = '';
let vidasMascotaJugador = 3;
let vidasMascotaRival = 3;

const dataAtaques = [
    {
        Id:1,
        BtnId:'btn-fuego',
        Ataque:'Fuego 🔥',
        FuerteContra:'Planta 🌱'
    },
    {
        Id:2,
        BtnId:'btn-agua',
        Ataque:'Agua 💧',
        FuerteContra:'Fuego 🔥'
    },
    {
        Id:3,
        BtnId:'btn-planta',
        Ataque:'Planta 🌱',
        FuerteContra:'Agua 💧'
    }
]

class Mokepon
{
    constructor(nombre, foto, vida){
        this._nombre = nombre
        this._foto = foto
        this._vida = vida
        this.ataques = []
    }

    get nombre(){
        return this._nombre
    }
    set nombre(nombre){
       this._nombre = nombre
    }

    get foto(){
        return this._foto
    }
    set foto(foto){
       this._foto = foto
    }

    get vida(){
        return this._nombre
    }
    set vida(vida){
       this._vida = vida
    }
}

let Ratigueya = new Mokepon('Ratigueya','/Src/assets/mokepons_mokepon_ratigueya_attack.webp',3);
let Hipodoge = new Mokepon('Hipodoge','/Src/assets/mokepons_mokepon_capipepo_attack.webp',3);
let Capipepo = new Mokepon('Capipepo','/Src/assets/mokepons_mokepon_hipodoge_attack.webp',3);

Ratigueya.ataques.push(
    dataAtaques[0],
    dataAtaques[0],
    dataAtaques[0],
    dataAtaques[1],
    dataAtaques[2],
);
Hipodoge.ataques.push(
    dataAtaques[1],
    dataAtaques[1],
    dataAtaques[1],
    dataAtaques[0],
    dataAtaques[2],
);
Capipepo.ataques.push(
    dataAtaques[2],
    dataAtaques[2],
    dataAtaques[2],
    dataAtaques[1],
    dataAtaques[0],
);
Mokepones.push(Hipodoge,Capipepo,Ratigueya);


function start ()
{
    //ocultamos las secciones posteriores de nuestro juego
    reiniciar.style.display = 'none';
    seleccionarAtaque.style.display = 'none';

    //se crean las tarjetas de mascotas seleccionables
    Mokepones.forEach((mokepon)=>{
        contenedorMokepones.innerHTML += `
        <input type="radio" name="mascota" id=${mokepon.nombre}>
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    });
    //una vez creadas y siendo parte del DOM ya podemos asignarlo al arreglo de inputs de Mokepones
    Mokepones.forEach((mokepon)=>{
        inputDeMokepones.push(document.getElementById(mokepon.nombre));
    })
    //Asignamos los Eventos a nuestros elementos seleccionados del DOM
    mascotaJugador.addEventListener('click',seleccionarMascotaJugador)   
    btnFuego.addEventListener('click',()=> setAtaque(1))
    btnAgua.addEventListener('click',()=>setAtaque(2))
    btnPlanta.addEventListener('click',()=>setAtaque(3))  
    btnReinicio.addEventListener('click',reiniciarPelea)
}

function reiniciarPelea(){
    window.location.reload()
}

function seleccionarMascotaJugador()
{
    if(!inputDeMokepones.find(input => input.checked)){
        alert('no has seleccionado una mascota')
        return
    }
    spanMascotaJugador.innerHTML=inputDeMokepones.find(input => input.checked).id;
    seleccionarMascotaRival()

    //Mostramos la seccion de seleccionar Ataque
    seleccionarAtaque.style.display = 'flex'
    seleccionarMascota.style.display = 'none'
}

function seleccionarMascotaRival()
{
    let seleccion = random(1,3)
    switch (seleccion) {
        case 1:
            spanMascotaRival.innerHTML='Hipodoge'
            break
        case 2:
            spanMascotaRival.innerHTML='Capipepo'
            break
        case 3:
            spanMascotaRival.innerHTML='Ratigueya'
            break
    }
}

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function setAtaque(ataque){
    ataqueJugador=dataAtaques.find(c=> c.Id == ataque).Ataque
    setAtaqueRival()
}

function setAtaqueRival(){
    let ataque = random(1,3)
    ataqueRival=dataAtaques.find(c=> c.Id == ataque).Ataque
    resultadoPelea()
}

function resultadoPelea(){
    if(ataqueJugador === ataqueRival){
        resultadoCombate = 'Empate 🤷‍♂️'
    } 
    else {
        let victoria = dataAtaques.find(
            c=> 
            c.Ataque == ataqueJugador &&
            c.FuerteContra == ataqueRival
        )
        if(victoria){
            vidasMascotaRival = vidasMascotaRival < 1 ? 0: vidasMascotaRival - 1
            spanVidasRival.innerHTML = vidasMascotaRival
            resultadoCombate = 'Ganaste 🎉'
        }
        else{
            vidasMascotaJugador = vidasMascotaJugador < 1 ? 0 : vidasMascotaJugador - 1
            spanVidasJugador.innerHTML = vidasMascotaJugador
            resultadoCombate = 'Perdiste 😂'
        }
    }
    crearMensajeDePelea()
    
    if(vidasMascotaJugador<1 || vidasMascotaRival < 1){
        crearMensajeFinal()
        return
    }
}

function crearMensajeDePelea(){
    let nuevoAtaqueJugador = document.createElement('p');
    let nuevoAtaqueEnemigo = document.createElement('p');

    nuevoAtaqueJugador.innerHTML =  ataqueJugador;
    nuevoAtaqueEnemigo.innerHTML =  ataqueRival;

    contenedorMensajes.innerHTML = resultadoCombate;
    contenedorAtaqueJugador.appendChild(nuevoAtaqueJugador);
    contenedorAtaqueEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function crearMensajeFinal(){
    //Deshabilitamos todos los botones
    reiniciar.style.display = 'flex'
    botonFuego.disabled=true
    botonAgua.disabled=true
    botonPlanta.disabled=true
    //Creamos el mensaje final
    let mensajeresultado = ``
    mensajeresultado = vidasMascotaRival < 1 ? "Tu mascota Gano" :"La mascota Rival Gano"
    contenedorMensajes.innerHTML = mensajeresultado;
}

window.addEventListener('load',start)