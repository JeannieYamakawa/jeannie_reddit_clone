
exports.up = function(knex, Promise) {
// id/serial (primary key)
// name ( var char, limit 25, constraint UNIQUE NOT NULL)


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
