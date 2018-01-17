
exports.up = function(knex, Promise) {
  return knex.schema.createTable("user", function(table){
    table.increments("id").primary();
    table.string("username").notNull();
    table.integer("password").notNull();
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("user");
};
