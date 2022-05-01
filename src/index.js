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
      client: null,
    };
  },
  methods: {
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
    async insert() {
      
    },
    async query(q) {
      return this.client.query(q);
    },
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