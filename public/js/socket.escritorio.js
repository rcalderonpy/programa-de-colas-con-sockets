var socket = io();

var searchParams = new URLSearchParams(window.location.search);
var label = $('span');

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario')
}

var escritorio = searchParams.get('escritorio');

console.log('escritorio :', escritorio);

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay mas tickets') {
            label.text(resp);
            alert(resp);
            return
        }

        label.text(resp.numero);
    })
})