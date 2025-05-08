import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto py-8 pl-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Enlaces principales */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-gray-900">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-gray-900">
                  Productos
                </Link>
              </li>
              {/* <li>
                <Link href="/ofertas" className="hover:text-gray-900">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-gray-900">
                  Contacto
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Información */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-gray-900">
              Información
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {/* <li>
                <Link href="/" className="hover:text-gray-900">
                  Sobre Nosotros
                </Link>
              </li> */}
              <li>
                <Link href="/faq" className="hover:text-gray-900">
                  Preguntas Frecuentes
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/politica-privacidad"
                  className="hover:text-gray-900"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-gray-900">
                  Términos y Condiciones
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-gray-900">Síguenos</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/pixel.pointt/"
                target="_blank"
                className="text-gray-500 hover:text-gray-900"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-col items-center justify-between space-y-4 lg:flex-row lg:space-y-0">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} PixelPoint. Todos los derechos
              reservados.
            </p>

            <div className="flex items-center space-x-6 px-6 text-xs text-gray-500">
              <span>Desarrollado por:</span>

              <div className="flex items-center space-x-1">
                <span>Kevin Villegas</span>
                <Link
                  href="https://www.linkedin.com/in/kevin--villegas/"
                  className="ml-1 text-gray-500 transition-colors hover:text-blue-600"
                  aria-label="LinkedIn Kevin"
                >
                  <Linkedin size={14} />
                </Link>
                <Link
                  href="https://github.com/kev-villegas"
                  className="text-gray-500 transition-colors hover:text-gray-900"
                  aria-label="GitHub Kevin"
                >
                  <Github size={14} />
                </Link>
              </div>

              <span>&</span>

              <div className="flex items-center space-x-1">
                <span>Nahuel Villegas</span>
                <Link
                  href="https://linkedin.com/in/perfil-de-tu-hermano"
                  className="ml-1 text-gray-500 transition-colors hover:text-blue-600"
                  aria-label="LinkedIn Nahuel"
                >
                  <Linkedin size={14} />
                </Link>
                <Link
                  href="https://github.com/Nahu258"
                  className="text-gray-500 transition-colors hover:text-gray-900"
                  aria-label="GitHub Nahuel"
                >
                  <Github size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
