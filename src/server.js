import Hapi from 'hapi';
import Good from 'good';

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: __dirname,
      },
    },
  },
});
server.connection({
  host: 'localhost',
  port: 8080,
});

server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }
  server.route({
    method: 'GET',
    path: '/{path*}',
    handler(request, reply) {
      reply.file('./static/index.html');
    },
  });
  server.route({
    method: 'GET',
    path: '/js/bundle.js',
    handler(request, reply) {
      reply.file('./static/js/bundle.js');
    },
  });
});

server.register({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*',
        }],
      }, {
        module: 'good-console',
      }, 'stdout'],
    },
  },
}, (err) => {
  if (err) {
    throw err;
  }
  server.start((error) => {
    if (error) {
      throw error;
    }
    server.log('info', `Server running at: ${server.info.uri}`);
  });
});
