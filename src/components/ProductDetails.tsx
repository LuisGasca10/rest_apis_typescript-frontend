import {
  ActionFunctionArgs,
  Form,
  redirect,
  useFetcher,
  useNavigate,
} from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
}

interface Props {
  product: Product;
}
export const ProductDetails = ({ product }: Props) => {
  const nav = useNavigate();
  const fetcher = useFetcher();
  const isAvailability = product.availability;

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${
              isAvailability ? "text-black" : "text-red-600"
            } rounded-lg p-2 text-xsb uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
          >
            {isAvailability ? "Disponible" : "No dispónoble"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800">
        <div className="flex gap-2 items-center">
          <button
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
            onClick={() => nav(`/productos/${product.id}/editar`)}
            type="button"
          >
            Editar
          </button>
          <Form
            onSubmit={(e) => {
              if (!confirm("¿Eliminar?")) {
                e.preventDefault();
              }
            }}
            action={`productos/${product.id}/eliminar`}
            className="w-full"
            method="DELETE"
          >
            <input
              className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
              type="submit"
              value={"Eliminar"}
            />
          </Form>
        </div>
      </td>
    </tr>
  );
};
