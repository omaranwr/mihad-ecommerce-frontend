import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as v from "valibot";
import {
  Field as FormishField,
  Form,
  useForm,
  type SubmitHandler,
} from "@formisch/react";
import { useState } from "react";
import { actions } from "astro:actions";
import type { CartItemCard } from "./CartItem";

const CheckoutSchema = v.object({
  fullName: v.pipe(v.string(), v.nonEmpty("Please enter your Name.")),
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email."),
    v.email("This must be a valid email."),
  ),
  phone: v.pipe(v.string(), v.nonEmpty("Please enter your phone number.")),
  address: v.pipe(v.string(), v.nonEmpty("Please enter your address.")),
  city: v.pipe(v.string(), v.nonEmpty("Please enter your city name.")),
});

function CheckoutForm({
  cartItems,
  setCheckError,
}: {
  cartItems: Array<CartItemCard & { id: number }>;
  setCheckError: (props: { title: string; message: string }) => void;
}) {
  const [error, setError] = useState("");
  const loginForm = useForm({
    schema: CheckoutSchema,
  });
  const handleSubmit: SubmitHandler<typeof CheckoutSchema> = async (values) => {
    const checkCartResponse = await actions.checkCart({
      cartItems,
    });
    if (!checkCartResponse.data) {
      setCheckError({
        title: "Cart out of sync.",
        message: "Try refreshing the page.",
      });
      return;
    }
    const response = await actions.checkout(values);
    if (response.error) {
      setError(response.error.message);
      return;
    }
    window.location.pathname = "/purchased";
  };
  return (
    <div className="wrapper">
      <Form of={loginForm} onSubmit={handleSubmit} method="POST">
        <FieldGroup>
          <FormishField of={loginForm} path={["fullName"]}>
            {(field) => (
              <Field data-invalid={field.errors !== null}>
                <FieldLabel htmlFor="fullName">Full name</FieldLabel>
                <Input
                  {...field.props}
                  id="fullName"
                  value={field.input}
                  aria-invalid={field.errors !== null}
                />
                {field.errors && (
                  <FieldError
                    errors={field.errors.map((message) => ({ message }))}
                  />
                )}
              </Field>
            )}
          </FormishField>

          <FormishField of={loginForm} path={["email"]}>
            {(field) => (
              <Field data-invalid={field.errors !== null}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field.props}
                  id="email"
                  type="email"
                  value={field.input}
                  aria-invalid={field.errors !== null}
                />
                {field.errors && (
                  <FieldError
                    errors={field.errors.map((message) => ({ message }))}
                  />
                )}
              </Field>
            )}
          </FormishField>

          <FormishField of={loginForm} path={["phone"]}>
            {(field) => (
              <Field data-invalid={field.errors !== null}>
                <FieldLabel htmlFor="phone">Phone number</FieldLabel>
                <Input
                  {...field.props}
                  id="phone"
                  type={"tel"}
                  value={field.input}
                  aria-invalid={field.errors !== null}
                />
                {field.errors && (
                  <FieldError
                    errors={field.errors.map((message) => ({ message }))}
                  />
                )}
              </Field>
            )}
          </FormishField>

          <FormishField of={loginForm} path={["address"]}>
            {(field) => (
              <Field data-invalid={field.errors !== null}>
                <FieldLabel htmlFor="address">Address</FieldLabel>
                <Input
                  {...field.props}
                  id="address"
                  value={field.input}
                  aria-invalid={field.errors !== null}
                />
                {field.errors && (
                  <FieldError
                    errors={field.errors.map((message) => ({ message }))}
                  />
                )}
              </Field>
            )}
          </FormishField>

          <FormishField of={loginForm} path={["city"]}>
            {(field) => (
              <Field data-invalid={field.errors !== null}>
                <FieldLabel htmlFor="city">City</FieldLabel>
                <Input
                  {...field.props}
                  id="city"
                  value={field.input}
                  aria-invalid={field.errors !== null}
                />
                {field.errors && (
                  <FieldError
                    errors={field.errors.map((message) => ({ message }))}
                  />
                )}
              </Field>
            )}
          </FormishField>

          <Field>
            <Button type="submit" disabled={loginForm.isSubmitting}>
              Order now
            </Button>
            {error && <FieldError errors={[{ message: error }]} />}
          </Field>
        </FieldGroup>
      </Form>
    </div>
  );
}

export default CheckoutForm;
