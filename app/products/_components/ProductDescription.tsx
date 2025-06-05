import { useState } from "react";

export default function ProductDescription({
  description,
}: {
  description: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;

  // Si la descripción es más corta que el máximo, mostrarla completa
  if (description.length <= maxLength) {
    return <p className="text-lg text-gray-600">{description}</p>;
  }

  return (
    <div>
      <p className="text-md text-gray-600">
        {isExpanded ? description : `${description.substring(0, maxLength)}...`}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-1 text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none"
      >
        {isExpanded ? "Ver menos" : "Ver más"}
      </button>
    </div>
  );
}
