// Evento para el formulario de inscripción
document.getElementById("inscripcionForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma convencional
    
    // Obtener los valores de los campos
    const nombre = document.getElementById("nombre").value;
    const cedula = document.getElementById("cedula").value;
    const edad = document.getElementById("edad").value;
    const municipio = document.getElementById("municipio").value;

    // Validar el nombre (mínimo 3 caracteres, solo letras)
    const nombreRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/; // Permite letras, tildes, ñ y espacios
    if (nombre.length < 3 || !nombreRegex.test(nombre)) {
        alert("El nombre debe tener al menos 3 caracteres y solo debe contener letras.");
        return; // Detener el proceso si la validación falla
    }

    // Validar cédula (solo números y máximo 8 dígitos)
    const cedulaRegex = /^\d{1,8}$/;  // Permite solo números y máximo 8 caracteres
    if (!cedulaRegex.test(cedula)) {
        alert("La cédula debe contener solo números y no puede tener más de 8 dígitos.");
        return;
    }

    // Verificar si la cédula ya está registrada
    let participantes = JSON.parse(sessionStorage.getItem("participantes")) || [];
    const existeCedula = participantes.some(participante => participante.cedula === cedula);
    if (existeCedula) {
        alert("La cédula ya está registrada. Por favor ingresa una cédula diferente.");
        return;
    }

    // Validar edad (mayor que 0 y menor que 123)
    if (isNaN(edad) || edad <= 0 || edad >= 123) {
        alert("La edad debe ser un número mayor que 0 y menor que 123.");
        return;
    }

    // Validar municipio (no puede estar vacío)
    if (!municipio.trim()) {
        alert("El municipio no puede estar vacío.");
        return;
    }

    // Crear un objeto con los datos
    const datosInscripcion = {
        nombre: nombre,
        cedula: cedula,
        edad: edad,
        municipio: municipio
    };

    // Agregar el nuevo participante al arreglo
    participantes.push(datosInscripcion);

    // Guardar el arreglo actualizado en sessionStorage
    sessionStorage.setItem("participantes", JSON.stringify(participantes));

    // Limpiar el formulario
    document.getElementById("inscripcionForm").reset();

    // Mostrar mensaje de éxito
    alert("Participante inscrito con éxito");
});

// Evento para bloquear caracteres especiales en el campo "nombre"
document.getElementById("nombre").addEventListener("input", function(event) {
    const input = event.target;
    const value = input.value;

    // Bloquear cualquier carácter especial (excepto letras y espacios)
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]*$/;
    if (!regex.test(value)) {
        input.value = value.replace(/[^A-Za-záéíóúÁÉÍÓÚñÑ\s]/g, ""); // Reemplaza caracteres especiales
    }
});

// Evento para bloquear caracteres no numéricos en el campo "cedula"
document.getElementById("cedula").addEventListener("input", function(event) {
    const input = event.target;
    const value = input.value;

    // Bloquear cualquier carácter que no sea un número (y limitar a 8 caracteres)
    input.value = value.replace(/[^0-9]/g, "").slice(0, 8); // Solo permite números y máximo 8 caracteres
});
