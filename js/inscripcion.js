// Esta cosa no me dejaba mostrar el contenido por que el js no se cargaba despues del dom
document.addEventListener('DOMContentLoaded', function () {
    // Si en laboratorio esta '' no suma en el total, pero si esta [''] si suma "OJOOO"
    const datosMaterias = {
        'Técnico en Computación': [
            { codigo: 'ALG502', asignatura: 'Álgebra Vectorial y Matrices', matricula: 1, uv: 4, ofertada: true, teoria: ['16T', '17T'], laboratorio: '' },
            { codigo: 'ASB404', asignatura: 'Análisis y Diseño de Sistemas y Base de Datos', matricula: 1, uv: 4, ofertada: true, teoria: ['02T', '03T'], laboratorio: ['06L', '07L'] },
            { codigo: 'DAW404', asignatura: 'Desarrollo de Aplic. Web con Soft. Interpret. en el Cliente', matricula: 1, uv: 4, ofertada: true, teoria: ['04T'], laboratorio: ['07L'] },
            { codigo: 'DSP404', asignatura: 'Desarrollo de Aplicaciones con Software Propietario', matricula: 1, uv: 4, ofertada: true, teoria: ['05T', '06T'], laboratorio: ['07L', '08L'] },
            { codigo: 'POO404', asignatura: 'Programación Orientada a Objetos', matricula: 1, uv: 4, ofertada: true, teoria: ['04T', '05T'], laboratorio: ['10L', '11L'] },
        ],
        'Licenciatura en Diseño Gráfico': [
            { codigo: 'PMU295', asignatura: 'Preproducción Multimedia', matricula: 1, uv: 4, ofertada: true, teoria: ['02T', '03T'], laboratorio: ['06L', '07L'] },
            { codigo: 'EDG295', asignatura: 'Edición Digital de Gráficos', matricula: 1, uv: 4, ofertada: false, teoria: ['04T', '05T'], laboratorio: ['08L', '09L'] },
            { codigo: 'TER925', asignatura: 'Técnicas de Redacción', matricula: 1, uv: 4, ofertada: true, teoria: ['06T', '07T'], laboratorio: '' },
            { codigo: 'TEF295', asignatura: 'Técnicas Fotográficas ', matricula: 1, uv: 4, ofertada: true, teoria: ['08T', '09T'], laboratorio: '' },
            { codigo: 'TCV295', asignatura: 'Técnicas de Composición Visual', matricula: 1, uv: 4, ofertada: true, teoria: ['10T', '11T'], laboratorio: ['12L', '13L'] },
        ]
        // Como anteriormente se agregarian más carreras
    };

    // Objeto que contiene las tarifas
    const tarifas = {
        inscripcion: 40,
        materiasConLaboratorio: 42,
        servicioAcademicoEnLinea: 13,
        seguroAccidentesPersonales: 5.50,
        serviciosColecturia: 5.50,
        recursosBiblioteca: 15,
        costoCarnet: 5,
        cuotaMensual: 65
    };

    let estaInscribiendo = false;
    let materiasSeleccionadas = [];

    // Selección de elementos del DOM
    const inputNombre = document.getElementById('nombre');
    const inputCarnet = document.getElementById('carnet');
    const selectCarrera = document.getElementById('carrera');
    const cuerpoTablaMaterias = document.querySelector('#tablaMaterias tbody');
    const botonInscripcion = document.getElementById('botonInscripcion');
    const tarjetaCargos = document.getElementById('tarjetaCargos');
    const infoEstudiante = document.getElementById('infoEstudiante');
    const listaCargos = document.getElementById('listaCargos');
    const totalCargos = document.getElementById('totalCargos');

    // Función que valida el formato del carnet usando una expresión regular
    function validarCarnet(id) {
        const regex = /^[A-Z]{2}\d{6}$/; // Expresión regular
        return regex.test(id);
    }

    // Evento que se muestra cuando el usuario escribe en el campo del carnet
    inputCarnet.addEventListener('input', function () { // Evento
        const spanError = document.getElementById('errorCarnet');
        if (this.value && !validarCarnet(this.value)) {
            spanError.textContent = 'Formato inválido. Debe ser XX000000';
        } else {
            spanError.textContent = '';
        }
    });

    // Función que actualiza la tabla de materias
    function actualizarTablaMaterias() {
        const carrera = selectCarrera.value;
        const materias = datosMaterias[carrera] || []; // Objeto
        cuerpoTablaMaterias.innerHTML = '';
        materias.forEach((materia, indice) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
				<td>${materia.codigo}</td>
				<td>${materia.asignatura}</td>
				<td>${materia.matricula}</td>
				<td>${materia.uv}</td>
				<td><input type="checkbox" ${estaInscribiendo && materia.ofertada ? '' : 'disabled'} ${materia.ofertada ? 'checked' : ''} data-indice="${indice}"></td>
				<td><input type="checkbox" disabled></td>
				<td><input type="checkbox" disabled></td>
				<td>
					<select ${estaInscribiendo && materia.ofertada ? '' : 'disabled'}>
						${materia.teoria.map(grupo => `<option value="${grupo}">${grupo}</option>`).join('')}
					</select>
				</td>
				<td>
					${materia.laboratorio.length > 0 ? `
						<select ${estaInscribiendo && materia.ofertada ? '' : 'disabled'}>
							${materia.laboratorio.map(grupo => `<option value="${grupo}">${grupo}</option>`).join('')}
						</select>
					` : 'N/A'}
				</td>
			`;
            if (!materia.ofertada) {
                fila.classList.add('deshabilitado');
            }
            cuerpoTablaMaterias.appendChild(fila);
        });
    }

    // Evento que se muestra cuando se selecciona una carrera
    selectCarrera.addEventListener('change', actualizarTablaMaterias); // Evento

    // Función que calcula las tarifas totales
    function calcularTarifas() {
        const materiasConLaboratorioCount = materiasSeleccionadas.filter(materia => materia.laboratorio.length > 0).length;
        const totalTarifas = tarifas.inscripcion + (materiasConLaboratorioCount * tarifas.materiasConLaboratorio) +
            tarifas.servicioAcademicoEnLinea + tarifas.seguroAccidentesPersonales +
            tarifas.serviciosColecturia + tarifas.recursosBiblioteca + tarifas.costoCarnet + tarifas.cuotaMensual; // Objeto
        return totalTarifas;
    }

    // Función que muestra los cargos en la tarjeta de cargos
    function mostrarCargos() {
        const totalTarifasMonto = calcularTarifas();
        infoEstudiante.textContent = `Estudiante: ${inputNombre.value} (Carnet: ${inputCarnet.value})`;
        listaCargos.innerHTML = `
			<li>Inscripción: $${tarifas.inscripcion}</li>
            <li>Cuota: $${tarifas.cuotaMensual}</li>
			<li>Materias con laboratorio: $${materiasSeleccionadas.filter(materia => materia.laboratorio.length > 0).length * tarifas.materiasConLaboratorio}</li>
			<li>Servicio académico en línea: $${tarifas.servicioAcademicoEnLinea}</li>
			<li>Seguro de accidentes personales: $${tarifas.seguroAccidentesPersonales}</li>
			<li>Servicios de colecturía, medios de pago y soporte administrativo: $${tarifas.serviciosColecturia}</li>
			<li>Recursos de biblioteca: $${tarifas.recursosBiblioteca}</li>
            <li>Carnet: $${tarifas.costoCarnet}</li>
		`;
        totalCargos.textContent = `Total a pagar: $${totalTarifasMonto}`;
        tarjetaCargos.style.display = 'block';
    }

    // Evento que se dispara cuando se hace clic en el botón de inscripción
    botonInscripcion.addEventListener('click', function () { // Evento
        if (!estaInscribiendo) {
            if (!inputNombre.value || !inputCarnet.value || !validarCarnet(inputCarnet.value)) {
                alert('Por favor, ingrese un nombre válido y un carnet en el formato correcto antes de iniciar la inscripción.');
                return;
            }
        }

        estaInscribiendo = !estaInscribiendo;
        this.textContent = estaInscribiendo ? 'Terminar Inscripción' : 'Iniciar Inscripción';
        actualizarTablaMaterias();

        if (!estaInscribiendo) {
            materiasSeleccionadas = Array.from(cuerpoTablaMaterias.querySelectorAll('input[type="checkbox"]:checked'))
                .map(checkbox => {
                    const indice = checkbox.dataset.indice;
                    return datosMaterias[selectCarrera.value][indice]; // Objeto
                });
            mostrarCargos();
        } else {
            tarjetaCargos.style.display = 'none';
        }
    });

    actualizarTablaMaterias();
});
