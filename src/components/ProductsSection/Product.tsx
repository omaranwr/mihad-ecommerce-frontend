import { Card, CardContent } from "@/components/ui/card";
import type { ProductCard } from "@/lib/types";

interface Props extends ProductCard {
  originalPrice?: number | null;
}

const Product = ({ price, originalPrice, name, image }: Props) => {
  return (
    <Card className="group/product">
      <CardContent>
        <div className="relative aspect-3/4 w-full overflow-hidden rounded">
          <div className="absolute inset-0 z-1 bg-red-600 transition-opacity duration-250 group-hover/product:opacity-0"></div>
          {image && (
            <img
              className="absolute inset-0 h-full w-full bg-gray-600 object-cover"
              src={image}
              alt={name}
            />
          )}
        </div>
        <h2 className="pt-3 pb-2 text-2xl">{name}</h2>
        <h3 className="text-xl">
          {originalPrice && (
            <span className="pe-2 text-sm line-through">£{originalPrice}</span>
          )}
          £{price}
        </h3>
      </CardContent>
    </Card>
  );
};

export default Product;
