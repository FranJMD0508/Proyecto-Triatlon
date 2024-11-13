// Recuperar los participantes desde sessionStorage
const participantes = JSON.parse(sessionStorage.getItem("participantes")) || [];

// Obtener el contenedor para la lista de participantes
const listaParticipantes = document.getElementById("lista-participantes");

// Función para cambiar el estado de si un participante va a competir o no
function actualizarCompetencia(index) {
    // Cambiar el estado de "compite" (true/false)
    participantes[index].compite = !participantes[index].compite;

    // Guardar el arreglo actualizado en sessionStorage
    sessionStorage.setItem("participantes", JSON.stringify(participantes));

    // Volver a cargar la lista de participantes después de la actualización
    cargarParticipantes();
}

// Función para cargar la lista de participantes
function cargarParticipantes() {
    if (participantes.length > 0) {
        let listaHTML = "<ul>";
        participantes.forEach((participante, index) => {
            // Mostrar el estado actual del participante (si va a competir o no)
            const textoBoton = participante.compite ? "Marcar como No Competidor" : "Marcar como Competidor";

            listaHTML += `
                <li>
                    <strong>Nombre:</strong> ${participante.nombre} <br>
                    <strong>Cédula:</strong> ${participante.cedula} <br>
                    <strong>Edad:</strong> ${participante.edad} <br>
                    <strong>Municipio:</strong> ${participante.municipio} <br><br>
                    <button onclick="actualizarCompetencia(${index})">
                        ${textoBoton}
                    </button>
                </li>
            `;
        });
        listaHTML += "</ul>";
        listaParticipantes.innerHTML = listaHTML;
    } else {
        listaParticipantes.innerHTML = "<p>No hay participantes registrados aún.</p>";
    }
}

// Cargar los participantes cuando se carga la página
cargarParticipantes();
