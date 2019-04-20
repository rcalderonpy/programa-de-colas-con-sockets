const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();
io.on('connection', (client) => {
    console.log('cliente concectado');


    client.on('disconnect', () => {
        console.log('cliente desconectado');

    })

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(siguiente);
    })

    // emitir evento estado actual
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es obligatorio'

            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        let ultimos4 = ticketControl.getUltimos4();

        callback(atenderTicket);

        client.broadcast.emit('ultimos4', {
            ultimos4: ultimos4
        });

        // client.broadcast.emit(ultimos4);
    })



});