import { and, asc, desc, eq, sql } from 'drizzle-orm';
import { db } from './client';
import { shoppingItems } from './schema';

export type ShoppingItem = typeof shoppingItems.$inferSelect;

export const listShoppingItems = (userId: string) => {
  return db
    .select()
    .from(shoppingItems)
    .where(eq(shoppingItems.userId, userId))
    .orderBy(asc(shoppingItems.position), desc(shoppingItems.changedOn));
};

export const createShoppingItem = async (userId: string, todo: string) => {
  const id = crypto.randomUUID();
  const changedOn = Date.now();

  await db.execute(sql`
    WITH shifted AS (
      UPDATE ${shoppingItems}
      SET ${sql.identifier('position')} = ${shoppingItems.position} + 1
      WHERE ${shoppingItems.userId} = ${userId}
    )
    INSERT INTO ${shoppingItems} (
      ${sql.identifier('id')},
      ${sql.identifier('user_id')},
      ${sql.identifier('todo')},
      ${sql.identifier('changed_on')},
      ${sql.identifier('position')}
    )
    VALUES (${id}, ${userId}, ${todo}, ${changedOn}, 0)
  `);

  return { id, userId, todo, changedOn, position: 0 };
};

export const updateShoppingItem = async (userId: string, id: string, todo: string) => {
  const [item] = await db
    .update(shoppingItems)
    .set({ todo, changedOn: Date.now() })
    .where(and(eq(shoppingItems.userId, userId), eq(shoppingItems.id, id)))
    .returning();

  return item ?? null;
};

export const deleteShoppingItem = async (userId: string, id: string) => {
  const [item] = await db
    .delete(shoppingItems)
    .where(and(eq(shoppingItems.userId, userId), eq(shoppingItems.id, id)))
    .returning({ id: shoppingItems.id });

  return Boolean(item);
};

type ReorderShoppingItemsRow = {
  inputCount: number;
  userCount: number;
  distinctInputCount: number;
  ownedInputCount: number;
  updatedCount: number;
};

export const reorderShoppingItems = async (userId: string, ids: string[]) => {
  const values = sql.join(
    ids.map((id, position) => sql`(${id}, ${position}::integer)`),
    sql`, `,
  );
  const result = await db.execute<ReorderShoppingItemsRow>(sql`
    WITH input("id", "position") AS (VALUES ${values}),
    user_items AS (
      SELECT ${shoppingItems.id}
      FROM ${shoppingItems}
      WHERE ${shoppingItems.userId} = ${userId}
    ),
    counts AS (
      SELECT
        (SELECT count(*)::int FROM input) AS "inputCount",
        (SELECT count(*)::int FROM user_items) AS "userCount",
        (SELECT count(DISTINCT "id")::int FROM input) AS "distinctInputCount",
        (
          SELECT count(*)::int
          FROM input
          INNER JOIN user_items ON user_items.id = input.id
        ) AS "ownedInputCount"
    ),
    updated AS (
      UPDATE ${shoppingItems}
      SET ${sql.identifier('position')} = input.position
      FROM input, counts
      WHERE ${shoppingItems.id} = input.id
        AND ${shoppingItems.userId} = ${userId}
        AND counts."inputCount" = counts."userCount"
        AND counts."inputCount" = counts."distinctInputCount"
        AND counts."inputCount" = counts."ownedInputCount"
      RETURNING ${shoppingItems.id}
    )
    SELECT
      counts."inputCount",
      counts."userCount",
      counts."distinctInputCount",
      counts."ownedInputCount",
      (SELECT count(*)::int FROM updated) AS "updatedCount"
    FROM counts
  `);
  const row = result.rows[0];

  return (
    row.inputCount === row.userCount &&
    row.inputCount === row.distinctInputCount &&
    row.inputCount === row.ownedInputCount &&
    row.inputCount === row.updatedCount
  );
};
