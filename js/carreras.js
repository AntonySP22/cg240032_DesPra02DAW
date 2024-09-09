document.addEventListener('DOMContentLoaded', function () {
    dragElement(document.getElementById("movable-window-computacion"));
    dragElement(document.getElementById("movable-window-industrial"));
    dragElement(document.getElementById("movable-window-telecomunicaciones"));
    dragElement(document.getElementById("movable-window-diseno"));
    dragElement(document.getElementById("movable-window-tecnico-computacion"));
    dragElement(document.getElementById("movable-window-tecnico-calidad"));

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            // Si hay un encabezado, muévelo desde allí
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            // De lo contrario, muévelo desde cualquier lugar dentro del elemento
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // Obtén la posición del cursor al inicio
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // Llama a la función cada vez que el cursor se mueve
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // Calcula la nueva posición del cursor
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // Establece la nueva posición del elemento
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // Detén el movimiento cuando se suelta el botón del mouse
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
});
