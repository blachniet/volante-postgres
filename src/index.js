const { Client } = require('pg');

module.exports = {
  name: 'VolantePostgres',
  props: {
    db: 'postgres',
    host: 'postgres',
    port: 5432,
    user: 'postgres',
    pass: 'postgres'
  },
  events: {

  },
  init() {

  },
  done() {
    this.disconnect();
  },
  updated() {
    this.disconnect();
    this.connect();
  },
  data() {
    return {
      client: null, // handle to pg client
    };
  },
  methods: {
    //
    // connect the client to postgres
    //
    async connect() {
      this.client = new Client({
        host: this.host,
        database: this.db,
        user: this.user,
        password: this.pass,
        port: this.port,
      });
      await this.client.connect();
      this.$ready(`connected to postgres at ${this.host}:${this.port}`);
    },
    //
    // use 'if not exists' to ensure the schema with the given name has been created
    //
    ensureSchema(name) {
      return this.client.query(`CREATE SCHEMA IF NOT EXISTS ${name};`);
    },
    //
    // use 'if not exists' to ensure the given table has been created
    //
    ensureTable(name, columns) {
      return this.client.query(`CREATE TABLE IF NOT EXISTS ${name} (${columns});`);
    },
    //
    // query wrapper for pg .query
    //
    async query(q) {
      return this.client.query(q);
    },
    //
    // disconnect the client from postgres
    //
    disconnect() {
      if (this.client) {
        return this.client.end().then(() => {
          this.$log('client has disconnected');
        }).catch((err) => {
          this.$error('error during disconnection', err.stack);
        });
      }
    },
  },
};