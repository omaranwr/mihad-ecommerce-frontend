import { Card, CardContent } from "@/components/ui/card";

interface Props {
  price: number;
  originalPrice?: number;
  name: string;
}

const Product = ({ price, originalPrice, name }: Props) => {
  return (
    <Card className="group/product">
      <CardContent>
        <div className="relative aspect-3/4 w-full overflow-hidden rounded">
          <div className="absolute inset-0 z-1 bg-red-600 transition-opacity duration-250 group-hover/product:opacity-0"></div>
          <div className="absolute inset-0 bg-gray-600"></div>
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
