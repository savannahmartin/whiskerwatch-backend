export function up(knex) {
	return knex.schema.alterTable("pets", (table) => {
		table.text("notes").nullable();
	});
}

export function down(knex) {
	return knex.schema.alterTable("pets", (table) => {
		table.dropColumn("notes");
	});
}
