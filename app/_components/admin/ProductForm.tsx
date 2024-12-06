"use client";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Spinner from "./Spinner";

interface CloudinaryResult {
  secure_url: string;
}

type Category = {
  _id: string; // El ID único de la categoría
  name: string; // El nombre de la categoría
};

export default function ProductForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [productProperties, setProductProperties] = useState({});

  const [categories, setCategories] = useState([]);

  const [isUploading, setIsUploading] = useState(false);

  const saveProduct = () => {};

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
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Sin Marca</option>
        {categories.length > 0 &&
          categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category}
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
            images.map((link) => (
              <div
                key={link}
                className="h-24 rounded-sm border border-gray-200 bg-white p-4 shadow-sm"
              >
                <img src={link} alt="A product image" className="rounded-lg" />
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
          onQueuesEnd={(response: any, widget: any) => widget.close()}
          onSuccess={(response: any) => {
            const info = response.info as CloudinaryResult;
            setImages((oldImages) => {
              return [...oldImages, info.secure_url];
            });
            console.log(images);
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
        {/* <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-sm border border-primary bg-white text-center text-sm text-primary shadow-sm">
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
          <input type="file" className="hidden" onChange={uploadImages} />
        </label> */}
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
        onChange={(event) => setPrice(event.target.value)}
      />
      <button className="btn-primary" type="submit">
        Guardar
      </button>
    </form>
  );
}
