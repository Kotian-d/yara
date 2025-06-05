import { z } from "zod";

export const LoginSchema = z.object({
  mobile: z
    .string()
    .min(10, { message: "Mobile number should be 10 digit" })
    .trim(),
  password: z
    .string()
    .min(8, {
      message: "Password should be atleast of 8 characters",
    })
    .trim(),
});

export const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .trim()
      .optional(),
    email: z
      .string()
      .min(5, { message: "Enter a valid Email" })
      .email({ message: "Invalid email address" })
      .trim()
      .toLowerCase(),
    mobile: z
      .string()
      .min(10, {
        message: "mobile number must be atleast 10 characters long",
      })
      .regex(new RegExp("^[0-9]+$"), {
        message: "Enter a valid Number",
      }),
    password: z
      .string()
      .min(8, {
        message: "Password should be atleast of 8 characters",
      })
      .trim()
      .optional(),
      confirm: z
      .string()
      .min(8, {
        message: "ConfirmPassword should be atleast of 8 characters",
      })
      .trim()
      .optional(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Password and confirm password doesn't match",
    path: ["confirmPassword"],
  });
