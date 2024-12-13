import axios from "axios";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

interface Properties {
  id: number;
  color?: string;
  size?: string;
  material?: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  stock: boolean;
  price: number;
  properties?: Properties;
}

async function ProductList() {
  let { data } = await axios.get(`http://localhost:3000/api/products`);

  const products: Product[] = data.map((product: any) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    brand: product.brand,
    stock: product.stock,
    price: product.price,
    properties: product.properties,
  }));

  return (
    <table className="basic mt-2">
      <thead>
        <tr>
          <td>Product Name</td>
          <td />
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>
              <Link
                className="btn-default"
                href={"/protected/products/edit/" + product.id}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                Edit
              </Link>
              <DeleteButton id={product.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductList;
