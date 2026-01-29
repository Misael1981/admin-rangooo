"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  CONSUMPTION_METHODS,
  PAYMENT_METHODS,
  type ConsumptionMethodValue,
  type PaymentMethodValue,
} from "@/helpers/methods-restaurant-options";
import { Input } from "@/components/ui/input";
import { updateRestaurantMethods } from "@/app/_actions/update-restaurant-methods";

// 1. Ajuste do Schema para aceitar apenas os valores dos helpers
const methodsSchema = z
  .object({
    consumptionMethods: z.array(
      z.enum(["DINE_IN", "PICKUP", "DELIVERY"] as const),
    ),
    paymentMethods: z.array(
      z.enum(["CASH", "PIX", "CREDIT_CARD", "DEBIT_CARD"] as const),
    ),
    deliveryFee: z.coerce
      .number()
      .min(0)
      .optional()
      .transform((v) => (Number.isNaN(v) ? undefined : v)),
  })
  .refine(
    (data) =>
      !data.consumptionMethods.includes("DELIVERY") ||
      (data.deliveryFee ?? 0) > 0,
    {
      message: "Informe o valor do frete para entrega",
      path: ["deliveryFee"],
    },
  );

type MethodsFormData = z.infer<typeof methodsSchema>;

interface ConsumptionAndPaymentMethodsFormProps {
  initialConsumptionMethods: ConsumptionMethodValue[];
  initialPaymentMethods: PaymentMethodValue[];
  restaurantId: string;
  deliveryFee: number;
}

const ConsumptionAndPaymentMethodsForm = ({
  initialConsumptionMethods,
  initialPaymentMethods,
  restaurantId,
  deliveryFee,
}: ConsumptionAndPaymentMethodsFormProps) => {
  const form = useForm({
    resolver: zodResolver(methodsSchema),
    defaultValues: {
      consumptionMethods: initialConsumptionMethods,
      paymentMethods: initialPaymentMethods,
      deliveryFee,
    },
  });

  const onSubmit = async (data: MethodsFormData) => {
    try {
      const result = await updateRestaurantMethods({
        ...data,
        restaurantId,
      });

      if (result.success) {
        toast.success("Configurações atualizadas com sucesso!");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Erro crítico ao salvar.");
      console.error(error);
    }
  };

  return (
    <section className="w-full ">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-2xl border border-gray-300">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FieldGroup className="flex flex-col gap-8 md:flex-row justify-center">
            {/* SEÇÃO: MÉTODOS DE CONSUMO */}
            <FieldSet className="w-full max-w-xs">
              <FieldLegend variant="label" className="text-lg font-bold">
                Métodos de consumo
              </FieldLegend>
              <FieldDescription className="mb-4">
                Quais métodos estarão ativos hoje?
              </FieldDescription>
              <Controller
                name="consumptionMethods"
                control={form.control}
                render={({ field }) => (
                  <FieldGroup className="gap-3">
                    {CONSUMPTION_METHODS.map((method) => (
                      <Field
                        orientation="horizontal"
                        key={method.value}
                        className="items-center gap-3"
                      >
                        <Checkbox
                          className="border border-gray-300"
                          id={`consume-${method.value}`}
                          checked={field.value?.includes(method.value)}
                          onCheckedChange={(checked) => {
                            const value = method.value;
                            const updatedValue = checked
                              ? [...field.value, value]
                              : field.value.filter((v) => v !== value);
                            field.onChange(updatedValue);
                          }}
                        />
                        <FieldLabel
                          htmlFor={`consume-${method.value}`}
                          className="font-normal cursor-pointer"
                        >
                          {method.label}
                        </FieldLabel>
                      </Field>
                    ))}
                    {field.value.includes("DELIVERY") && (
                      <Field>
                        <FieldLabel>Valor da entrega</FieldLabel>

                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            R$
                          </span>

                          <Input
                            type="number"
                            step="0.01"
                            className="pl-10 border border-gray-300"
                            {...form.register("deliveryFee", {
                              valueAsNumber: true,
                            })}
                          />
                        </div>
                      </Field>
                    )}
                  </FieldGroup>
                )}
              />
            </FieldSet>
            {/* SEÇÃO: MÉTODOS DE PAGAMENTO */}
            <FieldSet className="w-full max-w-xs">
              <FieldLegend variant="label" className="text-lg font-bold">
                Métodos de pagamento
              </FieldLegend>
              <FieldDescription className="mb-4">
                Quais formas de pagamento aceitar?
              </FieldDescription>
              <Controller
                name="paymentMethods"
                control={form.control}
                render={({ field }) => (
                  <FieldGroup className="gap-3">
                    {PAYMENT_METHODS.map((method) => (
                      <Field
                        orientation="horizontal"
                        key={method.value}
                        className="items-center gap-3"
                      >
                        <Checkbox
                          className="border border-gray-300"
                          id={`pay-${method.value}`}
                          checked={field.value?.includes(method.value)}
                          onCheckedChange={(checked) => {
                            const value = method.value;
                            const updatedValue = checked
                              ? [...field.value, value]
                              : field.value.filter((v) => v !== value);
                            field.onChange(updatedValue);
                          }}
                        />
                        <FieldLabel
                          htmlFor={`pay-${method.value}`}
                          className="font-normal cursor-pointer"
                        >
                          {method.label}
                        </FieldLabel>
                      </Field>
                    ))}
                  </FieldGroup>
                )}
              />
            </FieldSet>
          </FieldGroup>
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              className="w-full max-w-md"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Salvando..."
                : "Salvar Configurações"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ConsumptionAndPaymentMethodsForm;
