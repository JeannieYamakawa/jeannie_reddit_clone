
exports.up = function(knex, Promise) {
    // id/serial (primary key)
    // post_title (var char, limit 50, NOT NULL)
    // content_link (var char NOT NULL)
    // user_ username (NOT NULL var char, foreign key to Users column’s name column)


  return knex.schema.createTableIfNotExists("posts", function(table){

  	   table.increments().primary();
       table.string("title", 100).notNullable();
       table.string("content_link").notNullable();
       table.string('username');
       table.foreign('username').references('users.username')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts');
};
