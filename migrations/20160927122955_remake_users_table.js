exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists("users", function(table){
  	table.increments().primary();
  	table.string("username");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
