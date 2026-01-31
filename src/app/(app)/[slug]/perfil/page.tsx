import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import GeneralInformation from "./components/GeneralInformation";
import HeaderPerfil from "./components/HeaderPerfil";
import EstablishmentContacts from "./components/EstablishmentContacts";
import SocialMediaEstablishment from "./components/SocialMediaEstablishment";
import EstablishmentAddress from "./components/EstablishmentAddress";
import GalleryWithDescriptionEstablishment from "./components/GalleryWithDescriptionEstablishment";

export default async function PerfilPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      email: true,
      avatarImageUrl: true,
      coverImageUrl: true,
      socialMedia: true,
      street: true,
      number: true,
      complement: true,
      neighborhood: true,
      city: true,
      state: true,
      zipCode: true,
      contacts: { select: { type: true, number: true, isPrimary: true } },
      description: true,
      businessHours: {
        select: { dayOfWeek: true, timeSlots: true, isClosed: true },
      },
      category: true,
      menuCategories: { select: { id: true, name: true } },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="space-y-6 px-8 pb-8">
      <HeaderPerfil />

      <GeneralInformation
        name={restaurant.name}
        slug={restaurant.slug}
        category={restaurant.category}
        id={restaurant.id}
      />

      <EstablishmentContacts
        restaurantId={restaurant.id}
        initialContacts={restaurant.contacts}
      />

      <SocialMediaEstablishment
        initialSocialMedia={restaurant.socialMedia}
        initialEmail={restaurant.email || ""}
        restaurantId={restaurant.id}
      />

      <EstablishmentAddress
        restaurantId={restaurant.id}
        initialData={{
          street: restaurant.street ?? "",
          number: restaurant.number ?? "",
          neighborhood: restaurant.neighborhood ?? "",
          complement: restaurant.complement ?? "",
          city: restaurant.city ?? "",
          state: restaurant.state ?? "",
          zipCode: restaurant.zipCode ?? "",
          country: "Brasil",
        }}
      />

      <GalleryWithDescriptionEstablishment
        description={restaurant.description || ""}
        avatarImageUrl={restaurant.avatarImageUrl || ""}
        coverImageUrl={restaurant.coverImageUrl || ""}
        restaurantId={restaurant.id}
      />
    </div>
  );
}
