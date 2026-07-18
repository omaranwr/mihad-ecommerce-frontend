import CartItem, { type CartItemCard } from "@/components/CartSection/CartItem";
import { useOptimistic, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { actions } from "astro:actions";
import { Spinner } from "./ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircleIcon } from "lucide-react";

function CartSection({
  initalItems,
  shippingFees = 0,
}: {
  initalItems: Array<CartItemCard & { id: number }>;
  shippingFees?: number;
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

  const [error, setError] = useState<{ title: string; message: string } | null>(
    null,
  );

  return (
    <section className="wrapper grid gap-1 xl:grid-cols-[3fr_auto]">
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

      <aside className="px-10 pt-10">
        {/* <div className="coupon">
          <input type="text" placeholder="كود الخصم" />
          <button>تطبيق</button>
        </div> */}

        {shippingFees !== 0 && (
          <>
            <div>net total: £{totalPrice}</div>
            <div className="text-sm">shipping: £{shippingFees}</div>
          </>
        )}
        <div className="py-2 text-2xl">
          total:
          <span className="ps-1 text-4xl font-bold">
            £{totalPrice + shippingFees}
          </span>
        </div>

        <Button
          className={"font-bold"}
          disabled={isPending}
          size={"lg"}
          onClick={() => {
            startTransition(async () => {
              const response = await actions.checkCart({
                cartItems: optimisticCartItems,
              });
              if (!response.data)
                setError({
                  title: "Cart out of sync.",
                  message: "Try refreshing the page.",
                });
            });
          }}
        >
          {isPending ? (
            <>
              Loading <Spinner />
            </>
          ) : (
            "Order Now"
          )}
        </Button>
        {error && (
          <>
            <div className="py-2" />
            <Alert variant={"destructive"} className="">
              <AlertCircleIcon />
              <AlertTitle>{error.title}</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          </>
        )}
      </aside>
    </section>
  );
}

export default CartSection;
