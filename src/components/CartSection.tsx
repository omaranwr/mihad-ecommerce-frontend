import CartItem, { type CartItemCard } from "@/components/CartSection/CartItem";
import { useOptimistic, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { actions } from "astro:actions";
import { Spinner } from "./ui/spinner";

function CartSection({
  initalItems,
}: {
  initalItems: Array<CartItemCard & { id: number }>;
}) {
  const [cartItems, setCartItems] = useState(initalItems);
  const [optimisticCartItems, setOptimisticCartItems] =
    useOptimistic(cartItems);

  const [isPending, startTransition] = useTransition();

  const totalPrice = optimisticCartItems.reduce(
    (total, { price, quantity }) => {
      total += price * quantity;
      return total;
    },
    0,
  );

  return (
    <section className="wrapper grid gap-1 xl:grid-cols-[3fr_1fr]">
      <div className="flex flex-col gap-1">
        {optimisticCartItems.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            onIncrement={() => {
              const increment = (c: typeof cartItems) => {
                const result = c.map((item) => {
                  if (item.id !== cartItem.id) return item;
                  return { ...item, quantity: item.quantity + 1 };
                });
                return result;
              };
              startTransition(async () => {
                setOptimisticCartItems(increment(optimisticCartItems));
                const response = await actions.updateCartItem({
                  id: cartItem.id,
                  quantity: cartItem.quantity + 1,
                });
                if (response.error) return;
                setCartItems(increment);
              });
            }}
            onDecrement={() => {
              const decrement = (c: typeof cartItems) => {
                const result = c.map((item) => {
                  if (item.id !== cartItem.id) return item;
                  return { ...item, quantity: Math.max(item.quantity - 1, 1) };
                });
                return result;
              };
              startTransition(async () => {
                setOptimisticCartItems(decrement(optimisticCartItems));
                const response = await actions.updateCartItem({
                  id: cartItem.id,
                  quantity: Math.max(cartItem.quantity - 1, 1),
                });
                if (response.error) return;
                setCartItems(decrement);
              });
            }}
            onDelete={() => {
              const remove = (c: typeof cartItems) => {
                const result = c.filter((item) => item.id !== cartItem.id);
                return result;
              };
              startTransition(async () => {
                setOptimisticCartItems(remove(optimisticCartItems));
                const response = await actions.deleteCartItem({
                  id: cartItem.id,
                });
                if (response.error) return;
                setCartItems(remove);
              });
            }}
          />
        ))}
      </div>

      <aside className="summary">
        <h2>ملخص الطلب</h2>

        <div className="coupon">
          <input type="text" placeholder="كود الخصم" />
          <button>تطبيق</button>
        </div>

        <div className="summary-row">
          <span>المجموع</span>
          <span id="subtotal">£{totalPrice}</span>
        </div>
        <div className="summary-row">
          <span>الشحن</span>
          <span>£</span>
        </div>
        <div className="summary-row total">
          <span>الإجمالي</span>
          <span id="total">£{totalPrice}</span>
        </div>

        <Button className={"w-full"} disabled={isPending}>
          {isPending ? (
            <>
              Loading <Spinner />
            </>
          ) : (
            "Order Now"
          )}
        </Button>
      </aside>
    </section>
  );
}

export default CartSection;
