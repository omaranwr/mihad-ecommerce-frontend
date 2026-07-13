import { Card, CardContent } from "@/components/ui/card";

export interface ProductCard {
  name: string;
  price: number;
  backImage: string | null;
  frontImage: string | null;
  originalPrice?: number | null;
}

const Product = ({
  price,
  originalPrice,
  name,
  backImage,
  frontImage,
}: ProductCard) => {
  return (
    <Card className="group/product">
      <CardContent>
        <div className="relative aspect-3/4 w-full overflow-hidden rounded">
          {frontImage && (
            <img
              className="absolute inset-0 z-1 h-full w-full bg-red-600 object-cover transition-opacity duration-250 group-hover/product:opacity-0"
              src={frontImage}
              aria-hidden
            />
          )}
          {(backImage || frontImage) && (
            <img
              className="absolute inset-0 h-full w-full bg-gray-600 object-cover"
              src={backImage ? backImage : frontImage!}
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
