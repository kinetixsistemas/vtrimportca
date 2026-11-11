import type { Product } from "@/types/catalog";
import { getCompatibilityGroups } from "@/lib/catalog";
import { Badge } from "@/components/ui/badge";

export function CompatibilityTable({ product }: { product: Product }) {
  const groups = getCompatibilityGroups(product);

  if (groups.length === 0) {
    return (
      <div className="border border-vtr-black/10 bg-vtr-gray-light p-5 text-sm text-vtr-gray-dark">
        <p className="font-semibold text-vtr-black">
          Compatibilidad a confirmar
        </p>
        <p className="mt-1">
          Este producto no tiene compatibilidades cargadas en los datos de
          demostración. Consulta con un asesor por WhatsApp antes de comprar.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-vtr-black/10">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">
          Marcas y modelos de motos compatibles con {product.name}
        </caption>
        <thead className="bg-vtr-black text-white">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em]"
            >
              Marca
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em]"
            >
              Modelos compatibles (años)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-vtr-black/10 bg-white">
          {groups.map((group) => (
            <tr key={group.brandName}>
              <th scope="row" className="px-4 py-3 align-top font-semibold">
                <Badge variant="green">{group.brandName}</Badge>
              </th>
              <td className="px-4 py-3 text-vtr-gray-dark">
                <ul className="flex flex-wrap gap-1.5">
                  {group.models.map((model) => (
                    <li
                      key={model}
                      className="border border-vtr-black/10 bg-vtr-gray-light px-2 py-1 text-xs"
                    >
                      {model}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-vtr-black/10 bg-vtr-gray-light px-4 py-3 text-xs text-vtr-gray-dark">
        Datos de compatibilidad ficticios para demostración. Verifica siempre
        con la referencia exacta de tu moto.
      </p>
    </div>
  );
}
