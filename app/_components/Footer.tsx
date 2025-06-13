import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
          {/* Navegación */}
          <div>
            <h3 className="mb-4 text-base font-semibold text-gray-900">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-gray-900"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/productos"
                  className="transition-colors hover:text-gray-900"
                >
                  Productos
                </Link>
              </li>
            </ul>
          </div>

          {/* Información */}
          <div>
            <h3 className="mb-4 text-base font-semibold text-gray-900">
              Información
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/faq"
                  className="transition-colors hover:text-gray-900"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="mb-4 text-base font-semibold text-gray-900">
              Síguenos
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/pixel.pointt/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 transition-colors hover:text-pink-600"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Créditos y derechos */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-gray-500 sm:flex-row sm:text-left">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-4">
              {/* Kevin */}
              <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-1">
                <span>Desarrollado por Kevin Villegas</span>
                <div className="flex space-x-1">
                  <Link
                    href="https://www.linkedin.com/in/kevin--villegas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600"
                    aria-label="LinkedIn Kevin"
                  >
                    <Linkedin size={14} />
                  </Link>
                  <Link
                    href="https://github.com/kev-villegas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900"
                    aria-label="GitHub Kevin"
                  >
                    <Github size={14} />
                  </Link>
                </div>
              </div>

              {/* Separador en desktop */}
              <span className="hidden sm:inline">|</span>

              {/* Nahuel */}
              <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-1">
                <span>Nahuel Villegas</span>
                <div className="flex space-x-1">
                  <Link
                    href="https://www.linkedin.com/in/villegasnahuel/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600"
                    aria-label="LinkedIn Nahuel"
                  >
                    <Linkedin size={14} />
                  </Link>
                  <Link
                    href="https://github.com/Nahu258"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900"
                    aria-label="GitHub Nahuel"
                  >
                    <Github size={14} />
                  </Link>
                </div>
              </div>
            </div>

            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} PixelPoint. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
