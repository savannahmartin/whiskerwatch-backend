export function up(knex) {
	return knex.schema.createTable("behaviors", (table) => {
		table.increments("id").primary();
		table.integer("pet_id").unsigned().notNullable();
		table.string("description").notNullable();
		table.date("date").notNullable();
		table.timestamps(true, true);
		table.foreign("pet_id").references("pets.id").onDelete("CASCADE");
	});
}

export function down(knex) {
	return knex.schema.dropTable("behaviors");
}
