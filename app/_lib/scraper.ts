import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";

export interface ScrapedProduct {
  name: string;
  description: string;
  brand: string;
  price: number;
  stock: number;
  images: string[];
  properties: {
    model?: string;
    capacity?: string;
    ram?: string;
    color?: string;
    battery?: string;
    processor?: string;
    graphics?: string;
    chipset?: string;
    connectivity?: string;
    navigation?: string;
    audio?: string;
    sensors?: string;
    features?: string;
    weight?: string;
    dimensions?: string;
    fastcharging?: boolean;
    frontcamera?: string;
    network2g?: string;
    network3g?: string;
    network4g?: string;
    network5g?: string;
    operatingsystem?: string;
    rearcamera?: string;
    screenresolution?: string;
    screensize?: string;
    screentype?: string;
    simcard?: string;
  };
}

export async function scrapeProduct(url: string): Promise<ScrapedProduct> {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.context().clearCookies();

  await page.setExtraHTTPHeaders({
    "Accept-Language": "es-AR,es;q=0.9",
  });

  try {
    await page.goto(url, { waitUntil: "networkidle" });

    // Extraer nombre del producto - busca en label con clase 'nome-prod-header'
    const name = await extractName(page);

    // Extraer descripción - la obtiene de la página meta o del título
    const description = await extractDescription(page);

    // Extraer marca del texto del header o de la URL
    const brand = await extractBrand(page);

    // Extraer precio
    const price = await extractPrice(page);

    // Extraer stock/disponibilidad
    const stock = await extractStock(page);

    // Extraer imágenes
    const images = await extractImages(page, url);

    // Extraer propiedades técnicas del móvil
    const properties = await extractProperties(page);

    await browser.close();

    return {
      name: name?.trim() || "Producto",
      description: description?.trim() || "Sin descripción",
      brand: brand || "No especificada",
      price,
      stock,
      images,
      properties,
    };
  } catch (error) {
    await browser.close();
    throw new Error(`Error scraping product: ${error}`);
  }
}

async function extractName(page: any): Promise<string> {
  try {
    // Intenta obtener el nombre de los labels con clase 'nome-prod-header'
    const nameLabel = await page
      .locator(".nome-prod-header")
      .first()
      .textContent();
    if (nameLabel) return nameLabel.trim();

    // Fallback: intenta obtener de h1
    const h1Name = await page.locator("h1").first().textContent();
    if (h1Name) return h1Name.trim();

    // Fallback: intenta obtener del título de la página
    const title = await page.title();
    if (title) {
      return title.split(" - ")[0].trim();
    }

    return "Producto";
  } catch {
    return "Producto";
  }
}

async function extractDescription(page: any): Promise<string> {
  try {
    // Usar SOLO el selector `.txt-prod-detal` (contiene el texto interno y spans)
    try {
      const el = await page.locator(".txt-prod-detal").first().textContent();
      if (el && el.trim()) return el.trim();
    } catch (e) {
      // Si no se encuentra el selector, continuamos al fallback mínimo
    }

    // Fallback seguro: título de la página (por si hay una página atípica)
    const title = await page.title();
    if (title) {
      const desc = title.split(" - ")[0];
      return desc || "Sin descripción disponible";
    }

    return "Sin descripción disponible";
  } catch (err) {
    return "Sin descripción disponible";
  }
}

async function extractBrand(page: any): Promise<string> {
  try {
    // Intenta extraer la marca del link en el header
    const brandLink = await page
      .locator('a[href*="/marca/"]')
      .first()
      .textContent();
    if (brandLink) return brandLink.trim();

    // Fallback: busca en el texto del nombre del producto
    const name = await extractName(page);
    const brands = [
      "Apple",
      "Samsung",
      "Xiaomi",
      "Motorola",
      "Tecno",
      "Oppo",
      "Realme",
    ];
    for (const brand of brands) {
      if (name.toLowerCase().includes(brand.toLowerCase())) {
        return brand;
      }
    }

    return "No especificada";
  } catch {
    return "No especificada";
  }
}

