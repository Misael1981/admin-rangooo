import { AreaType, PlanType } from "@prisma/client";
import z from "zod";

// export const plansSchema = z.object({
//   plan: z.enum(PlanType, {
//     message: "Selecione um plano válido",
//   }),
//   useRangoooDelivery: z.boolean(),
//   customDeliveryFee: z.number().min(0, {
//     message: "A taxa de entrega personalizada deve ser um número positivo",
//   }),
// });

export const plansSchema = z.object({
  plan: z.enum(PlanType, {
    message: "Selecione um plano válido",
  }),
  useRangoooDelivery: z.boolean(),
  deliveryFees: z.array(
    z.object({
      areaType: z.enum(AreaType),
      fee: z.number().min(0),
    }),
  ),
});
