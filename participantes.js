// Recuperar los participantes desde sessionStorage
const participantes = JSON.parse(sessionStorage.getItem("participantes")) || [];

// Obtener el contenedor para la lista de participantes
const listaParticipantes = document.getElementById("lista-participantes");

// Función para actualizar el estado de "va a competir" en sessionStorage
function actualizarCompetencia(index, isCompitiendo) {
    // Actualizar la propiedad "compite" del participante en el arreglo
    participantes[index].compite = isCompitiendo;

    // Guardar el arreglo actualizado en sessionStorage
    sessionStorage.setItem("participantes", JSON.stringify(participantes));
}

// Si hay participantes, los mostramos
if (participantes.length > 0) {
    let listaHTML = "<ul>";
    participantes.forEach((participante, index) => {
        // Verificar si el participante ya tiene la propiedad "compite"
        const vaACompetir = participante.compite ? 'checked' : ''; // Si 'compite' es true, el checkbox estará marcado

        listaHTML += `
            <li>
                <strong>Nombre:</strong> ${participante.nombre} <br>
                <strong>Cédula:</strong> ${participante.cedula} <br>
                <strong>Edad:</strong> ${participante.edad} <br>
                <strong>Municipio:</strong> ${participante.municipio} <br><br>
                <label>
                    <input type="checkbox" ${vaACompetir} onchange="actualizarCompetencia(${index}, this.checked)">
                    ¿Va a competir?
                </label>
            </li>
        `;
    });
    listaHTML += "</ul>";
    listaParticipantes.innerHTML = listaHTML;
} else {
    listaParticipantes.innerHTML = "<p>No hay participantes registrados aún.</p>";
}
