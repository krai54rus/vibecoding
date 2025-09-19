<template>
  <form @submit.prevent="handleSubmit(onSubmit)">
    <div>
      <label for="name">Name</label>
      <Field name="name" as="input" id="name" />
      <ErrorMessage name="name" />
    </div>
    <div>
      <label for="description">Description</label>
      <Field name="description" v-slot="{ field, meta, errors }">
        <MonacoEditor v-model="field.value" language="html" />
        <span v-if="errors.length" class="error">{{ errors[0] }}</span>
      </Field>
    </div>
    <div>
      <label for="comment">Comment</label>
      <Field name="comment" as="input" id="comment" />
      <ErrorMessage name="comment" />
    </div>
    <div>
      <label> <Field name="active" type="checkbox" /> Active </label>
      <ErrorMessage name="active" />
    </div>
    <div>
      <label for="password">Password</label>
      <Field name="password" as="input" type="password" id="password" />
      <ErrorMessage name="password" />
    </div>
    <div>
      <label for="passwordConfirmation">Confirm Password</label>
      <Field
        name="passwordConfirmation"
        as="input"
        type="password"
        id="passwordConfirmation"
      />
      <ErrorMessage name="passwordConfirmation" />
    </div>
    <button type="submit" :disabled="!meta.valid">Create Note</button>
  </form>
</template>

<script setup lang="ts">
import { Field, ErrorMessage, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import MonacoEditor from "./MonacoEditor.vue";

const schema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    comment: z.string().min(2, "Comment must be at least 2 characters"),
    active: z.boolean(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirmation: z
      .string()
      .min(6, "Password confirmation must be at least 6 characters"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

const { handleSubmit, meta } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: "",
    description: "",
    comment: "",
    active: false,
    password: "",
    passwordConfirmation: "",
  },
});

function onSubmit(values: {
  name: string;
  description: string;
  comment: string;
  active: boolean;
  password: string;
  passwordConfirmation: string;
}) {
  // Simulate sending data to backend
  alert(
    `Sending to backend:\nName: ${values.name}\nDescription: ${values.description}\nComment: ${values.comment}\nActive: ${values.active}\nPassword: ${values.password}\nPasswordConfirmation: ${values.passwordConfirmation}`
  );
  // Here you would typically use fetch/axios to send data to your backend
  // e.g. await axios.post('/api/notes', values)
}
</script>

<style scoped>
form {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
label {
  font-weight: 500;
}
input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background: #a5b4fc;
  cursor: not-allowed;
}
button:hover:enabled {
  background: #2563eb;
}
.error {
  color: #dc2626;
  font-size: 0.9em;
}
</style>
