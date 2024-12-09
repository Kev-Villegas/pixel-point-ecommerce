"use client";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  images?: ItemType[]; // Asumo que `images` es un array de URLs (ajústalo si es necesario)
  category?: string;
  brand?: string;
  properties?: Record<string, string>; // Ajusta según la estructura de `properties`
};

export default function ProductForm({
  name: existingName,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  brand: existingBrand,
  properties: existingProperties,
}: ProductFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(existingName || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState<number>(existingPrice || 159.99);
  const [images, setImages] = useState<ItemType[]>(existingImages || []);
  const [productBrand, setProductBrand] = useState(existingBrand || "");
  const [properties, setProperties] = useState(existingProperties || []);

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

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      productBrand,
      properties,
    };

    await axios
      .post("/api/products", data)
      .then((response) => console.log(response));

    router.push("/");
  };

  const updateImagesOrder = (images) => {
    setImages(images);
  };

  // MANEJAR PROPIEDADES
  const addProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  };

  const handlePropertyNameChange = (index, property, newName) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };
  const handlePropertyValuesChange = (index, property, newValues) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  };

  const removeProperty = (indexToRemove) => {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  };

  return (
    <form onSubmit={saveProduct}>
      <label>Nombre del producto</label>
      <input
        type="text"
        placeholder="Nombre"
        value={title}
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
                className="h-24 rounded-sm border border-gray-200 bg-white p-4 shadow-sm"
              >
                <img
                  src={image.url}
                  alt="A product image"
                  className="rounded-lg"
                />
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
                  id: `img-${oldImages.length}`,
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
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <div className="mb-2">
        <label className="block">Propiedades</label>
        <button
          className="btn-default mb-2 text-sm"
          type="button"
          onClick={addProperty}
        >
          Add property
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
                Remove
              </button>
            </div>
          ))}
      </div>
      <label>Precio</label>
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(event) => setPrice(+event.target.value)}
      />
      <button className="btn-primary" type="submit">
        Guardar
      </button>
    </form>
  );
}
