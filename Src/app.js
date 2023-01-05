/*Funcion Start */
const seleccionarAtaque = document.getElementById('seleccionar-ataque');
const reiniciar = document.getElementById('reiniciar');
const mascotaJugador = document.getElementById('btn-mascota-jugador');
const btnFuego = document.getElementById('btn-fuego');
const btnAgua = document.getElementById('btn-agua');
const btnPlanta = document.getElementById('btn-planta');
const btnReinicio = document.getElementById('btn-reiniciar');

/*Funcion Seleccionar Mascota Jugador */
const inputhipodoge = document.getElementById('Hipodoge');
const inputcapipepo = document.getElementById('Capipepo');
const inputratigueya = document.getElementById('Ratigueya');
const inputlangostelvis = document.getElementById('Langostelvis');
const inputtucapalma = document.getElementById('Tucapalma');
const inputhipydos = document.getElementById('Pydos');
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
let ataqueJugador = '';
let ataqueRival = '';
let resultadoCombate = '';
let vidasMascotaJugador = 3;
let vidasMascotaRival = 3;

class Mokepon
{
    constructor(nombre, foto, vida){
        this._nombre = nombre
        this._foto = foto
        this._vida = vida
    }
}

let Hipodoge = new Mokepon('Hipodoge','/Src/assets/mokepons_mokepon_capipepo_attack.webp',3);
let Capipepo = new Mokepon('Capipepo','/Src/assets/mokepons_mokepon_hipodoge_attack.webp',3);
let Ratigueya = new Mokepon('Ratigueya','/Src/assets/mokepons_mokepon_ratigueya_attack.webp',3);

Mokepones.push(Hipodoge,Capipepo,Ratigueya);


const dataAtaques = [
    {
        Id:1,
        Ataque:'Fuego 🔥',
        FuerteContra:'Planta 🌱'
    },
    {
        Id:2,
        Ataque:'Agua 💧',
        FuerteContra:'Fuego 🔥'
    },
    {
        Id:3,
        Ataque:'Planta 🌱',
        FuerteContra:'Agua 💧'
    }
]

function start ()
{
    //ocultamos las secciones posteriores de nuestro juego
    reiniciar.style.display = 'none';
    seleccionarAtaque.style.display = 'none';

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
    if(inputhipodoge.checked){
        spanMascotaJugador.innerHTML='Hipodoge'
    }
    else if(inputcapipepo.checked){
        spanMascotaJugador.innerHTML='Capipepo'
    }
    else if(inputratigueya.checked){
        spanMascotaJugador.innerHTML='Ratigueya'
    }
    else if(inputlangostelvis.checked){
        spanMascotaJugador.innerHTML='Langostelvis'
    }
    else if(inputtucapalma.checked){
        spanMascotaJugador.innerHTML='Tucapalma'
    }
    else if(inputhipydos.checked){
        spanMascotaJugador.innerHTML='Pydos'
    }
    else{
        alert('no has seleccionado una mascota')
        return
    }
    seleccionarMascotaRival()
    //Mostramos la seccion de seleccionar mascota
    seleccionarAtaque.style.display = 'flex'
    seleccionarMascota.style.display = 'none'
}

function seleccionarMascotaRival()
{
    let seleccion = random(1,6)
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
        case 4:
            spanMascotaRival.innerHTML='Langostelvis'
            break
        case 5:
            spanMascotaRival.innerHTML='Tucapalma'
            break
        case 6:
            spanMascotaRival.innerHTML='Pydos'
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