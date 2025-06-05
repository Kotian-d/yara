import { z } from "zod";

export const smsformschema = z.object({
  textsmsapi: z.string().trim().optional(),
  whatsappapi: z.string().trim().optional(),
  registrationtemplate: z.string().trim().optional(),
  registrationtemplateid: z.string().trim().optional(),
  balancetransfertemplate: z.string().trim().optional(),
  balancetransfertemplateid: z.string().trim().optional(),
  balancerecievedtemplate: z.string().trim().optional(),
  balancerecievedtemplateid: z.string().trim().optional(),
  balancereversetemplate: z.string().trim().optional(),
  balancereversetemplateid: z.string().trim().optional(),
});
