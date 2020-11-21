import * as Yup from "yup";

export async function handleSubmit(
  data,
  getVariables,
  mutation,
  formRef,
  schema
) {
  try {
    formRef.current.setErrors({});

    await schema.validate(data, {
      abortEarly: false,
    });

    mutation({ variables: getVariables(data) });
  } catch (err) {
    const validationError = {};

    if (err instanceof Yup.ValidationError) {
      err.inner.forEach((error) => {
        validationError[error.path] = error.message || "Please enter a value";
      });
      formRef.current.setErrors(validationError);
    }
  }
}
