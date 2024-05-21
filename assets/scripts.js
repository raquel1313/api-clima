//obtener elementos del DOM/HTML
const ciudadInput= document.getElementById('ciudad');

const obtenerPronosticoBtn= document.getElementById("obtenerPronostico");

const pronosticoDiv= document.getElementById("pronostico");

obtenerPronosticoBtn.addEventListener('click',obtenerPronostico);

function obtenerPronostico(){
    const ciudad=ciudadInput.value.trim();

    if(ciudad===''){
        mostrarError("Por favor ingresa una ciudad");
        return
    }
    //pega tu apikey aca abajo
    const apiKey="a2b3b130836df2b29363946fccb90e93";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    //una solicitud HTTP utilizando fetch con la url construida

    fetch(url)
        .then(response => response.json())
        .then(data =>{
            mostrarPronostico(data);
        })
        .catch(error=>{
            mostrarError("Error al obtener el pronóstico, intentalo otra vez")
        });

}

function mostrarPronostico(data){
    const{name,main,weather}= data;
    const temperatura=main.temp;
    const sensacion = main.feels_like;
    const humedad= main.humidity;
    const descripcion = weather[0].description;
    const pronosticoHTML =`
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">${name}</h2>
                <p class="card-text">Temperatura: ${temperatura}</p>
                <p class="card-text">Sensación: ${sensacion}</p>
                <p class="card-text">Porcentaje de humedad: %${humedad}</p>
                <p class="card-text">Descripción: ${descripcion}</p>
            </div>
        </div>
    `;

    //insertar el js dentro de HTML
    pronosticoDiv.innerHTML=pronosticoHTML;
}

function mostrarError(){
    const errorHTML =`
        <div class="alert alert-danger" role="alert">
            ${mensaje}
        </div>
    `;
    pronosticoDiv.innerHTML=errorHTML;

}