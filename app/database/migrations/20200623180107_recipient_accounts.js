exports.up = function (knex) {
  return knex.schema.alterTable('conservationists', (table) => {
    table.string('recipient_id');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('conservationists', (table) => {
    table.dropColumn('recipient_id');
  });
};
