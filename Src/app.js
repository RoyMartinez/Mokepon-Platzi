let ataqueJugador = ''
let ataqueRival = ''
let resultadoCombate = ''
let vidasMascotaJugador = 3
let vidasMascotaRival = 3

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
    let seleccionarAtaque = document.getElementById('seleccionar-ataque')
    let reiniciar = document.getElementById('reiniciar')
    reiniciar.style.display = 'none';
    seleccionarAtaque.style.display = 'none';

    //Seleccionamos los elementos de nuestro html
    let mascotaJugador = document.getElementById('btn-mascota-jugador')
    let btnFuego = document.getElementById('btn-fuego')
    let btnAgua = document.getElementById('btn-agua')
    let btnPlanta = document.getElementById('btn-planta')
    let btnReinicio = document.getElementById('btn-reiniciar')

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
    let inputhipodoge = document.getElementById('Hipodoge')
    let inputcapipepo = document.getElementById('Capipepo')
    let inputratigueya = document.getElementById('Ratigueya')
    let inputlangostelvis = document.getElementById('Langostelvis')
    let inputtucapalma = document.getElementById('Tucapalma')
    let inputhipydos = document.getElementById('Pydos')
    let spanMascotaJugador = document.getElementById('mascota-jugador')

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
    let seleccionarAtaque = document.getElementById('seleccionar-ataque')
    seleccionarAtaque.style.display = 'flex'
    let seleccionarMascota = document.getElementById('seleccionar-mascota')
    seleccionarMascota.style.display = 'none'
}

function seleccionarMascotaRival()
{
    let seleccion = random(1,6)
    let spanMascotaRival = document.getElementById('mascota-rival')
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
    let spanVidasJugador = document.getElementById('mascota-jugador-vida')
    let spanVidasRival = document.getElementById('mascota-rival-vida')

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
    let contenedorMensajes = document.getElementById('resultado')
    let contenedorAtaqueJugador = document.getElementById('ataque-jugador')
    let contenedorAtaqueEnemigo = document.getElementById('ataque-enemigo')

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
    let reiniciar = document.getElementById('reiniciar')
    reiniciar.style.display = 'flex'
    let botonFuego=document.getElementById('btn-fuego')
    botonFuego.disabled=true
    let botonAgua=document.getElementById('btn-agua')
    botonAgua.disabled=true
    let botonPlanta=document.getElementById('btn-planta')
    botonPlanta.disabled=true
    
    //Creamos el mensaje final
    let mensajeresultado = ``
    mensajeresultado = vidasMascotaRival < 1 ? "Tu mascota Gano" :"La mascota Rival Gano"
    let contenedorMensajes = document.getElementById('resultado')
    contenedorMensajes.innerHTML = mensajeresultado;
}

window.addEventListener('load',start)