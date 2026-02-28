import { ChevronRight } from "lucide-react";
import Link from "next/link";

type SearchEstablishmentsProps = {
  establishments: {
    id: string;
    name: string;
    slug: string;
  }[];
};

const SearchEstablishments = ({
  establishments,
}: SearchEstablishmentsProps) => {
  return (
    <section className="grid grid-cols-1 gap-4 p-4">
      {establishments.map((est) => (
        <Link
          key={est.id}
          href={`/${est.slug}`}
          className="flex items-center justify-between p-4 bg-white rounded-xl border shadow-sm active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-3">
            {/* Avatar do Restaurante */}
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
              {est.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{est.name}</h3>
              <p className="text-xs text-gray-500">/{est.slug}</p>
            </div>
          </div>

          <ChevronRight className="text-gray-400" />
        </Link>
      ))}
    </section>
  );
};

export default SearchEstablishments;