async function extractPrice(page: any): Promise<number> {
  try {
    // Busca el precio en elementos comunes
    const priceText =
      (await page.locator('[class*="precio"]').first().textContent()) ||
      (await page.locator('[class*="price"]').first().textContent()) ||
      "";

    // Extrae números del texto
    const priceMatch = priceText.match(/[\d,]+\.?\d*/);
    return priceMatch ? parseFloat(priceMatch[0].replace(",", "")) : 0;
  } catch {
    return 0;
  }
}

async function extractStock(page: any): Promise<number> {
  try {
    const stockText =
      (await page.locator('[class*="disponible"]').first().textContent()) ||
      (await page.locator('[class*="stock"]').first().textContent()) ||
      "";

    if (stockText.toLowerCase().includes("disponible")) {
      return 10; // Asume cantidad por defecto si está disponible
    }
    if (stockText.toLowerCase().includes("indisponible")) {
      return 0;
    }

    const stockMatch = stockText.match(/\d+/);
    return stockMatch ? parseInt(stockMatch[0]) : 10;
  } catch {
    return 10; // Default stock
  }
}

async function extractImages(page: any, baseUrl: string): Promise<string[]> {
  try {
    const imageSrcs = await page.locator('img[class*="img"]').all();
    const images: string[] = [];

    for (const img of imageSrcs) {
      const src = await img.getAttribute("src");
      if (src && !src.includes("favicon") && !src.includes("icon")) {
        // Convierte URLs relativas a absolutas
        const absoluteUrl = src.startsWith("http")
          ? src
          : new URL(src, baseUrl).toString();
        images.push(absoluteUrl);
      }
    }

    return images.slice(0, 5); // Máximo 5 imágenes
  } catch {
    return [];
  }
}

async function extractProperties(
  page: any,
): Promise<ScrapedProduct["properties"]> {
  const properties: ScrapedProduct["properties"] = {};

  // Normaliza strings (sin acentos, minusculas)
  const clean = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  // Selecciona SOLO los li con especificaciones
  // const specItems = await page.locator('li.grid-item-prod-espec').all();
  const specItems = await page
    .locator('.col-12:not([style*="display:none"]) .grid-item-prod-espec')
    .all();

  for (const item of specItems) {
    const titleElement = await item
      .locator(".title-prod-espec")
      .first()
      .textContent();
    const valueElement = await item
      .locator(".text-prod-espec")
      .first()
      .textContent();

    if (!titleElement || !valueElement) continue;

    const title = clean(titleElement);
    const value = valueElement.trim();

    // Mapeo simple
    if (title.includes("modelo")) properties.model = value;
    else if (title.includes("sistema operacional"))
      properties.operatingsystem = value;
    else if (title.includes("capacidad")) properties.capacity = value;
    else if (title.includes("memoria ram")) properties.ram = value;
    else if (title.includes("processador") || title.includes("procesador"))
      properties.processor = value;
    else if (title.includes("graficos") || title.includes("graficos"))
      properties.graphics = value;
    else if (title.includes("chipset")) properties.chipset = value;
    else if (title.includes("tarjeta sim")) properties.simcard = value;
    else if (title.includes("conectividad wireless"))
      properties.connectivity = value;
    else if (title.includes("navegacion")) properties.navigation = value;
    else if (title.includes("red 2g")) properties.network2g = value;
    else if (title.includes("red 3g")) properties.network3g = value;
    else if (title.includes("red 4g")) properties.network4g = value;
    else if (title.includes("red 5g")) properties.network5g = value;
    else if (title.includes("tipo de pantalla")) properties.screentype = value;
    else if (title.includes("tamano de la pantalla"))
      properties.screensize = value;
    else if (title.includes("resolucion de la pantalla"))
      properties.screenresolution = value;
    else if (title.includes("camara trasera")) properties.rearcamera = value;
    else if (title.includes("camara frontal")) properties.frontcamera = value;
    else if (title.includes("audio")) properties.audio = value;
    else if (title.includes("bateria")) properties.battery = value;
    else if (title.includes("fast charging")) properties.fastcharging = value;
    else if (title.includes("sensores")) properties.sensors = value;
    else if (title.includes("color")) properties.color = value;
    else if (title.includes("recursos")) properties.features = value;
    // else if (title.includes("observaciones")) properties.observations = value;
  }

  return properties;
}

