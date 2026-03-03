import { db } from "@/lib/prisma";

export async function getRangoooGlobalFees() {
  try {
    const settings = await db.systemSettings.findUnique({
      where: { id: "global" },
    });

    if (!settings) {
      // Valores de fallback caso você esqueça de criar o registro no banco
      return {
        URBAN: 700,
        DISTRICT: 1000,
        RURAL: 1500,
      };
    }

    return {
      URBAN: settings.urbanDeliveryFee,
      DISTRICT: settings.districtDeliveryFee,
      RURAL: settings.ruralDeliveryFee,
    };
  } catch (error) {
    console.error("Erro ao buscar taxas globais do Rangooo:", error);
    return { URBAN: 700, DISTRICT: 1000, RURAL: 1500 }; // Fallback de segurança
  }
}
