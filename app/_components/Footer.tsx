import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
          {/* Navegación */}
          <div>
            <h2 className="mb-4 text-base font-semibold text-gray-900">
              Navegación
            </h2>
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
                  href="/productos/categoria/novedades"
                  className="transition-colors hover:text-gray-900"
                >
                  Novedades
                </Link>
              </li>
              <li>
                <Link
                  href="/productos/categoria/masvendidos"
                  className="transition-colors hover:text-gray-900"
                >
                  Más vendidos
                </Link>
              </li>
              <li>
                <Link
                  href="/productos/categoria/masgustados"
                  className="transition-colors hover:text-gray-900"
                >
                  Más gustados
                </Link>
              </li>
            </ul>
          </div>

          {/* Información */}
          <div>
            <h2 className="mb-4 text-base font-semibold text-gray-900">
              Información
            </h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/politicas"
                  className="transition-colors hover:text-gray-900"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="transition-colors hover:text-gray-900"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/proximos-pasos"
                  className="transition-colors hover:text-gray-900"
                >
                  Próximos Pasos
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h2 className="mb-2 text-base font-semibold text-gray-900">
              Contacto
            </h2>
            <a
              href="mailto:contacto@pixel-point.com.ar"
              className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
            >
              <Mail size={18} />
              <span>contacto@pixel-point.com.ar</span>
            </a>

            <div className="mt-6">
              <h2 className="mb-2 text-base font-semibold text-gray-900">
                Síguenos
              </h2>
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
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-gray-500 sm:flex-row sm:text-left">
            {/* <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-1">
                <span>Desarrollado por Kevin Villegas</span>
                <div className="flex space-x-2">
                  <Link
                    href="https://www.linkedin.com/in/kevin--villegas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center text-gray-500 hover:text-blue-600 md:h-5 md:w-5"
                    aria-label="LinkedIn Kevin"
                  >
                    <Linkedin className="h-5 w-5 md:h-4 md:w-4" />
                  </Link>
                  <Link
                    href="https://github.com/kev-villegas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center text-gray-500 hover:text-gray-900 md:h-5 md:w-5"
                    aria-label="GitHub Kevin"
                  >
                    <Github className="h-5 w-5 md:h-4 md:w-4" />
                  </Link>
                </div>
              </div>

              <span className="hidden sm:inline">|</span>

              <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-1">
                <span>Nahuel Villegas</span>
                <div className="flex space-x-2">
                  <Link
                    href="https://www.linkedin.com/in/villegasnahuel/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center text-gray-500 hover:text-blue-600 md:h-5 md:w-5"
                    aria-label="LinkedIn Nahuel"
                  >
                    <Linkedin className="h-5 w-5 md:h-4 md:w-4" />
                  </Link>
                  <Link
                    href="https://github.com/Nahu258"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center text-gray-500 hover:text-gray-900 md:h-5 md:w-5"
                    aria-label="GitHub Nahuel"
                  >
                    <Github className="h-5 w-5 md:h-4 md:w-4" />
                  </Link>
                </div>
              </div>
            </div> */}

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
