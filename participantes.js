document.addEventListener('DOMContentLoaded', function () {
    // Obtener el contenedor donde se mostrarán los participantes
    const listaParticipantesDiv = document.getElementById("lista-participantes");

    // Función para crear y mostrar los participantes
    function mostrarParticipantes() {
        // Obtener los participantes desde sessionStorage
        let participantes = JSON.parse(sessionStorage.getItem("participantes")) || [];

        // Si no hay participantes, mostrar un mensaje
        if (participantes.length === 0) {
            listaParticipantesDiv.innerHTML = "<p>No hay participantes inscritos.</p>";
            return;
        }

        // Limpiar la lista antes de agregar nuevos elementos
        listaParticipantesDiv.innerHTML = "";

        // Crear una lista con los participantes
        participantes.forEach((participante, index) => {
            const participanteDiv = document.createElement("div");
            participanteDiv.classList.add("participante");
            participanteDiv.innerHTML = `
                <h3>${participante.nombre}</h3>
                <p>Cédula: ${participante.cedula}</p>
                <p>Edad: ${participante.edad}</p>
                <p>Municipio: ${participante.municipio}</p>
                <p>Estado: <span id="estado-${index}">${participante.compite ? 'Competidor' : 'No Competidor'}</span></p>
                <button class="btn-competir" data-index="${index}">
                    ${participante.compite ? 'Desmarcar como Competidor' : 'Marcar como Competidor'}
                </button>
            `;
            listaParticipantesDiv.appendChild(participanteDiv);

            // Agregar el evento de "Marcar/Desmarcar como Competidor"
            const btnCompetir = participanteDiv.querySelector(".btn-competir");
            btnCompetir.addEventListener("click", function () {
                // Cambiar el estado de 'compite' según el estado actual
                participantes[index].compite = !participantes[index].compite;

                // Actualizar el array de participantes en sessionStorage
                sessionStorage.setItem("participantes", JSON.stringify(participantes));

                // Cambiar el texto del botón en tiempo real
                btnCompetir.textContent = participantes[index].compite ? 'Desmarcar como Competidor' : 'Marcar como Competidor';

                // Actualizar solo el estado del participante en la interfaz en tiempo real
                document.getElementById(`estado-${index}`).textContent = participantes[index].compite ? 'Competidor' : 'No Competidor';
            });
        });
    }

    // Llamamos a la función para mostrar los participantes
    mostrarParticipantes();
});
