"use client";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import Spinner from "./Spinner";

interface CloudinaryResult {
  secure_url: string;
}

interface ItemType {
  id: number;
  url: string;
}

type ProductFormProps = {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  images?: ItemType[];
  category?: string;
  brand?: string;
  stock?: boolean;
  properties?: Record<string, string>;
};

export default function ProductForm({
  id,
  name: existingName,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  brand: existingBrand,
  properties: existingProperties,
  stock: existingStock,
}: ProductFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(existingName || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState<number>(existingPrice ?? 159.99); // Usa `??` para evitar problemas con `null`
  const [images, setImages] = useState<ItemType[]>(existingImages || []);
  const [productBrand, setProductBrand] = useState(existingBrand || "");
  const [stock, setStock] = useState(existingStock || false);
  const [properties, setProperties] = useState<
    { name: string; values: string }[]
  >(
    existingProperties
      ? Object.entries(existingProperties).map(([key, value]) => ({
          name: key,
          values: value || "",
        }))
      : [],
  );

  const [isUploading, setIsUploading] = useState(false);

  const brands = ["Apple", "Samsung", "Xiaomi", "Motorola"];

  useEffect(() => {
    if (existingProperties) {
      const formattedProperties = Object.entries(existingProperties)
        .map(([key, value]) => ({
          name: key,
          values: value,
        }))
        .filter((prop) => prop.values !== null);
      setProperties([...formattedProperties]);
    }
  }, []);

  const saveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title,
      stock,
      description,
      price,
      images,
      productBrand,
      properties,
    };

    if (id) {
      await axios.put(`/api/products/${id}`, { ...data, id }).then(() => {
        toast.success("Producto actualizado correctamente");
        router.push("/protected/products");
      });
    } else {
      try {
        const response = await axios.post("/api/products", data);
        if (response.status === 201) {
          toast.success("Producto creado correctamente");
          router.push("/protected/products");
        }
      } catch (error: any) {
        const errorMessage = error.response.data.error || "Error desconocido";
        // console.log(error.response.data.error)
        toast.error(`Error: ${errorMessage}`);
      }
    }
  };

  const updateImagesOrder = (images: any) => {
    setImages(images);
  };

  // MANEJAR PROPIEDADES
  const addProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  };

  const handlePropertyNameChange = (
    index: any,
    property: any,
    newName: any,
  ) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };
  const handlePropertyValuesChange = (
    index: any,
    property: any,
    newValues: any,
  ) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  };

  const removeProperty = (indexToRemove: any) => {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  };

  async function deleteImage(url: string) {
    const res = await axios.delete("/api/images/?url=" + url);
    if (res.status === 200) {
      setImages((prevImages) =>
        prevImages.filter((image) => image.url !== url),
      );
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <div className="flex w-fit flex-col items-start">
        <label className="mb-3">Stock</label>
        <input
          className="mb-4"
          type="checkbox"
          checked={stock}
          onChange={(e) => setStock(e.target.checked)}
        />
      </div>
      <label>Nombre del producto</label>
      <input
        type="text"
        placeholder="Nombre"
        value={title || ""} // Asegúrate de que nunca sea `null` o `undefined`
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Marca</label>
      <select
        value={productBrand}
        onChange={(e) => setProductBrand(e.target.value)}
      >
        <option value="">Sin Marca</option>
        {brands.length > 0 &&
          brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
      </select>

      <label>Fotos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          className="flex flex-wrap gap-1"
          list={images}
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images.map((image) => (
              <div
                key={image.id}
                className="group relative h-24 w-fit rounded-sm border border-gray-200 bg-white p-4 shadow-sm"
              >
                <img
                  src={image.url}
                  alt="A product image"
                  className="rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => deleteImage(image.url)}
                  className="absolute right-2 top-2 rounded-full bg-red-200 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  title="Delete Image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#DC2626"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="flex h-24 items-center">
            <Spinner />
          </div>
        )}
        <CldUploadButton
          className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-sm border border-primary bg-white text-center text-sm text-primary shadow-sm"
          uploadPreset="pixelimages"
          onQueuesStart={() => setIsUploading(true)}
          onQueuesEnd={(response: any, widget: any) => widget.close()}
          onSuccess={(response: any) => {
            const info = response.info as CloudinaryResult;
            setImages((oldImages) => {
              return [
                ...oldImages,
                {
                  id: oldImages.length,
                  url: info.secure_url,
                },
              ];
            });

            setIsUploading(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Agregar</div>
        </CldUploadButton>
      </div>
      <label>Descripción</label>
      <textarea
        placeholder="Descripción"
        value={description || ""} // Asegúrate de que nunca sea `null` o `undefined`
        onChange={(event) => setDescription(event.target.value)}
      />
      <div className="mb-2">
        <label className="block">Especificaciones</label>
        <button
          className="btn-default mb-2 text-sm"
          type="button"
          onClick={addProperty}
        >
          Agregar
        </button>
        {properties.length > 0 &&
          properties.map((property, index) => (
            <div className="mb-2 flex gap-1" key={index}>
              <input
                type="text"
                value={property.name}
                className="mb-0"
                onChange={(e) =>
                  handlePropertyNameChange(index, property, e.target.value)
                }
                placeholder="Property name (example: color)"
              />
              <input
                type="text"
                className="mb-0"
                onChange={(e) =>
                  handlePropertyValuesChange(index, property, e.target.value)
                }
                value={property.values}
                placeholder="Values, comma separated"
              />
              <button
                type="button"
                onClick={() => removeProperty(index)}
                className="btn-red"
              >
                Eliminar
              </button>
            </div>
          ))}
      </div>
      <label>Precio</label>
      <input
        type="number"
        placeholder="Precio"
        value={price || 0} // Asegúrate de que nunca sea `null` o `undefined`
        onChange={(event) => setPrice(+event.target.value)}
      />
      <button className="btn-primary" type="submit">
        Guardar
      </button>
    </form>
  );
}
