"use client";

import { Control, Controller } from "react-hook-form";
import { AreaType } from "@prisma/client";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldDescription,
} from "@/components/ui/field";

const AREAS = [
  {
    id: AreaType.URBAN,
    label: "Área Urbana",
    desc: "Centro e bairros próximos",
  },
  {
    id: AreaType.DISTRICT,
    label: "Distritos",
    desc: "Vilas e bairros afastados",
  },
  {
    id: AreaType.RURAL,
    label: "Área Rural",
    desc: "Sítios, fazendas e chácaras",
  },
];

interface DeliveryFeesFieldsProps {
  control: Control<{ deliveryFees: Record<AreaType, number> }>;
}

export const DeliveryFeesFields = ({ control }: DeliveryFeesFieldsProps) => {
  return (
    <div className="space-y-4 pt-4 border-t">
      <h4 className="font-semibold text-sm">Taxas de Entrega por Região</h4>
      <p className="text-xs text-muted-foreground">
        Defina o valor que o cliente pagará dependendo da localização.
      </p>

      <FieldGroup className="grid gap-4 sm:grid-cols-3">
        {AREAS.map((area) => (
          <Field key={area.id}>
            <FieldLabel className="text-xs">{area.label}</FieldLabel>
            <Controller
              name={`deliveryFees.${area.id}`}
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                    R$
                  </span>
                  <Input
                    {...field}
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    className="pl-8"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </div>
              )}
            />
            <FieldDescription className="text-[10px]">
              {area.desc}
            </FieldDescription>
          </Field>
        ))}
      </FieldGroup>
    </div>
  );
};
