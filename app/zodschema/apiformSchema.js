import { z } from "zod";

export const apiformSchema = z.object({
  api_name: z
    .string()
    .min(2, {
      message: "API Name is required",
    })
    .trim(),
  isactive: z.boolean(),
  isplanapi: z.boolean(),
  host: z.string().url({ message: "Enter a valid url" }).trim(),
  param1: z.string().trim().optional(),
  param2: z.string().trim().optional(),
  param3: z.string().trim().optional(),
  param4: z.string().trim().optional(),
  param5: z.string().trim().optional(),
  param6: z.string().trim().optional(),
  param7: z.string().trim().optional(),
  prepaidApiMethod: z.string(),
  prepaidApi: z.string(),
  dthApiMethod: z.string(),
  dthApi: z.string(),
  balanceApiMethod: z.string(),
  balanceApi: z.string(),
  balancecheckResponse: z.string(),
  RcResponseMethod: z.string(),
  RcResponseStatus: z.string(),
  RcResponseOpid: z.string(),
  RcResponseApirefid: z.string(),
  RcResponsebalance: z.string(),
  RcResponseSuccess: z.string(),
  RcResponseFailure: z.string(),
  RcResponsePending: z.string(),
  RcResponseRemark: z.string(),
  CbResponseReqid: z.string(),
  CbResponseStatus: z.string(),
  CbResponseOpid: z.string(),
  CbResponseApirefid: z.string(),
  CbResponsebalance: z.string(),
  CbResponseSuccess: z.string(),
  CbResponseFailure: z.string(),
  CbResponsePending: z.string(),
  CbResponseRemark: z.string(),
  operator: z
    .object({
      opname: z.string(),
      opcode: z.string(),
      opparam1: z.string().optional(),
      opparam2: z.string().optional(),
      opparam3: z.string().optional(),
      opparam4: z.string().optional(),
      opparam5: z.string().optional(),
      limit: z.string().optional(),
    })
    .array()
    .optional(),
});
