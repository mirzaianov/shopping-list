import { and, desc, eq } from 'drizzle-orm';
import { db } from './client';
import { shoppingItems } from './schema';

export type ShoppingItem = typeof shoppingItems.$inferSelect;

export const listShoppingItems = (userId: string) => {
  return db
    .select()
    .from(shoppingItems)
    .where(eq(shoppingItems.userId, userId))
    .orderBy(desc(shoppingItems.changedOn));
};

export const createShoppingItem = async (userId: string, todo: string) => {
  const [item] = await db
    .insert(shoppingItems)
    .values({
      id: crypto.randomUUID(),
      userId,
      todo,
      changedOn: Date.now(),
    })
    .returning();

  return item;
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
