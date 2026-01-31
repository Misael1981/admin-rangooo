"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ImageUpload from "../ImageUpload";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { uploadToCloudinary } from "@/app/_actions/upload-cloudinary";
import { toast } from "sonner";
import { updateGalleryDescription } from "@/app/_actions/update-gallery-description";

type GalleryWithDescriptionValue = z.infer<typeof galleryWithDescriptionSchema>;

interface GalleryWithDescriptionEstablishmentProps {
  description: string;
  avatarImageUrl: string;
  coverImageUrl: string;
  restaurantId: string;
}

const galleryWithDescriptionSchema = z.object({
  avatarImageUrl: z
    .union([z.string(), z.any()])
    .refine((val) => val, "Imagem de perfil obrigatória"),
  coverImageUrl: z
    .union([z.string(), z.any()])
    .refine((val) => val, "Imagem de capa obrigatória"),
  description: z.string().optional(),
});

const GalleryWithDescriptionEstablishment = ({
  description,
  avatarImageUrl,
  coverImageUrl,
  restaurantId,
}: GalleryWithDescriptionEstablishmentProps) => {
  const form = useForm<GalleryWithDescriptionValue>({
    resolver: zodResolver(galleryWithDescriptionSchema),
    defaultValues: {
      description,
      avatarImageUrl,
      coverImageUrl,
    },
  });

  const onSubmit = async (data: GalleryWithDescriptionValue) => {
    try {
      let finalAvatarUrl = avatarImageUrl;
      let finalCoverUrl = coverImageUrl;

      if (data.avatarImageUrl instanceof File) {
        const res = await uploadToCloudinary(data.avatarImageUrl);
        if (res) finalAvatarUrl = res.url;
      }

      if (data.coverImageUrl instanceof File) {
        const res = await uploadToCloudinary(data.coverImageUrl);
        if (res) finalCoverUrl = res.url;
      }

      const result = await updateGalleryDescription({
        restaurantId,
        description: data.description ?? "",
        avatarImageUrl: finalAvatarUrl,
        coverImageUrl: finalCoverUrl,
      });

      if (result.success) {
        toast.success("Identidade visual atualizada com sucesso!");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Erro ao processar as imagens.");
      console.error(error);
    }
  };

  return (
    <section className="flex items-center justify-center py-4">
      <Card className="w-full max-w-3xl border-2">
        <CardHeader>
          <CardTitle className="text-xl">Identidade Visual</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Upload da Logo */}
              <div className="space-y-2">
                <FieldLabel>Logo do Estabelecimento</FieldLabel>
                <ImageUpload
                  name="avatarImageUrl"
                  form={form}
                  initialUrl={avatarImageUrl}
                />
              </div>

              {/* Upload da Capa */}
              <div className="space-y-2">
                <FieldLabel>Imagem de Capa</FieldLabel>
                <ImageUpload
                  name="coverImageUrl"
                  form={form}
                  initialUrl={coverImageUrl}
                />
              </div>
            </div>

            <Field>
              <FieldLabel>Descrição / Sobre nós</FieldLabel>
              <Textarea
                {...form.register("description")}
                placeholder="Conte um pouco sobre a história do seu restaurante..."
                className="h-32"
              />
              {form.formState.errors.description && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.description.message}
                </p>
              )}
            </Field>

            <Button type="submit" className="w-full">
              Salvar Identidade Visual
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default GalleryWithDescriptionEstablishment;
