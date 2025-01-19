export function up(knex) {
	return knex.schema.alterTable("pets", (table) => {
		table.enum("status", ["active", "archived"]).defaultTo("active");
	});
}

export function down(knex) {
	return knex.schema.alterTable("pets", (table) => {
		table.dropColumn("status");
	});
}
