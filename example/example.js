module.exports = {
  name: 'ExampleSpoke',
  events: {
    'VolantePostgres.ready'() {
      this.createSchema();
      this.createTable();
      this.testInsert();
      this.test();
      // this.getUuid();
    },
  },
  data() {
    return {
      tableColumns: `id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                     name TEXT,
                     email TEXT`,
    };
  },
  methods: {
    createSchema() {
      this.$.VolantePostgres.ensureSchema('test_volante_postgres').then(() => {
        this.$log('created schema');
      }).catch((err) => {
        this.$warn('error creating schema', err.message);
      });
    },
    createTable() {
      this.$.VolantePostgres.ensureTable('test_volante_postgres.test', this.tableColumns).then(() => {
        this.$log('created table');
      }).catch((err) => {
        this.$warn('error creating table', err.message);
      });
    },
    async test() {
      let rslt = await this.$.VolantePostgres.query(`SELECT * from test_volante_postgres.test;`);
      console.log(rslt)
    },
    async testInsert() {
      let rslt = await this.$.VolantePostgres.query(`INSERT into test_volante_postgres.test (coltest) values ('hello');`);
      console.log(rslt)
    },
    async getUuid() {
      let rslt = await this.$.VolantePostgres.query('SELECT gen_random_uuid();');
      console.log(rslt)
    }
  },
};