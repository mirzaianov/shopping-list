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
      SET ${shoppingItems.position} = ${shoppingItems.position} + 1
      WHERE ${shoppingItems.userId} = ${userId}
    )
    INSERT INTO ${shoppingItems} (
      ${shoppingItems.id},
      ${shoppingItems.userId},
      ${shoppingItems.todo},
      ${shoppingItems.changedOn},
      ${shoppingItems.position}
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
