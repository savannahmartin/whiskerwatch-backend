export function up(knex) {
	return knex.schema.alterTable("pets", (table) => {
		if (!knex.schema.hasColumn("pets", "status")) {
			table.string("status").defaultTo("active");
		}
	}).alterTable("behaviors", (table) => {
		if (!knex.schema.hasColumn("behaviors", "status")) {
			table.string("status").defaultTo("active");
		}
	});
}

export function down(knex) {
	return knex.schema.alterTable("pets", (table) => {
		table.dropColumn("status");
	}).alterTable("behaviors", (table) => {
		table.dropColumn("status");
	});
}
