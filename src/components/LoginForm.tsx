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
import { login } from "@/lib/db";

const LoginSchema = v.object({
  username: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your username."),
    v.minLength(3, "Your username mast have 3 characters or more."),
  ),
  password: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your password."),
    v.minLength(8, "Your password must have 8 characters or more."),
  ),
});

function LoginForm() {
  const loginForm = useForm({
    schema: LoginSchema,
  });
  const handleSubmit: SubmitHandler<typeof LoginSchema> = async ({
    username,
    password,
  }) => {
    await login(username, password);
  };
  return (
    <div className="wrapper">
      <Form of={loginForm} onSubmit={handleSubmit}>
        <FieldGroup>
          <FormishField of={loginForm} path={["username"]}>
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
          </FormishField>
          <FormishField of={loginForm} path={["password"]}>
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

          <Button type="submit" disabled={loginForm.isSubmitting}>
            Submit
          </Button>
        </FieldGroup>
      </Form>
    </div>
  );
}

export default LoginForm;
