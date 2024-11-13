class Participante {
    constructor(nombre) {
        this.nombre = nombre;
        this.posicion = 0;
        this.descalificado = false;
        this.tiempo = 0;
        this.disciplina = "N/A";
        this.horaLlegada = null;
        this.variabilidadTiempo = Math.random() * (500 - 10) + 10; // Tiempo entre 10 y 500 segundos
    }

    ran(min, maximo) {
        return Math.random() * (maximo - min) + min;
    }

    avanzar(velocidadMax) {
        if (this.posicion < 50 && !this.descalificado) {
            const distancia = this.ran(0.61, 0.8) * velocidadMax;
            if (distancia < 1) {
                this.descalificado = true;
            } else {
                this.posicion += distancia / 4;
                this.actualizarTiempo(0);
                if (this.posicion >= 50) {
                    this.posicion = 50;
                    this.disciplina = "Finalizado";
                    this.registrarLlegada();
                }
            }
        }
    }

    actualizarTiempo(incremento) {
        this.tiempo += incremento;
    }

    formatearTiempo() {
        const horas = Math.floor(this.tiempo / 3600);
        const minutos = Math.floor((this.tiempo % 3600) / 60);
        const segundos = Math.floor(this.tiempo % 60);
        return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    }

    registrarLlegada() {
        if (!this.horaLlegada) {
            this.horaLlegada = this.formatearTiempo();
        }
    }

    toString() {
        return `${this.nombre} - Posición: ${this.posicion.toFixed(2)} km - Disciplina: ${this.disciplina} - Tiempo: ${this.formatearTiempo()} - ${this.descalificado ? "Descalificado" : "En Competencia"} - Hora de llegada: ${this.horaLlegada || "N/A"}`;
    }
}

// Crear una lista de participantes
const participantes = [
    new Participante("Alice"),
    new Participante("Bob"),
    new Participante("Charlie"),
    new Participante("Dana")
];

function mostrarResultados() {
    participantes.sort((a, b) => b.posicion - a.posicion);
    console.clear();
    console.log("\nResultados actuales:");
    participantes.forEach(participante => {
        console.log(participante.toString());
    });
}

function iniciarSimulacion() {
    const velocidadCaminata = 7; // 7 km/h
    const velocidadNatacion = 1.72; // 1.72 m/s
    const velocidadCiclismo = 45; // 45 km/h

    let intervalo = setInterval(() => {
        let todosFinalizados = true;

        // Generar un solo incremento de tiempo aleatorio para todos los participantes
        const incrementoTiempo = Math.random() * (500 - 10) + 10;
        
        participantes.forEach(participante => {
            participante.actualizarTiempo(incrementoTiempo);  // Incrementar tiempo de todos los participantes de forma sincronizada

            if (!participante.descalificado && participante.posicion < 10) {
                participante.avanzar(velocidadCaminata);
                participante.disciplina = "Caminata";
                todosFinalizados = false;
            } else if (!participante.descalificado && participante.posicion < 20) {
                participante.avanzar(velocidadNatacion);
                participante.disciplina = "Natación";
                todosFinalizados = false;
            } else if (!participante.descalificado && participante.posicion < 50) {
                participante.avanzar(velocidadCiclismo);
                participante.disciplina = "Ciclismo";
                todosFinalizados = false;
            } else if (participante.posicion >= 50 && participante.disciplina !== "Finalizado") {
                participante.posicion = 50;
                participante.disciplina = "Finalizado";
                participante.registrarLlegada();
            }
        });

        mostrarResultados();

        // Si todos los participantes han finalizado, parar la simulación
        if (todosFinalizados) {
            clearInterval(intervalo);
            mostrarPosicionesFinales();
        }
    }, 1000); // Intervalo de 1 segundo
}

function mostrarPosicionesFinales() {
    participantes.sort((a, b) => b.posicion - a.posicion);
    console.log("\nPosiciones finales:");
    participantes.forEach((participante, index) => {
        console.log(`${index + 1}. ${participante.toString()}`);
    });
}

// Iniciar la simulación
iniciarSimulacion();
