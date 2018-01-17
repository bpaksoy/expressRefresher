
exports.up = function(knex, Promise) {
  return knex.schema.createTable("allusers", function(table){
    table.increments("id").primary();
    table.string("username").notNullable().defaultTo("");;
    table.specificType("hashed_password", "char(60)").notNullable();
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("allusers");
};
