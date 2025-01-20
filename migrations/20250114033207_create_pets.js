export function up(knex) {
	return knex.schema.createTable("pets", (table) => {
		table.increments("id").primary();
		table.string("name").notNullable();
		table.string("species").notNullable();
		table.string("breed");
		table.integer("age");
		table.timestamps(true, true);
	});
}

export function down(knex) {
	return knex.schema.dropTable("pets");
}
