// Evento para el formulario de inscripción
document.getElementById("inscripcionForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma convencional

    // Obtener los valores de los campos
    const nombre = document.getElementById("nombre").value;
    const cedula = document.getElementById("cedula").value;
    const edad = document.getElementById("edad").value;
    const municipio = document.getElementById("municipio").value;

    // Crear un objeto con los datos
    const datosInscripcion = {
        nombre: nombre,
        cedula: cedula,
        edad: edad,
        municipio: municipio
    };

    // Obtener los participantes existentes en sessionStorage
    let participantes = JSON.parse(sessionStorage.getItem("participantes")) || [];

    // Agregar el nuevo participante al arreglo
    participantes.push(datosInscripcion);

    // Guardar el arreglo actualizado en sessionStorage
    sessionStorage.setItem("participantes", JSON.stringify(participantes));
    //Limpia el campo de texto
    document.getElementById("inscripcionForm").reset();
    alert("Participante inscrito con éxito")
});