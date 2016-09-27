
exports.up = function(knex, Promise) {
    return knex.schema.alterTable("comments", function(table){
         table.integer('post_id');
         table.foreign('post_id').references('posts.id').onDelete("CASCADE").onUpdate("CASCADE")

    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable("comments", function(table){
         table.integer('post_id');
         table.foreign('post_id').references('posts.id').onDelete().onUpdate()

    });
};
