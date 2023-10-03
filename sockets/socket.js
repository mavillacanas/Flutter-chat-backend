
const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index');
const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', client => {

    console.log('Cliente conectado');
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    console.log(valido, uid);

    // Verificar autenticación
    if( !valido ) {
      return client.disconnect();
    }

    //Cliente autenticado
    usuarioConectado(uid);

    //Ingresar al usuario a una sala específica
    // sala global -> todos los dispositivos conectados
    // para mandar un mensaje privado a un cliente se puede hacer con client.id
    // crearemos salas privadas con el uid del destinatario
    client.join (uid);

    // escuchar del cliente mensaje-personal
    client.on('mensaje-personal', async (payload) => {
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
     });
    
    
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
     });

   //   client.on('mensaje', ( payload ) => {
   //      console.log('Mensaje', payload);
   //      io.emit( 'mensaje', {admin: 'Nuevo mensaje'});
   //   });

  });