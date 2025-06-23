import { z } from "zod";

export const operator = z.object({
  logo: z.any().optional(),
  name: z
    .string()
    .trim()
    .min(2, { message: "Name should be atleast two character long" }),
  opcode: z.string().min(1, { message: "opcode is Required" }).trim(),
  isfetchbill: z.boolean(),
  mobilelabel: z.string().trim(),
  mobilelength: z.string().trim(),
  amountlabel: z.string().trim(),
  amountlength: z.string().trim(),
  providertype: z.string().trim(),
  api1: z.string(),
  api2: z.string(),
  planapi: z.string(),
  isactive: z.boolean(),
  denomination: z.string().optional(),
});
