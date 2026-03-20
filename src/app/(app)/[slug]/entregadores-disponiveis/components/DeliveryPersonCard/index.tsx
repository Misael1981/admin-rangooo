import { Card } from "@/components/ui/card";
import { MessageCircle, Motorbike, Phone } from "lucide-react";

type DeliveryPersonProps = {
  person: {
    id: string;
    name: string;
    phone: string | null;
  };
};

const DeliveryPersonCard = ({ person }: DeliveryPersonProps) => {
  const whatsappLink = `https://wa.me/${person.phone!.replace(/\D/g, "")}`;

  return (
    <Card className="max-w-3xl w-full px-5 py-4 flex flex-row items-center justify-between rounded-2xl shadow-sm hover:shadow-md transition-all">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-green-500/90 rounded-xl text-white">
          <Motorbike size={20} />
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-sm text-muted-foreground">
            Entregador
          </span>
          <span className="font-semibold text-base">{person.name}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <Phone size={16} />
          {person.phone}
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-xl text-sm font-medium transition"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
      </div>
    </Card>
  );
};

export default DeliveryPersonCard;
