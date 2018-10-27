// var connect = require('connect');
// var serveStatic = require('serve-static');
// connect().use(serveStatic(__dirname)).listen(8000, function(){
//     console.log('Server running on 8000...');
// });

const Hapi = require('hapi');
const Boom = require('boom');
const Path = require('path');
const Inert = require('inert');
// const cartRoutes = require('./cart-routes');
// const storage = require('./brands-storage');

// Create a server with a host and port
const server = new Hapi.Server({
    debug: { request: ['error'] },
    connections: {
        routes: {cors: true}
    }
});

server.register({
    register: require('inert')
}, (err) => {
    if (err) {
        console.log('Failed loading plugin');
    }
});
server.connection({ host: 'localhost', port: 8000 });

// server.route(cartRoutes);


server.route({
    method: 'GET',
    path:'/index',
    handler: function (request, reply) {
        return reply(JSON.stringify(storage.plates));
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'ui'
        }
    }
});


// Start the server
server.start((err) => {
    console.log('Server running at:', server.info.uri);
});
