"use client";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Spinner from "./Spinner";

interface CloudinaryResult {
  secure_url: string;
}

interface ItemType {
  id: number;
  url: string;
}

export default function ProductForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(159.99);
  const [images, setImages] = useState<ItemType[]>([]);
  const [productBrand, setProductBrand] = useState("");
  // const [productProperties, setProductProperties] = useState({})

  const [isUploading, setIsUploading] = useState(false);

  const brands = ["Apple", "Samsung", "Xiaomi", "Motorola"];

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price, images, productBrand };
    console.log(data);

    await axios
      .post("/api/products", data)
      .then((response) => console.log(response));
  };

  const updateImagesOrder = (images) => {
    setImages(images);
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
