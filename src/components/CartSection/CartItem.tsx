import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export interface CartItemCard {
  name: string;
  color: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
}

function CartItem({
  cartItem: { name, color, size, price, image, quantity },
  onIncrement,
  onDecrement,
  onDelete,
}: {
  cartItem: CartItemCard;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="flex justify-between gap-1 p-1 shadow">
      <img src={image} alt={name} className="aspect-square h-30 rounded-lg" />
      <div className="flex grow flex-col items-center justify-between gap-0.5 sm:flex-row">
        <div className="flex w-full grow-3 gap-4">
          <div>
            <h3 className="font-bold">{name}</h3>
            <h4>£{price}</h4>
          </div>
          <div className="text-muted-foreground">
            <p>{color}</p>
            <p>{size}</p>
          </div>
        </div>
        <div className="flex w-full grow items-center justify-between">
          <div className="flex">
            <Button
              size={"icon"}
              variant={"secondary"}
              onClick={onDecrement}
              disabled={quantity <= 1}
            >
              <Minus />
            </Button>
            <input
              type="number"
              value={quantity}
              min="1"
              readOnly
              className="w-10 text-center"
            />
            <Button size={"icon"} variant={"secondary"} onClick={onIncrement}>
              <Plus />
            </Button>
          </div>

          <div className="grow text-center font-bold">£{price * quantity}</div>

          <Button onClick={onDelete}>
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
