import pg from 'pg';
import debug from 'debug';

const debugSQL = debug('app:SQL');

// Pool permet d'ouvrir des connexion multiple utilisable en parallèle
const client = new pg.Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
});
// pas de client connect avec un pool, car c'est lui qui gère l'ouverture et la fermeture des
// connexions

const debugClient = {
  originalClient: client,
  query(...args) {
    debugSQL(...args);
    return client.query(...args);
  },
};

export default debugClient;
