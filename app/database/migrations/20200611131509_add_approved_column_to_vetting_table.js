exports.up = function (knex) {
  return knex.schema.table('vetting', (tbl) => {
    tbl.boolean('approved').notNullable().defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table('vetting', (tbl) => {
    tbl.dropColumn('approved');
  });
};
