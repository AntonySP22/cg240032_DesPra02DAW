document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    // Cargar los datos de localStorage y rellenar los campos del formulario
    const nombre = localStorage.getItem('nombre');
    const correo = localStorage.getItem('correo');
    const mensaje = localStorage.getItem('mensaje');

    if (nombre) document.getElementById('nombre').value = nombre;
    if (correo) document.getElementById('correo').value = correo;
    if (mensaje) document.getElementById('mensaje').value = mensaje;

    // Imprimir los datos en la consola si existen
    if (nombre || correo || mensaje) {
        console.log('Datos cargados de localStorage:');
        console.log(`Hora: ${new Date().toLocaleTimeString()}`);
        if (nombre) console.log(`Nombre: ${nombre}`);
        if (correo) console.log(`Correo: ${correo}`);
        if (mensaje) console.log(`Mensaje: ${mensaje}`);
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        // Obtener los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const mensaje = document.getElementById('mensaje').value;

        // Guardar los valores en localStorage
        localStorage.setItem('nombre', nombre);
        localStorage.setItem('correo', correo);
        localStorage.setItem('mensaje', mensaje);

        // Mostrar una alerta con los datos enviados
        alert(`Datos enviados:\nNombre: ${nombre}\nCorreo: ${correo}\nMensaje: ${mensaje}`);

        // Imprimir los datos en la consola
        console.log('Datos enviados:');
        console.log(`Nombre: ${nombre}`);
        console.log(`Correo: ${correo}`);
        console.log(`Mensaje: ${mensaje}`);
    });
});