import { useState } from "react";
import ProductImagesCarousel from "./ProductPage/ProductImagesCarousel";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./ui/field";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { AlertCircleIcon, ShoppingBag } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { actions } from "astro:actions";
import { Alert, AlertTitle } from "./ui/alert";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";

function ProductPage({
  id,
  name,
  description,
  price,
  images,
  colors,
  sizes,
}: {
  id: number;
  name: string;
  description: string;
  price: string | number;
  images: { src: string; alt: string; color: number }[];
  colors: { id: number; name: string }[];
  sizes: { id: number; name: string }[];
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0].id);
  const [selectedSize, setSelectedSize] = useState(sizes[0].id);
  return (
    <>
      <div className="wrapper grid gap-10 sm:grid-cols-[auto_1fr]">
        <div>
          <div className="sm:sticky sm:top-25">
            <ProductImagesCarousel
              images={images.filter((image) => image.color === selectedColor)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-heading sticky top-0 pb-3 text-3xl">{name}</h1>
            <div className="pb-5 text-xl">£{price}</div>
            <p>{description}</p>
          </div>
          <form
            className="contents"
            onSubmit={async (e) => {
              e.preventDefault();
              setError("");
              setIsSubmitting(true);

              const response = await actions.addItemToCart({
                product_id: id,
                color_id: selectedColor,
                size_id: selectedSize,
              });
              if (response.error) {
                setError(response.error.message);
                toast.error("Something went wrong.");
              } else toast.success("Item added successfully.");

              setIsSubmitting(false);
            }}
          >
            <FieldSet>
              <FieldLegend>Color: </FieldLegend>
              <RadioGroup
                defaultValue={colors[0].id}
                value={selectedColor}
                onValueChange={setSelectedColor}
              >
                {colors.map((color) => (
                  <FieldLabel key={color.id} htmlFor={color.name}>
                    <Field orientation={"horizontal"}>
                      <FieldContent>{color.name}</FieldContent>
                      <RadioGroupItem value={color.id} id={color.name} />
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
            </FieldSet>
            <FieldSet>
              <FieldLegend>Size: </FieldLegend>
              <RadioGroup
                defaultValue={sizes[0].id}
                value={selectedSize}
                onValueChange={setSelectedSize}
              >
                {sizes.map((size) => (
                  <FieldLabel key={size.id} htmlFor={size.name}>
                    <Field orientation={"horizontal"}>
                      <FieldContent>{size.name}</FieldContent>
                      <RadioGroupItem value={size.id} id={size.name} />
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
            </FieldSet>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  Loading <Spinner />
                </>
              ) : (
                <>
                  Add to cart <ShoppingBag />
                </>
              )}
            </Button>
            {error && (
              <Alert variant={"destructive"} className="">
                <AlertCircleIcon />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default ProductPage;
