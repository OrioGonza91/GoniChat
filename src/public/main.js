console.log('JS del cliente')
const title = document.getElementById('title-welcome')
const chatBox = document.getElementById('send')
const socket = io()

let user = ''

Swal.fire({
    title: 'Ingrese un nickname',
    input: 'text',
    text: 'Identificarse para ingresar al chat',
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && 'Es necesario que ingrese un nickname'
    }
}).then((result) => {
    user = result.value
    title.innerText = 'Bienvenido al GoniChat, ' + user
    socket.emit('newUser', {user} )
})

chatBox.addEventListener('keyup', (event) => {
    if(event.key === 'Enter') {
        socket.emit('mensaje', { user, mensaje: event.target.value })
        chatBox.value = ''
    }
})

socket.on('conversacion', (data) => {
    const contenedorChat = document.getElementById('contenedor-chat')
    contenedorChat.innerText = ''
    data.forEach(chat => {
        const div = document.createElement('div')
        const nombre = document.createElement('p')
        const mensaje = document.createElement('p')

        nombre.innerText = chat.user + ': '
        mensaje.innerText = chat.mensaje
        
        div.appendChild(nombre)
        div.appendChild(mensaje)
        contenedorChat.appendChild(div)
    })
})