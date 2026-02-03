"use client";

import { upsertProduct } from "@/app/_actions/menu/upsert-product";
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MenuProductWithCategoryDTO } from "@/dtos/menu.dto";
import {
  formatCurrencyBRL,
  parseCurrencyBRL,
} from "@/helpers/formatCurrencyTwo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type DialogAddProductProps = {
  product: MenuProductWithCategoryDTO | null;
  slug: string;
  dialogAddProductOpen: boolean;
  setDialogAddProductOpen: (open: boolean) => void;
  selectedCategoryName: string;
  selectedCategoryId: string;
};

const productSchema = z.object({
  imageUrl: z.any().refine((val) => val, "Imagem é obrigatória"),
  name: z.string().min(1, "Nome é obrigatório"),

  price: z.string().min(1, "Preço é obrigatório"),
  ingredients: z
    .string()
    .min(3, "Descreva ao menos um ingrediente")
    .optional()
    .or(z.literal("")),
  description: z.string().nullable().optional(),
});

const DialogAddProduct = ({
  dialogAddProductOpen,
  setDialogAddProductOpen,
  product,
  slug,
  selectedCategoryName,
  selectedCategoryId,
}: DialogAddProductProps) => {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: product?.price
        ? formatCurrencyBRL(String(product.price * 100))
        : "",
      ingredients: product?.ingredients ? product.ingredients.join(", ") : "",
      description: product?.description || null,
      imageUrl: null,
    },
  });

  const price = useWatch({
    control: form.control,
    name: "price",
  });

  useEffect(() => {
    if (product) {
      form.reset({
        ingredients: product.ingredients.join(", "),
      });
    }
  }, [product, form]);

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    try {
      const payload = {
        id: product?.id, // Se o product veio via props, o ID vai aqui
        name: data.name,
        price: parseCurrencyBRL(data.price),
        description: data.description,
        imageUrl: data.imageUrl,
        ingredients: data.ingredients
          ? data.ingredients
              .split(",")
              .map((i) => i.trim())
              .filter(Boolean)
          : [],
        menuCategoryId: selectedCategoryId,
        slug: slug,
      };

      const result = await upsertProduct(payload);

      if (result.success) {
        toast.success(product ? "Produto atualizado!" : "Produto criado!");
        setDialogAddProductOpen(false);
        form.reset();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Algo deu errado.");
      console.error("Erro ao submeter o formulário:", error);
    }
  };

  return (
    <Dialog open={dialogAddProductOpen} onOpenChange={setDialogAddProductOpen}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogContent className="sm:max-w-md w-full">
          <DialogHeader>
            <DialogTitle>
              Produto da
              <span className="text-primary">
                {" "}
                Tabela {selectedCategoryName}
              </span>
            </DialogTitle>
            <DialogDescription>
              Adicione ou edite produtos da tabela
            </DialogDescription>
          </DialogHeader>
          <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4 pb-16">
            <FieldGroup>
              <div className="space-y-2">
                <FieldLabel>Imagem do Produto</FieldLabel>
                <ImageUpload
                  name="imageUrl"
                  form={form}
                  initialUrl={product?.imageUrl}
                />
              </div>
              <div className="flex gap-2">
                <Field className="w-2/3">
                  <Label htmlFor="name-1">Nome</Label>
                  <Input id="name-1" name="name" defaultValue={product?.name} />
                </Field>
                <Field className="w-1/3">
                  <Label htmlFor="price">Preço</Label>
                  <Input
                    id="price"
                    type="text"
                    inputMode="numeric"
                    value={price ?? ""}
                    onChange={(e) =>
                      form.setValue("price", formatCurrencyBRL(e.target.value))
                    }
                  />
                </Field>
              </div>
              <Field>
                <Label htmlFor="ingredients-1">Ingredientes</Label>
                <Input
                  id="ingredients-1"
                  name="ingredients"
                  defaultValue={product?.ingredients}
                />
              </Field>
              <Field>
                <Label htmlFor="description-1">Descrição</Label>
                <Textarea
                  id="description-1"
                  name="description"
                  defaultValue={product?.description || ""}
                />
              </Field>
            </FieldGroup>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DialogAddProduct;
