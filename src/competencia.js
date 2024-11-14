class Participante {
    constructor(nombre, cedula, edad, municipio, compite = false) {
        this.nombre = nombre;
        this.cedula = cedula;
        this.edad = edad;
        this.municipio = municipio;
        this.posicion = 0;
        this.descalificado = false;
        this.tiempoTotal = 0; // Tiempo total acumulado
        this.disciplina = "N/A";
        this.horaLlegada = null;
        this.compite = compite; // Si compite es true, este participante es un competidor activo
        // Tiempos de cada disciplina
        this.tiempoCaminata = 0;
        this.tiempoNatacion = 0;
        this.tiempoCiclismo = 0;

        // Hora de inicio de cada disciplina
        this.horaInicioCaminata = null;
        this.horaInicioNatacion = null;
        this.horaInicioCiclismo = null;
    }

    // Función para generar un número aleatorio entre un rango
    ran(min, maximo) {
        return Math.random() * (maximo - min) + min;
    }

    // Avanzar el participante en la competencia
    avanzar(velocidadMax) {
        const tiempoCaminata = this.ran(1, 5.2) + 600;  // Tiempo de caminata
        const tiempoNatacion = this.ran(1, 3.3) + 400;  // Tiempo de natación
        const tiempoCiclismo = this.ran(0.5, 1.3) + 600;  // Tiempo de ciclismo

        if (this.posicion < 50 && !this.descalificado) {
            const distancia = this.ran(0, velocidadMax) + (velocidadMax / 10000) + 0.95;
            if (distancia < 1) {
                this.descalificado = true;
            } else {
                this.posicion += distancia / 4;

                if (this.posicion < 10) {
                    this.avanzarDisciplina("Caminata", tiempoCaminata);
                } else if (this.posicion < 20) {
                    this.avanzarDisciplina("Natación", tiempoNatacion);
                } else if (this.posicion < 50) {
                    this.avanzarDisciplina("Ciclismo", tiempoCiclismo);
                }

                if (this.posicion >= 50) {
                    this.posicion = 50;
                    this.disciplina = "Finalizado";
                    this.registrarLlegada();
                }
            }
        }
    }

    // Avanzar en una disciplina (y acumular el tiempo)
    avanzarDisciplina(disciplina, tiempoAvance) {
        this.disciplina = disciplina;

        // Se registra la hora de inicio de la disciplina
        if (disciplina === "Caminata" && this.horaInicioCaminata === null) {
            this.horaInicioCaminata = this.obtenerHoraActual();
        } else if (disciplina === "Natación" && this.horaInicioNatacion === null) {
            this.horaInicioNatacion = this.obtenerHoraActual();
        } else if (disciplina === "Ciclismo" && this.horaInicioCiclismo === null) {
            this.horaInicioCiclismo = this.obtenerHoraActual();
        }

        // Acumulando el tiempo por disciplina
        if (disciplina === "Caminata") {
            this.tiempoCaminata += tiempoAvance;
            this.tiempoTotal = this.tiempoCaminata;  // El tiempo total es solo el de la caminata
        } else if (disciplina === "Natación") {
            this.tiempoNatacion += tiempoAvance;
            this.tiempoTotal = this.tiempoCaminata + this.tiempoNatacion;  // Acumula caminata + natación
        } else if (disciplina === "Ciclismo") {
            this.tiempoCiclismo += tiempoAvance;
            this.tiempoTotal = this.tiempoCaminata + this.tiempoNatacion + this.tiempoCiclismo;  // Acumula caminata + natación + ciclismo
        }
    }

    // Obtener la hora actual como una cadena "hh:mm:ss"
    obtenerHoraActual() {
        let hora = Math.floor(this.tiempoTotal / 3600);
        let minutos = Math.floor((this.tiempoTotal % 3600) / 60);
        let segundos = Math.floor(this.tiempoTotal % 60);
        return `${String(hora).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    }

    // Registrar la hora de llegada
    registrarLlegada() {
        if (!this.horaLlegada) {
            this.horaLlegada = this.obtenerHoraActual();
        }
    }

    // Función para formatear el tiempo en horas: minutos: segundos
    formatearTiempo() {
        return this.obtenerHoraActual();
    }

    // To String para mostrar el estado completo del participante
    toString() {
        return `${this.nombre} - Cédula: ${this.cedula} - Edad: ${this.edad} - Municipio: ${this.municipio} - ` +
               `Posición: ${this.posicion.toFixed(2)} km - Disciplina: ${this.disciplina} - Tiempo Total: ${this.formatearTiempo()} - ` +
               `Caminata: ${this.formatearTiempoCaminata()} - Natación: ${this.formatearTiempoNatacion()} - ` +
               `Ciclismo: ${this.formatearTiempoCiclismo()} - ${this.descalificado ? "Descalificado" : "Competidor"} - Hora de llegada: ${this.horaLlegada || "N/A"}`;
    }

    // Funciones para formatear los tiempos de cada disciplina
    formatearTiempoCaminata() {
        return this.formatearTiempoDeDisciplina(this.tiempoCaminata);
    }

    formatearTiempoNatacion() {
        return this.formatearTiempoDeDisciplina(this.tiempoNatacion);
    }

    formatearTiempoCiclismo() {
        return this.formatearTiempoDeDisciplina(this.tiempoCiclismo);
    }

    // Función general para formatear el tiempo en formato "hh:mm:ss"
    formatearTiempoDeDisciplina(tiempo) {
        const horas = Math.floor(tiempo / 3600);
        const minutos = Math.floor((tiempo % 3600) / 60);
        const segundos = Math.floor(tiempo % 60);
        return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    }
}

// Aquí empieza el código principal para controlar la simulación

document.addEventListener('DOMContentLoaded', function () {
    const btnIniciarSimulacion = document.getElementById("iniciarSimulacion");

    // Verificar si el botón de iniciar simulación está disponible
    if (btnIniciarSimulacion) {
        btnIniciarSimulacion.addEventListener("click", function() {
            // Verificar si hay al menos dos competidores
            if (haySuficientesCompetidores()) {
                alert("Simulación iniciada");
                descalificarNoCompetidores(); // Marcar como descalificados a los que no compiten
                iniciarSimulacion(); // Iniciar la simulación
            } else {
                alert("¡Debe haber al menos dos participantes marcados como competidores!");
            }
        });
    }

    // Recuperar los participantes desde sessionStorage y convertirlos a instancias de Participante
    const participantes = (JSON.parse(sessionStorage.getItem("participantes")) || [])
        .map(p => new Participante(p.nombre, p.cedula, p.edad, p.municipio, p.compite)); // Convertir a instancias

    console.log("Participantes cargados:", participantes); // Verificamos si los participantes están cargados correctamente

    // Función para verificar si hay al menos dos participantes competidores
    function haySuficientesCompetidores() {
        return participantes.filter(participante => participante.compite).length >= 2;
    }

    // Función para descalificar a los participantes que no compiten
    function descalificarNoCompetidores() {
        participantes.forEach(participante => {
            if (!participante.compite) {
                participante.descalificado = true;
                console.log(`El participante ${participante.nombre} ha sido descalificado`);
            }
        });
    }

    // Iniciar la simulación de la competencia
    function iniciarSimulacion() {
        const velocidadCaminata = 7; // 7 km/h
        const velocidadNatacion = 1.72; // 1.72 m/s
        const velocidadCiclismo = 45; // 45 km/h

        let intervalo = setInterval(() => {
            let todosFinalizados = true;

            participantes.forEach(participante => {
                if (participante.compite && !participante.descalificado) {
                    if (participante.posicion < 10) {
                        participante.avanzar(velocidadCaminata);
                        todosFinalizados = false;
                    } else if (participante.posicion < 20) {
                        participante.avanzar(velocidadNatacion);
                        todosFinalizados = false;
                    } else if (participante.posicion < 50) {
                        participante.avanzar(velocidadCiclismo);
                        todosFinalizados = false;
                    } else if (participante.posicion >= 50 && participante.disciplina !== "Finalizado") {
                        participante.posicion = 50;
                        participante.disciplina = "Finalizado";
                        participante.registrarLlegada();
                    }
                }
            });

            participantes.sort((a, b) => b.posicion - a.posicion);
            // Actualizar la tabla con los resultados
            mostrarResultados();

            // Si todos los participantes han finalizado, parar la simulación
            if (todosFinalizados) {
                clearInterval(intervalo);
                mostrarPosicionesFinales();
            }
        }, 1000); // Intervalo de 1 segundo
    }

    // Mostrar los resultados en la tabla
    function mostrarResultados() {
        const resultadosBody = document.getElementById("tabla-competidores").getElementsByTagName("tbody")[0];

        // Limpiar la tabla antes de agregar nuevos resultados
        resultadosBody.innerHTML = "";

        // Iterar sobre los participantes ordenados por su posición
        participantes.forEach((participante, index) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${participante.cedula}</td>
                <td>${participante.nombre}</td>
                <td>${participante.edad}</td>
                <td>${participante.municipio}</td>
                <td>${participante.posicion.toFixed(2)}</td>
                <td>${participante.disciplina}</td>
                <td>${participante.formatearTiempo()}</td> <!-- Tiempo total -->
                <td>${participante.formatearTiempoCaminata()}</td> <!-- Tiempo Caminata -->
                <td>${participante.formatearTiempoNatacion()}</td> <!-- Tiempo Natación -->
                <td>${participante.formatearTiempoCiclismo()}</td> <!-- Tiempo Ciclismo -->
                <td>${participante.descalificado ? "Descalificado" : "Competidor"}</td>
                <td>${participante.horaLlegada ? participante.horaLlegada : "00:00:00"}</td>
            `;

            resultadosBody.appendChild(tr);
        });
    }
});

