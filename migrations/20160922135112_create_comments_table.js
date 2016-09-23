// id/serial (primary key)
// comment_text (var char, limit 300, NOT NULL)
// user_ name (string, foreign key to Users column’s primarykey)
// post_ id (integer, foreign key to Posts column’s primary key)
//


exports.up = function(knex, Promise) {

    return knex.schema.createTableIfNotExists("comments", function(table){

    	 table.increments().primary();
         table.string("comment_text").notNullable();
         table.integer('post_id');
         table.foreign('post_id').references('posts.id')
         table.string('by_username');
         table.foreign('by_username').references('users.username')

    });
  };

  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('comments');
  };
