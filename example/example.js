module.exports = {
  name: 'ExampleSpoke',
  events: {
    'VolantePostgres.ready'() {
      this.createSchema();
      this.createTable();
      this.testInsert();
      this.test();
    },
  },
  data() {
    return {
      insertedId: null,
      mongo: this.$spokes.VolanteMongo,
    };
  },
  methods: {
    createSchema() {
      this.$spokes.VolantePostgres.query(`CREATE SCHEMA IF NOT EXISTS test_volante_postgres;`).then(() => {
        this.$log('created schema');
      }).catch((err) => {
        this.$warn('error creating schema', err.message);
      });
    },
    createTable() {
      this.$spokes.VolantePostgres.query(`CREATE TABLE IF NOT EXISTS test_volante_postgres.test (coltest varchar(20));`).then(() => {
        this.$log('created table');
      }).catch((err) => {
        this.$warn('error creating table', err.message);
      });
    },
    async test() {
      let rslt = await this.$spokes.VolantePostgres.query(`SELECT * from test.test;`);
      console.log(rslt)
    },
    async testInsert() {
      let rslt = await this.$spokes.VolantePostgres.query(`INSERT into test.test (coltest) values ('hello');`);
      // console.log(rslt)
    },
  },
};