
exports.up = function(knex, Promise) {
// id/serial (primary key)
// name ( var char, limit 25, constraint UNIQUE NOT NULL)


  return knex.schema.createTable("users", function(table){
  	table.string("username").primary().unique().notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