function parseSpecificationText(
  text: string,
  properties: ScrapedProduct["properties"],
): void {
  const lowerText = text.toLowerCase();

  // Extrae Modelo
  const modelMatch = text.match(/(?:modelo|model)[\s:]*([^\n]{0,50})/i);
  if (modelMatch) properties.model = modelMatch[1].trim();

  // Extrae GB de almacenamiento/capacidad
  const capacityMatch = text.match(
    /(?:capacidad|storage|almacen)[\s:]*(\d+)\s*(?:GB|gb)/i,
  );
  if (capacityMatch) properties.capacity = capacityMatch[1] + " GB";

  // Extrae RAM
  const ramMatch = text.match(/(?:memoria\s*RAM|RAM)[\s:]*(\d+)\s*(?:GB|gb)/i);
  if (ramMatch) properties.ram = ramMatch[1] + " GB";

  // Extrae batería
  const batteryMatch = text.match(
    /(?:batería|bateria|battery)[\s:]*(\d+)\s*(?:mAh|mah)/i,
  );
  if (batteryMatch) properties.battery = batteryMatch[1] + " mAh";

  // Extrae cámaras trasera
  const rearCameraMatch = text.match(
    /(?:cámara trasera|rear camera|cámaras traseras)[\s:]*(\d+\s*MP|[\d\s|]+\s*MP)/i,
  );
  if (rearCameraMatch) properties.rearcamera = rearCameraMatch[1].trim();

  // Extrae cámaras frontal
  const frontCameraMatch = text.match(
    /(?:cámara frontal|front camera|selfie camera)[\s:]*(\d+\s*MP|[\d\s|]+\s*MP)/i,
  );
  if (frontCameraMatch) properties.frontcamera = frontCameraMatch[1].trim();

  // Extrae tamaño de pantalla
  const screenSizeMatch = text.match(
    /(?:tamaño de la pantalla|screen size|pantalla)[\s:]*(\d+\.?\d*)\s*"/i,
  );
  if (screenSizeMatch) properties.screensize = screenSizeMatch[1] + '"';

  // Extrae resolución
  const resolutionMatch = text.match(
    /(?:resolución|resolution)[\s:]*(\d+\s*x\s*\d+)/i,
  );
  if (resolutionMatch) properties.screenresolution = resolutionMatch[1].trim();

  // Extrae tipo de pantalla
  const screenTypeMatch = text.match(
    /(?:tipo de pantalla|screen type)[\s:]*([^\n]{0,50})/i,
  );
  if (screenTypeMatch) properties.screentype = screenTypeMatch[1].trim();

  // Extrae color
  const colorMatch = text.match(/(?:color)[\s:]*([^\n]{0,30})/i);
  if (colorMatch) properties.color = colorMatch[1].trim();

  // Extrae procesador
  const processorMatch = text.match(
    /(?:procesador|processor|chipset)[\s:]*([^\n]{0,60})/i,
  );
  if (processorMatch) {
    const procValue = processorMatch[1].trim();
    if (!properties.processor) properties.processor = procValue;
  }

  // Extrae chipset
  const chipsetMatch = text.match(/(?:chipset)[\s:]*([^\n]{0,50})/i);
  if (chipsetMatch) properties.chipset = chipsetMatch[1].trim();

  // Extrae gráficos
  const graphicsMatch = text.match(
    /(?:gráficos|graphics|gpu)[\s:]*([^\n]{0,50})/i,
  );
  if (graphicsMatch) properties.graphics = graphicsMatch[1].trim();

  // Extrae sistema operativo
  const osMatch = text.match(
    /(?:sistema operativo|sistema operacional|os)[\s:]*([^\n]{0,50})/i,
  );
  if (osMatch) properties.operatingsystem = osMatch[1].trim();

  // Extrae conectividad
  const connectMatch = text.match(
    /(?:conectividad|wireless|conectividad wireless)[\s:]*([^\n]{0,100})/i,
  );
  if (connectMatch) properties.connectivity = connectMatch[1].trim();

  // Extrae navegación
  const navMatch = text.match(
    /(?:navegación|navigation|gps)[\s:]*([^\n]{0,100})/i,
  );
  if (navMatch) properties.navigation = navMatch[1].trim();

  // Extrae audio
  const audioMatch = text.match(/(?:audio)[\s:]*([^\n]{0,50})/i);
  if (audioMatch) properties.audio = audioMatch[1].trim();

  // Extrae sensores
  const sensorsMatch = text.match(/(?:sensores|sensors)[\s:]*([^\n]{0,150})/i);
  if (sensorsMatch) properties.sensors = sensorsMatch[1].trim();

  // Extrae peso
  const weightMatch = text.match(
    /(?:peso|weight)[\s:]*(\d+\.?\d*)\s*(?:g|gr|gramos)/i,
  );
  if (weightMatch) properties.weight = weightMatch[1] + " g";

  // Extrae dimensiones
  const dimensionsMatch = text.match(
    /(?:dimensiones|dimensions|medidas)[\s:]*([^\n]{0,50})/i,
  );
  if (dimensionsMatch) properties.dimensions = dimensionsMatch[1].trim();

  // Extrae Fast Charging
  if (
    lowerText.includes("fast charging") ||
    lowerText.includes("carga rápida")
  ) {
    properties.fastcharging = true;
  }

  // Extrae Redes
  if (lowerText.includes("red 2g") || lowerText.includes("2g")) {
    const match = text.match(/(?:red 2g|2g)[\s:]*([^\n]{0,80})/i);
    if (match) properties.network2g = match[1].trim();
  }

  if (lowerText.includes("red 3g") || lowerText.includes("3g")) {
    const match = text.match(/(?:red 3g|3g)[\s:]*([^\n]{0,80})/i);
    if (match) properties.network3g = match[1].trim();
  }

  if (lowerText.includes("red 4g") || lowerText.includes("4g")) {
    const match = text.match(/(?:red 4g|4g)[\s:]*([^\n]{0,150})/i);
    if (match) properties.network4g = match[1].trim();
  }

  if (lowerText.includes("red 5g") || lowerText.includes("5g")) {
    const match = text.match(/(?:red 5g|5g)[\s:]*([^\n]{0,150})/i);
    if (match) properties.network5g = match[1].trim();
  }

  // Extrae SIM
  const simMatch = text.match(
    /(?:tarjeta sim|sim card|sim)[\s:]*([^\n]{0,50})/i,
  );
  if (simMatch) properties.simcard = simMatch[1].trim();

  // Extrae Features/Recursos
  const featuresMatch = text.match(
    /(?:recursos|features|características)[\s:]*([^\n]{0,150})/i,
  );
  if (featuresMatch) properties.features = featuresMatch[1].trim();
}

export async function downloadAndSaveImages(
  imageUrls: string[],
  productId: number,
): Promise<string[]> {
  const publicImagesDir = path.join(
    process.cwd(),
    "public",
    "products",
    String(productId),
  );

  // Crea el directorio si no existe
  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }

  const savedImagePaths: string[] = [];

  for (let i = 0; i < imageUrls.length; i++) {
    try {
      const response = await fetch(imageUrls[i]);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const filename = `image-${i + 1}.jpg`;
      const filepath = path.join(publicImagesDir, filename);

      fs.writeFileSync(filepath, buffer);
      savedImagePaths.push(`/products/${productId}/${filename}`);
    } catch (error) {
      console.error(`Error downloading image ${imageUrls[i]}:`, error);
    }
  }

  return savedImagePaths;
}
