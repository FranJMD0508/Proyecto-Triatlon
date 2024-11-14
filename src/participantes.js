document.addEventListener('DOMContentLoaded', function () {
    // Obtener el contenedor donde se mostrarán los participantes
    const listaParticipantesDiv = document.getElementById("lista-participantes");

    // Función para crear y mostrar los participantes
    function mostrarParticipantes() {
        // Obtener los participantes desde sessionStorage
        let participantes = JSON.parse(sessionStorage.getItem("participantes")) || [];

        // Si no hay participantes, mostrar un mensaje
        if (participantes.length === 0) {
            listaParticipantesDiv.innerHTML = "<h1>No hay participantes inscritos.</h1>";
            return;
        }

        // Limpiar la lista antes de agregar nuevos elementos
        listaParticipantesDiv.innerHTML = "";

        // Crear una lista con los participantes
        participantes.forEach((participante, index) => {
            const participanteDiv = document.createElement("div");
            participanteDiv.classList.add("participante");
            participanteDiv.innerHTML = `
                <h2>${participante.nombre}</h2>
                <p>Cédula: ${participante.cedula}</p>
                <p>Edad: ${participante.edad}</p>
                <p>Municipio: ${participante.municipio}</p>
                <button class="btn-competir" data-cedula="${participante.cedula}">
                    ${participante.compite ? 'Asistente' : 'Inasistente'}
                </button>
            `;
            listaParticipantesDiv.appendChild(participanteDiv);

            // Agregar el evento para cambiar el estado de 'compite' al hacer clic en el botón
            const btnCompetir = participanteDiv.querySelector(".btn-competir");
            btnCompetir.textContent = participante.compite ? 'Asistente' : 'Inasistente';
            if (participante.compite) {
                btnCompetir.classList.add('asistente');
            } else {
                btnCompetir.classList.remove('asistente');
            }
            btnCompetir.addEventListener("click", function () {
                // Cambiar el estado de 'compite' basado en el valor actual
                participante.compite = !participante.compite;  // Cambia el valor a lo contrario de lo que es

                // Actualizar el array de participantes en sessionStorage
                participantes[index] = participante;
                sessionStorage.setItem("participantes", JSON.stringify(participantes));

                // Cambiar el texto del botón en tiempo real
                btnCompetir.textContent = participante.compite ? 'Asistente' : 'Inasistente';
                if (participante.compite) {
                    btnCompetir.classList.add('asistente');
                } else {
                    btnCompetir.classList.remove('asistente');
                }
                // Cambiar el estado en el texto de la lista de participantes
                const estadoElemento = participanteDiv.querySelector('.estado'); // Ahora apuntamos al 'p' con clase 'estado'
                estadoElemento.textContent = `Estado: ${participante.compite ? 'Competidor' : 'No Competidor'}`;
            });
        });
        document.getElementById('confirmarCambios').addEventListener("click", function() {
            // Este código recarga la página para reflejar los cambios
            location.reload();
        });
        document.getElementById('detenerSimulacion').addEventListener("click", function() {
            // Este código recarga la página para reflejar los cambios
            location.reload();
        });
    }

    // Llamamos a la función para mostrar los participantes
    mostrarParticipantes();
});
