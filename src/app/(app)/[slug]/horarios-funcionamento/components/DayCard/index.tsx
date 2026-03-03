import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { BusinessHoursFormData } from "@/schemas/establishments-schemas";
import { Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { Control } from "react-hook-form";

type DayCardProps = {
  dayIndex: number;
  control: Control<BusinessHoursFormData>;
};

const days = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const DayCard = ({ dayIndex, control }: DayCardProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `businessHours.${dayIndex}.timeSlots`,
  });

  const isClosed = useWatch({
    control,
    name: `businessHours.${dayIndex}.isClosed`,
  });

  return (
    <div
      className={`rounded-xl border p-4 space-y-4 shadow-lg transition-all ${
        isClosed ? "bg-muted/20 opacity-60" : "bg-card"
      }`}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-sm">{days[dayIndex]}</h4>

        <Controller
          name={`businessHours.${dayIndex}.isClosed`}
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {field.value ? "Fechado" : "Aberto"}
              </span>
              <Switch
                checked={!field.value}
                onCheckedChange={(checked) => field.onChange(!checked)}
              />
            </div>
          )}
        />
      </div>

      {!isClosed && (
        <>
          {fields.map((field, slotIndex) => (
            <div
              key={field.id}
              className="grid grid-cols-[1fr_auto_1fr_auto] gap-2 items-center"
            >
              {/* Input de Horário com seu padrão Controller */}
              <Controller
                name={`businessHours.${dayIndex}.timeSlots.${slotIndex}.open`}
                control={control}
                render={({ field, fieldState }) => (
                  <div className="w-full">
                    <Input
                      type="time"
                      {...field}
                      data-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <span className="text-red-500 text-xs">Erro</span>
                    )}
                  </div>
                )}
              />

              <span className="text-muted-foreground text-sm">até</span>

              <Controller
                name={`businessHours.${dayIndex}.timeSlots.${slotIndex}.close`}
                control={control}
                render={({ field, fieldState }) => (
                  <div className="w-full">
                    <Input
                      type="time"
                      {...field}
                      data-invalid={fieldState.invalid}
                    />
                  </div>
                )}
              />

              <Button
                type="button"
                variant="ghost"
                className="text-red-500"
                onClick={() => remove(slotIndex)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-fit"
            onClick={() => append({ open: "", close: "" })}
          >
            <Plus className="w-4 h-4 mr-2" /> Adicionar Período
          </Button>
        </>
      )}
    </div>
  );
};

export default DayCard;
