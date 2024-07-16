import express from 'express'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'
import ViewRouters from './routes/viewsRouters.route.js'
import { Server } from 'socket.io'


const app = express()
const PORT = 8080;

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
app.use('/', ViewRouters)

const httpServer = app.listen(PORT, () =>{
    console.log('Servidor http ON')
})

const io = new Server(httpServer)
const conversacion = []

io.on('connection', (socket) =>{
    console.log('Nueva conexion')
    socket.on('mensaje', (data) => {
        conversacion.push(data)
        console.log(data)
        io.emit('conversacion', conversacion)
        
    })
}) 