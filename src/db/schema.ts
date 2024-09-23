import { bigint, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const pods = pgTable('pods', {
  id: serial('id').primaryKey().notNull().unique(),
  token_id: integer('token_id').notNull(),
  contract_address: text('contract_address').notNull(),
  chain_id: integer('chain_id').notNull(),
});

export const merkleTrees = pgTable('merkle_trees', {
  id: serial('id').primaryKey().notNull().unique(),
  pod_id: serial('pod_id').references(() => pods.id).notNull(),
  root: text('root').notNull(),
  format: text('format').notNull(),
  leaf_encoding: text("leaf_encoding").notNull()
});

export const claimCodes = pgTable('claim_codes', {
  id: serial('id').primaryKey().notNull().unique(),
  pod_id: serial('pod_id').references(() => pods.id).notNull(),
  tree_id: serial('tree_id').references(() => merkleTrees.id).notNull(),
  index: bigint('index', { mode: 'bigint' }).notNull(),
  code: text('code').notNull(),
  // leaf: text('leaf').notNull(),
});