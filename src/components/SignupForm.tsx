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
import { signup } from "@/lib/db";
import { useState } from "react";

const SignUpSchema = v.pipe(
  v.object({
    name: v.pipe(
      v.string(),
      v.nonEmpty("You must enter a name."),
      v.minLength(3, "You name must have 3 characters or more."),
    ),
    username: v.pipe(
      v.string(),
      v.nonEmpty("You must enter a username."),
      v.minLength(3, "Your username must have 3 characters or more."),
    ),
    password: v.pipe(
      v.string(),
      v.nonEmpty("You must enter a password."),
      v.minLength(8, "Your password must have 8 characters or more."),
    ),
    confirmPassword: v.string(),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      ({ password, confirmPassword }) => {
        return password === confirmPassword;
      },
      "This field must be identical to your password field.",
    ),
    ["confirmPassword"],
  ),
);

function SignUpForm() {
  const [error, setError] = useState("");
  const signUpForm = useForm({
    schema: SignUpSchema,
  });
  const handleSubmit: SubmitHandler<typeof SignUpSchema> = async ({
    username,
    password,
  }) => {
    const response = await signup(username, password);
    if (!response.success) {
      setError(response.message);
      return;
    }
    window.location.pathname = "/login";
  };
  return (
    <div className="wrapper">
      <Form of={signUpForm} onSubmit={handleSubmit}>
        <FieldGroup>
          <FormishField of={signUpForm} path={["name"]}>
            {(field) => (
              <Field data-invalid={field.errors !== null}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  {...field.props}
                  id="name"
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
          <FormishField of={signUpForm} path={["username"]}>
            {(field) => (
              <Field data-invalid={field.errors !== null}>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  {...field.props}
                  id="username"
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
          </FormishField>{" "}
          <FormishField of={signUpForm} path={["password"]}>
            {(field) => (
              <Field data-invalid={field.errors !== null}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...field.props}
                  id="password"
                  type="password"
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
          <FormishField of={signUpForm} path={["confirmPassword"]}>
            {(field) => (
              <Field data-invalid={field.errors !== null}>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm password
                </FieldLabel>
                <Input
                  {...field.props}
                  id="confirmPassword"
                  type="password"
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
            <Button
              type="submit"
              className={
                "bg-primary-foreground text-primary hover:text-primary-foreground"
              }
              disabled={signUpForm.isSubmitting}
            >
              Submit
            </Button>
            {error && <FieldError errors={[{ message: error }]} />}
          </Field>
        </FieldGroup>
      </Form>
    </div>
  );
}

export default SignUpForm;
