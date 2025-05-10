//Referencias html
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnEnviar = document.querySelector('#btnEnviar');



const socket =io();


socket.on('connect', () => {
    //console.log('Server conectado');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    //console.log('Server desconectado');
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
    
});

socket.on('enviar-mensaje', (payload) => {
    console.log('Mensaje recibido:', payload);
});


btnEnviar.addEventListener('click', () => {
    const mensaje = txtMessage.value;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`;
    const payload = {
        mensaje,
        id: '123',
        fecha: formattedDate
    }
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('Desde el server', id);
    });
});