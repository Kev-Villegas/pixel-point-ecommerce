import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
          {/* Enlaces principales */}
          <div className="px-4">
            <h3 className="mb-4 text-sm font-medium text-gray-900">
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
          <div className="px-4">
            <h3 className="mb-4 text-sm font-medium text-gray-900">
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
          <div className="px-4">
            <h3 className="mb-4 text-sm font-medium text-gray-900">Síguenos</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/pixel.pointt/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 transition-colors hover:text-pink-600"
                aria-label="Instagram"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-col items-center justify-between space-y-4 sm:px-0 md:flex-row md:space-y-0">
            {/* <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} PixelPoint. Todos los derechos reservados.
            </p> */}

            <div className="flex flex-col items-center space-y-3 text-xs text-gray-500 sm:flex-row sm:space-x-4 sm:space-y-0">
              <span className="hidden sm:inline">Desarrollado por:</span>
              <span className="sm:hidden">Desarrollado por</span>

              <div className="flex flex-wrap items-center justify-center gap-1 sm:justify-start">
                <span>Kevin Villegas</span>
                <div className="flex items-center space-x-1">
                  <Link
                    href="https://www.linkedin.com/in/kevin--villegas/"
                    className="px-1 text-gray-500 transition-colors hover:text-blue-600"
                    aria-label="LinkedIn Kevin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={14} />
                  </Link>
                  <Link
                    href="https://github.com/kev-villegas"
                    className="px-1 text-gray-500 transition-colors hover:text-gray-900"
                    aria-label="GitHub Kevin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={14} />
                  </Link>
                </div>
              </div>

              <span className="hidden sm:inline">&</span>

              <div className="flex flex-wrap items-center justify-center gap-1 sm:justify-start">
                <span>Nahuel Villegas</span>
                <div className="flex items-center space-x-1">
                  <Link
                    href="https://www.linkedin.com/in/villegasnahuel/"
                    className="px-1 text-gray-500 transition-colors hover:text-blue-600"
                    aria-label="LinkedIn Nahuel"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={14} />
                  </Link>
                  <Link
                    href="https://github.com/Nahu258"
                    className="px-1 text-gray-500 transition-colors hover:text-gray-900"
                    aria-label="GitHub Nahuel"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={14} />
                  </Link>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} PixelPoint. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
