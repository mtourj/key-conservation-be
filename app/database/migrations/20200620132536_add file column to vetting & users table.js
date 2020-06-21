exports.up = function (knex) {
  return knex.schema
    .table('vetting', (tbl) => {
      tbl.string('file', 500);
    })

    .table('users', (tbl) => {
      tbl.string('file', 500);
    });
};

exports.down = function (knex) {
  return knex.schema
    .table('vetting', (tbl) => {
      tbl.dropColumn('file');
    })

    .table('users', (tbl) => {
      tbl.dropColumn('file');
    });
};
