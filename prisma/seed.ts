import { prisma } from "../app/_lib/prisma.js";
import { Category } from "@prisma/client";

async function main() {
  // Borrar en orden correcto respetando las relaciones de claves foráneas
  // console.log("🗑️  Borrando todos los datos de la base de datos...");

  // 1. Primero borrar las tablas que dependen de otras (tablas hijas)
  await prisma.orderItem.deleteMany({});
  console.log("✅ OrderItems borrados");

  await prisma.like.deleteMany({});
  console.log("✅ Likes borrados");

  await prisma.image.deleteMany({});
  console.log("✅ Images borradas");

  await prisma.properties.deleteMany({});
  console.log("✅ Properties borradas");

  await prisma.shipmentData.deleteMany({});
  console.log("✅ ShipmentData borrados");

  await prisma.account.deleteMany({});
  console.log("✅ Accounts borradas");

  await prisma.session.deleteMany({});
  console.log("✅ Sessions borradas");

  await prisma.verificationToken.deleteMany({});
  console.log("✅ VerificationTokens borrados");

  await prisma.order.deleteMany({});
  console.log("✅ Orders borradas");

  await prisma.product.deleteMany({});
  console.log("✅ Products borrados");

  await prisma.user.deleteMany({});
  console.log("✅ Users borrados");

  // console.log("\n🎉 Todos los datos han sido borrados exitosamente\n");
  // console.log("📝 Insertando productos de ejemplo...");

  const products = [
    {
      name: 'Consola Portátil Valve Steam Deck V004921-00 1TB 16GB RAM Pantalla 7" - Blanco',
      description:
        "La nueva generación llega a la consola portátil Steam Deck, ahora con pantalla OLED de 7.4 pulgadas con frecuencia de actualización de 90Hz, gatillos analógicos y 2 trackpads con respuesta táctil de alta definición, conexión Bluetooth y Wi-Fi 6, batería ampliada con mayor duración hasta 12 horas, procesador AMD Zen 2 de 4 núcleos y 8 hilos, 16 GB de RAM para velocidad en diversas tareas y sistema operativo SteamOS 3.0, hecho para soportar hasta los juegos más recientes.",
      brand: "VALVE",
      price: 1630000.0,
      category: Category.CONSOLE,
      stock: 10,
      images: {
        create: [
          {
            url: "http://www.atacadoconnect.com/imagem/consola-portatil/consola-portatil-valve-steam-deck-v004921-00-1tb-16gb-ram-pantalla-7-blanco/1/1254372.jpg",
          },
          {
            url: "http://www.atacadoconnect.com/imagem/consola-portatil/consola-portatil-valve-steam-deck-v004921-00-1tb-16gb-ram-pantalla-7-blanco/2/1254372.jpg",
          },
          {
            url: "http://www.atacadoconnect.com/imagem/consola-portatil/consola-portatil-valve-steam-deck-v004921-00-1tb-16gb-ram-pantalla-7-blanco/3/1254372.jpg",
          },
          {
            url: "http://www.atacadoconnect.com/imagem/consola-portatil/consola-portatil-valve-steam-deck-v004921-00-1tb-16gb-ram-pantalla-7-blanco/4/1254372.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Steam Deck",
          specs: {
            Capacidad: "1 TB",
            "Memoria RAM": "16 GB",
            "Sistema Operativo": "SteamOS 3.0",
            Procesador: "Zen 2 4c/8t, 2,4-3,5 GHz (hasta 448 GFlops FP32)",
            Gráficos: "8 RDNA 2 CUs, 1,0-1,6 GHz (até 1,6 TFlops FP32)",
            Conectividad: "Wi-Fi banda dupla 802.11a | Bluetooth 5.0",
            "Tipo de Pantalla": "OLED HDR",
            "Resolución de Pantalla": "1280 x 800p",
            Interfaz: "USB-C | 3,5 mm",
            Audio: "DSP integrado",
            Controles: "IMU incorporada y botones táctiles capacitivos",
            Sensores: "Sensor de luz ambiental",
            Trackpads:
              "2 trackpads cuadrados de 32,5 mm con retroalimentación háptica",
            Batería: "45 W con cable de 2,5 m",
            Color: "Blanco",
            Características: "Estuche de viaje",
            Observaciones: "Cargador 3 Pines*",
          },
        },
      },
    },
    {
      name: 'Smartphone Samsung Galaxy S25 5G SM-S938B Global 512GB 12GB RAM Dual SIM Pantalla 6.2" - Gris',
      description:
        'Smartphone con pantalla AMOLED 2X de 6,9" QHD+ y tasa de 120Hz adaptativa. El Galaxy S25 Ultra integra Snapdragon 8 Elite, 12 GB de RAM y 512 GB de almacenamiento. Cámara principal de 200 MP, ultra gran angular de 50 MP y zoom óptico de hasta 5x. Batería de 5000 mAh con carga rápida de 45W y carga inalámbrica de 15W. Resistente al agua y polvo (IP68), con Android 15 y One UI 7.',
      brand: "SAMSUNG",
      price: 1770000.0,
      category: Category.SMARTPHONE,
      stock: 10,
      images: {
        create: [
          {
            url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-5g-sm-s938b-global-512gb-12gb-ram-dual-sim-pantalla-6-2-gris/1/1203790.jpg",
          },
          {
            url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-5g-sm-s938b-global-512gb-12gb-ram-dual-sim-pantalla-6-2-gris/2/1203790.jpg",
          },
          {
            url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-5g-sm-s938b-global-512gb-12gb-ram-dual-sim-pantalla-6-2-gris/3/1203790.jpg",
          },
          {
            url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-5g-sm-s938b-global-512gb-12gb-ram-dual-sim-pantalla-6-2-gris/4/1203790.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Samsung Galaxy S25 Ultra",
          specs: {
            Versión: "Global",
            "Sistema Operativo": "Android 15, One UI 7",
            Capacidad: "512 GB",
            "Memoria RAM": "12 GB",
            Procesador: "Qualcomm Snapdragon 8 Elite",
            Gráficos: "Adreno 830",
            Chipset: "Qualcomm SM8750-AB Snapdragon 8 Elite",
            "Tarjeta SIM": "Dual SIM",
            Conectividad: "Wi-Fi 7 | Bluetooth 5.4",
            Navegación: "GPS | GLONASS | BDS | GALILEO",
            "Red 2G": "GSM 850 / 900 / 1800 / 1900",
            "Red 3G": "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
            "Red 4G": "LTE",
            "Red 5G": "SA/NSA/Sub6/mmWave",
            "Tipo de Pantalla": "Dynamic AMOLED 2X | 120Hz | HDR10+",
            "Tamaño de Pantalla": '6.8"',
            "Resolución de Pantalla": "1440 x 3120p",
            "Cámara Trasera": "200 MP | 50 MP | 10 MP | 50 MP",
            "Cámara Frontal": "12MP",
            Audio: "Altavoces estéreo",
            Batería: "5000 mAh",
            "Carga Rápida": "Sí",
            Sensores:
              "Huella digital bajo la pantalla | Acelerómetro | Giroscopio | Sensor de proximidad | Brújula | Barómetro",
            Color: "Gris",
            Peso: "218 g",
          },
        },
      },
    },
    {
      name: 'Smartphone Samsung Galaxy S25 Ultra 5G SM-S938B 512GB 12GB RAM Dual SIM Pantalla 6.9" - Plata Titanio',
      description:
        "El smartphone S25 Ultra combina un diseño elegante, funciones modernas y alto rendimiento. Su pantalla AMOLED de 120Hz ofrece imágenes fluidas. La cámara cuádruple de 200 MP graba en 8K, lo que garantiza fotos y videos con gran detalle. Equipado con un procesador Snapdragon de 8 núcleos y conexión 5G, proporciona velocidad y eficiencia. La certificación IP68 garantiza la resistencia al agua y al polvo, mientras que la batería de larga duración garantiza un uso más prolongado.",
      brand: "SAMSUNG",
      price: 1770000.0,
      category: Category.SMARTPHONE,
      stock: 10,
      images: {
        create: [
          {
            url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-ultra-5g-sm-s938b-512gb-12gb-ram-dual-sim-pantalla-6-9-plata-titanio/1/1189025.jpg",
          },
          {
            url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-ultra-5g-sm-s938b-512gb-12gb-ram-dual-sim-pantalla-6-9-plata-titanio/2/1189025.jpg",
          },
          {
            url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-ultra-5g-sm-s938b-512gb-12gb-ram-dual-sim-pantalla-6-9-plata-titanio/3/1189025.jpg",
          },
          {
            url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-ultra-5g-sm-s938b-512gb-12gb-ram-dual-sim-pantalla-6-9-plata-titanio/4/1189025.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "S25 Ultra",
          specs: {
            "Sistema Operativo": "Android 15",
            Capacidad: "512 GB",
            "Memoria RAM": "12 GB",
            Procesador:
              "Octa-core (2x4.47 GHz Oryon V2 Phoenix L + 6x3.53 GHz Oryon V2 Phoenix M)",
            Gráficos: "Adreno 830",
            Chipset: "Qualcomm SM8750-AB Snapdragon 8 Elite",
            "Tarjeta SIM": "Nano-SIM | eSIM",
            Conectividad:
              "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band, Wi-Fi Direct, Bluetooth 5.4",
            Navegación: "GPS, GLONASS, BDS, GALILEO, QZSS",
            "Red 2G": "GSM 850 / 900 / 1800 / 1900",
            "Red 3G": "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
            "Red 4G":
              "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 32, 38, 39, 40, 41, 66",
            "Red 5G":
              "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 38, 40, 41, 66, 75, 77, 78 SA/NSA/Sub6",
            "Tipo de Pantalla": "AMOLED 2X, 120Hz",
            "Tamaño de Pantalla": '6.9"',
            "Resolución de Pantalla": "1440 x 3120",
            "Cámara Trasera": "200 MP | 10 MP | 50 MP | 50 MP",
            "Cámara Frontal": "12MP",
            Audio: "Altavoces estéreo",
            Batería: "5000 mAh",
            "Carga Rápida": "Sí",
            Sensores:
              "Huella dactilar (pantalla, ultrasónico), acelerómetro, giroscopio, proximidad, brújula, barómetro",
            Color: "Plata Titanio",
            Características: "Resistente al polvo y al agua IP68",
          },
        },
      },
    },
    {
      name: 'Smartphone Samsung Galaxy S25 Edge SM-S937B 256GB 12GB RAM Dual SIM Pantalla 6.7" - Negro (Caja Slim)',
      description:
        'Estilo premium y potencia que se adapta a vos. El Galaxy S25 Edge combina pantalla Dynamic AMOLED 2X de 6,7" a 120 Hz con cuerpo delgado de titanio, brindando comodidad y diseño refinado. Sus 12 GB de RAM y 256 GB de memoria aseguran fluidez incluso en tareas pesadas. La cámara de 200 MP captura cada detalle con calidad profesional. Ideal para quienes editan, juegan o trabajan desde el móvil y buscan velocidad, buena imagen y autonomía real.',
      brand: "SAMSUNG",
      price: 1182500.0,
      category: Category.SMARTPHONE,
      stock: 10,
      images: {
        create: [
          {
            url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-edge-sm-s937b-256gb-12gb-ram-dual-sim-pantalla-6-7-negro-caja-slim/1/1299540.jpg",
          },
          {
            url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-edge-sm-s937b-256gb-12gb-ram-dual-sim-pantalla-6-7-negro-caja-slim/2/1299540.jpg",
          },
          {
            url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-edge-sm-s937b-256gb-12gb-ram-dual-sim-pantalla-6-7-negro-caja-slim/3/1299540.jpg",
          },
          {
            url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-edge-sm-s937b-256gb-12gb-ram-dual-sim-pantalla-6-7-negro-caja-slim/4/1299540.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "S25 Edge",
          specs: {
            "Sistema Operativo": "Android 15",
            Capacidad: "256 GB",
            "Memoria RAM": "12 GB",
            Procesador: "Snapdragon 8 Elite",
            Chipset: "Snapdragon 8 Elite",
            "Tarjeta SIM": "Dual nano-SIM",
            Conectividad: "Wi-Fi 7 | Bluetooth 5.4",
            Navegación: "GPS, GLONASS, BeiDou, Galileo",
            "Red 2G": "GSM 850 / 900 / 1800 / 1900",
            "Red 3G": "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
            "Red 4G":
              "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 32, 38, 39, 40, 41, 66",
            "Red 5G":
              "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 38, 40, 41, 66, 75, 77, 78 SA/NSA/Sub6",
            "Tipo de Pantalla": "Dynamic LTPO AMOLED",
            "Tamaño de Pantalla": '6,7"',
            "Resolución de Pantalla": "3120×1440",
            "Cámara Trasera": "200MP | 12MP",
            "Cámara Frontal": "12MP",
            Audio: "Altavoces estéreo",
            "Carga Rápida": "Sí",
            Sensores:
              "Huella bajo pantalla (ultrasónica), acelerómetro, giroscopio, proximidad, brújula, barómetro",
            Color: "Negro",
            Observaciones: "Caja Slim*",
            Peso: "163g",
            Dimensiones: "158,2×75,6×5,8mm",
          },
        },
      },
    },
    {
      name: 'Smartphone Samsung Galaxy S25 Edge SM-S937B 256GB 12GB RAM Dual SIM Pantalla 6.7" - Azul (Caja Slim)',
      description:
        'Estilo premium y potencia que se adapta a vos. El Galaxy S25 Edge combina pantalla Dynamic AMOLED 2X de 6,7" a 120 Hz con cuerpo delgado de titanio, brindando comodidad y diseño refinado. Sus 12 GB de RAM y 256 GB de memoria aseguran fluidez incluso en tareas pesadas. La cámara de 200 MP captura cada detalle con calidad profesional. Ideal para quienes editan, juegan o trabajan desde el móvil y buscan velocidad, buena imagen y autonomía real.',
      brand: "SAMSUNG",
      price: 1182500.0,
      category: Category.SMARTPHONE,
      stock: 10,
      images: {
        create: [
          {
            url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-edge-sm-s937b-256gb-12gb-ram-dual-sim-pantalla-6-7-azul-caja-slim/1/1299557.jpg",
          },
          {
            url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-edge-sm-s937b-256gb-12gb-ram-dual-sim-pantalla-6-7-azul-caja-slim/2/1299557.jpg",
          },
          {
            url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-edge-sm-s937b-256gb-12gb-ram-dual-sim-pantalla-6-7-azul-caja-slim/3/1299557.jpg",
          },
          {
            url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-edge-sm-s937b-256gb-12gb-ram-dual-sim-pantalla-6-7-azul-caja-slim/4/1299557.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "S25 Edge",
          specs: {
            "Sistema Operativo": "Android 15",
            Capacidad: "256 GB",
            RAM: "12 GB",
            Procesador: "Snapdragon 8 Elite",
            Chipset: "Snapdragon 8 Elite",
            SIM: "Dual nano-SIM",
            Conectividad: "Wi-Fi 7 | Bluetooth 5.4",
            Navegación: "GPS, GLONASS, BeiDou, Galileo",
            "Red 2G": "GSM 850 / 900 / 1800 / 1900",
            "Red 3G": "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
            "Red 4G":
              "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 32, 38, 39, 40, 41, 66",
            "Red 5G":
              "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 38, 40, 41, 66, 75, 77, 78 SA/NSA/Sub6",
            "Tipo de Pantalla": "Dynamic LTPO AMOLED",
            "Tamaño de Pantalla": '6,7"',
            Resolución: "3120×1440",
            "Cámara Trasera": "200MP | 12MP",
            "Cámara Frontal": "12MP",
            Audio: "Altavoces estéreo",
            "Carga Rápida": "Sí",
            Sensores:
              "Huella bajo pantalla (ultrasónica), acelerómetro, giroscopio, proximidad, brújula, barómetro",
            Color: "Azul",
            Observaciones: "Caja Slim*",
            Peso: "163g",
            Dimensiones: "158,2×75,6×5,8mm",
          },
        },
      },
    },
    {
      name: "Webcam Redragon Cyberlens GW911 Ultra HD 4K Micrófono Integrado - Negro",
      description:
        "Imagen clara y profesional para videollamadas, streaming o clases en línea. La Webcam Redragon GW911 ofrece resolución 4K Ultra HD, logrando vídeos nítidos y detallados en conferencias, clases o transmisiones. El autoenfoque inteligente y la corrección automática de luz mantienen tu imagen clara incluso con poca iluminación. Los micrófonos duales con cancelación de ruido eliminan sonidos externos, garantizando voz limpia durante llamadas. Ideal para trabajo remoto, clases o streaming.",
      brand: "REDRAGON",
      price: 107850.0,
      category: Category.PERIPHERAL,
      stock: 10,
      images: {
        create: [
          {
            url: "http://www.atacadoconnect.com/imagem/webcams/webcam-redragon-cyberlens-gw911-ultra-hd-4k-microfono-integrado-negro/1/1295443.jpg",
          },
          {
            url: "http://www.atacadoconnect.com/imagem/webcams/webcam-redragon-cyberlens-gw911-ultra-hd-4k-microfono-integrado-negro/2/1295443.jpg",
          },
          {
            url: "http://www.atacadoconnect.com/imagem/webcams/webcam-redragon-cyberlens-gw911-ultra-hd-4k-microfono-integrado-negro/3/1295443.jpg",
          },
          {
            url: "http://www.atacadoconnect.com/imagem/webcams/webcam-redragon-cyberlens-gw911-ultra-hd-4k-microfono-integrado-negro/4/1295443.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Cyberlens",
          specs: {
            Interfaz: "USB",
            Compatibilidad: "Windows | macOS | Linux",
            Cámara: "Webcam",
            Resolución: "4K 3840 × 2160",
            "Tasa de cuadros": "30 fps",
            "Campo de Visión": "360°",
            Zoom: "Zoom digital",
            Enfoque: "Auto-enfoque inteligente",
            "Micrófono Integrado": "Sí",
            Sensores: "CMOS",
            Alimentación: "Via USB",
            Color: "Preto",
            Características:
              "Corrección automática de luz, micrófonos con cancelación de ruido, plug-and-play, tapa física para privacidad",
          },
        },
      },
    },
    {
      name: "Headset Gamer Corsair HS55 CA-9011260-NA Mini Jack 3.5mm - Negro",
      description:
        "Los auriculares Corsair HS55 son ligeros y duraderos, ideales para largas sesiones de juego con comodidad. Equipado con controladores de 50 mm, ofrece un sonido de alta calidad. El micrófono omnidireccional con función de giro para silenciar garantiza una comunicación clara. La conexión estable con interfaz Jack de 3.5 mm proporciona compatibilidad con varios dispositivos. Con suave espuma viscoelástica y orejeras de piel sintética, ofrece comodidad duradera.",
      brand: "CORSAIR",
      price: 107500.0,
      category: Category.PERIPHERAL,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-gamer-corsair-hs55-ca-9011260-na-mini-jack-3-5mm-negro/2/226741.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-gamer-corsair-hs55-ca-9011260-na-mini-jack-3-5mm-negro/2/226742.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-gamer-corsair-hs55-ca-9011260-na-mini-jack-3-5mm-negro/2/226743.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-gamer-corsair-hs55-ca-9011260-na-mini-jack-3-5mm-negro/2/226744.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "HS55",
          specs: {
            "Tipo de Conexión": "Con cable",
            Conector: "Mini Jack 3.5 mm",
            "Frecuencia de Respuesta": "20 Hz - 20 kHz",
            Impedancia: "32k Ohms | 1 kHz",
            Drivers: "50 mm",
            Micrófono: "Omnidireccional",
            "Sensibilidad del Micrófono": "-41dB (+/-3dB)",
            Compatibilidad: "PC, PS4/5, Xbox One, X | S, Mobile",
            "Longitud del Cable": "1.8 m",
            Color: "Carbón",
          },
        },
      },
    },
    {
      name: "Headset Gamer Hyperx Cloud Stinger 2 3.5mm - Negro",
      description:
        "El Headset HyperX Cloud Stinger II combina comodidad y calidad de sonido para una experiencia inmersiva. Equipado con transductores de 50 mm, ofrece un audio potente y equilibrado. Su micrófono bidireccional con cancelación de ruido garantiza una comunicación clara. La tecnología DTS Headphone:X Spatial Audio ofrece un sonido espacial para una mayor precisión. Con una interfaz de 3,5 mm, es compatible con varios dispositivos. Las suaves almohadillas de cuero sintético garantizan la comodidad.",
      brand: "HYPERX",
      price: 98500.0,
      category: Category.PERIPHERAL,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-gamer-hyperx-cloud-stinger-2-3-5mm-negro/2/269604.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-gamer-hyperx-cloud-stinger-2-3-5mm-negro/2/269601.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-gamer-hyperx-cloud-stinger-2-3-5mm-negro/2/269602.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-gamer-hyperx-cloud-stinger-2-3-5mm-negro/2/269603.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-gamer-hyperx-cloud-stinger-2-3-5mm-negro/2/269600.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Cloud Stinger II",
          specs: {
            "Tipo de Conexión": "Con cable",
            Conector: "Mini Jack 3.5 mm",
            "Frecuencia de Respuesta": "10 Hz - 28 kHz",
            Impedancia: "32 ohm",
            Drivers: "50 mm",
            Micrófono: "Bidireccional",
            "Sensibilidad del Micrófono": "-40,5 dBV (1 V/Pa a 1 kHz)",
            "Calidad de Sonido": "DTS Headphone:X Spatial Audio",
            "Control de Volumen": "Integrado",
            Iluminación: "No",
            Material: "Plástico",
            Color: "Negro",
          },
        },
      },
    },
    {
      name: "Headset Gamer Redragon Zeus 2 H510W USB - Blanco",
      description:
        "Con sonido envolvente 7.1 y controladores de 53 mm, el Redragon Zeus 2 H510W ofrece una alta calidad de sonido. Compatible con entrada USB 2.0 y 3,5 mm, se adapta a múltiples plataformas. Las almohadillas de cuero sintético brindan comodidad duradera, incluso durante sesiones de juego maratónicas. Una elección equilibrada entre rendimiento y comodidad para jugadores exigentes.",
      brand: "REDRAGON",
      price: 95350.0,
      category: Category.PERIPHERAL,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-gamer-redragon-zeus-2-h510w-usb-blanco/2/131974.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-gamer-redragon-zeus-2-h510w-usb-blanco/2/71474.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-gamer-redragon-zeus-2-h510w-usb-blanco/2/106271.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-gamer-redragon-zeus-2-h510w-usb-blanco/2/22694.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Zeus 2",
          specs: {
            "Tipo de Conexión": "Con cable",
            Interfaz: "USB",
            Conector: "Mini Jack 3.5 mm",
            Alcance: "2 m",
            "Frecuencia de Respuesta": "20 Hz - 20 kHz",
            Impedancia: "64O ± 15% (f = 1KHZ)",
            Drivers: "53 mm",
            Micrófono:
              "Omnidireccional | Micrófono Desmontable con Captación de voz Totalmente Libre de Ruido para su Comunicación en el Juego",
            "Sensibilidad del Micrófono": "-42 ± 3dB",
            "Calidad de Sonido": "7.1 Surround",
            Compatibilidad: "PC | PS4, PS3 | Xbox One | Switch | Smartphones",
            Material:
              "Almohadillas Courino de Calidad Avanzada para Mayor Durabilidad",
            Color: "Blanco",
            Características:
              "Conexiones Extraíbles para Compatibilidad, Comodidad de Transporte y Durabilidad | Fantástica Calidad de Sonido para la Reproducción de Música, con Modo de Ecualización para Diferentes Estilos | Equipado con Almohadas Suaves y Cómodas",
          },
        },
      },
    },
    {
      name: "Headset Gamer Redragon H610 Wireless - Negro",
      description:
        "Sonido potente y aislamiento para concentrarse. El Headset Redragon H610 ofrece drivers de 40 mm con rango de frecuencia 20 Hz–20 kHz, ideal para juegos, música o películas. Su sistema ANC bloquea ruidos externos entre 35 y 40 dB, garantizando inmersión incluso en entornos ruidosos. Con batería de hasta 50 h por Bluetooth y diseño over-ear ergonómico, resulta cómodo en sesiones largas. Conectividad por Bluetooth 5.3 o cable AUX, micrófono integrado, es versátil para PC, consolas o móvil.",
      brand: "REDRAGON",
      price: 74350.0,
      category: Category.PERIPHERAL,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-gamer-redragon-h610-wireless-negro/2/316830.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-gamer-redragon-h610-wireless-negro/2/316829.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-gamer-redragon-h610-wireless-negro/2/316831.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-gamer-redragon-h610-wireless-negro/2/316832.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "VibeCore H610",
          specs: {
            "Tipo de Conexión": "Sin cable",
            Conectividad: "Bluetooth 5.3 | AUX 3,5 mm",
            Conector: "Mini Jack 3.5 mm",
            Alcance: "15 m",
            "Frecuencia de Respuesta": "20 Hz – 20 kHz",
            Impedancia: "16",
            Drivers: "40 mm",
            Micrófono: "Integrado",
            "Calidad de Sonido": "Audio estéreo",
            "Longitud del Cable": "1,2m",
            Batería: "500 mAh",
            Autonomía: "50h",
            "Tiempo de Carga": "2–3h",
            Color: "Negro",
            Características: "Cancelación activa de ruido (ANC)",
            Peso: "327g",
            Dimensiones: "186 × P83 × A182 mm",
          },
        },
      },
    },
    {
      name: "Headset Redragon Aurora H376WG USB - Blanco",
      description:
        "Los auriculares Redragon Aurora ofrecen una experiencia de sonido envolvente con su tarjeta de sonido integrada y audio virtual 7.1 para una máxima calidad. Sus controladores de 40 mm brindan un sonido claro y detallado, ideal para juegos, música y comunicación. Con almohadillas de polipiel, garantiza comodidad incluso durante largas sesiones. El micrófono ajustable permite una comunicación clara, mientras que el diseño ergonómico ofrece un ajuste perfecto y una comodidad duradera.",
      brand: "REDRAGON",
      price: 73000.0,
      category: Category.PERIPHERAL,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-redragon-aurora-h376wg-usb-blanco/2/265882.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-redragon-aurora-h376wg-usb-blanco/2/265883.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-redragon-aurora-h376wg-usb-blanco/2/265885.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-redragon-aurora-h376wg-usb-blanco/2/265884.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Aurora",
          specs: {
            "Tipo de Conexión": "Con cable",
            Conector: "USB",
            Impedancia: "32 ohm",
            Drivers: "40 mm",
            "Sensibilidad del Micrófono": "-42 ± 3dB",
            "Calidad de Sonido": "7.1 Virtual",
            "Longitud del Cable": "2 m",
            Material: "Almohadillas de cuero",
            Color: "Blanco",
          },
        },
      },
    },
    {
      name: "Headset Gamer Kingston Hyper X Cloud Stinger HX-HSCS-BK-NA - Negro",
      description:
        "Aqui na Atacado Games você encontra o Fone Kingston Hyper, proporciona alta fidelidade sonora de tons baixos, médios e agudos e ainda reprodução de graves intensos que garantem um ambiente de jogo ainda mais imersivo. Oferece máximo conforto mesmo após longos períodos de utilização. Venha aproveitar seu passeio no           Paraguai na maior distribuidora de games da                                  América Latina e confira a linha                                  Kingston.",
      brand: "HYPERX",
      price: 73000.0,
      category: Category.PERIPHERAL,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/headsets/headset-gamer-kingston-hyper-x-cloud-stinger-hx-hscs-bk-na-negro/2/1958.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Hyper X Cloud Stinger",
          specs: {
            "Frecuencia de Respuesta": "18-23.000 Hz",
            Impedancia: "30 ohms",
            Compatibilidad: "PC | Mac | S4 | Xbox | Nintendo Swicth",
            "Longitud del Cable": "1.6 m",
            Color: "Negro",
            Peso: "275 g",
          },
        },
      },
    },
    {
      name: "Auricular Xiaomi Redmi Buds 6 Play M2420E1 Wireless - Azul",
      description:
        "Los auriculares Xiaomi Redmi Buds 6 Play ofrecen un sonido envolvente con controladores de 10 mm y conexión Bluetooth 5.4 para una máxima estabilidad. Equipados con un micrófono integrado, garantizan llamadas claras y prácticas. Su batería dura hasta 36 horas con el estuche, ideal para quienes buscan autonomía y practicidad. La carga a través de USB-C hace que el uso sea aún más conveniente y sirve para diversas rutinas diarias de manera efectiva y eficiente.",
      brand: "XIAOMI",
      price: 34999.0,
      category: Category.ACCESSORY,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-xiaomi-redmi-buds-6-play-m2420e1-wireless-azul/2/249056.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-xiaomi-redmi-buds-6-play-m2420e1-wireless-azul/2/249057.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-xiaomi-redmi-buds-6-play-m2420e1-wireless-azul/2/249058.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-xiaomi-redmi-buds-6-play-m2420e1-wireless-azul/2/249059.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Redmi Buds 6 Play",
          specs: {
            Conectividad: "Bluetooth 5.4",
            Drivers: "10 mm",
            Micrófono: "Integrado",
            Autonomía: "Hasta 36 horas con estuche",
            Conector: "USB-C",
            Color: "Azul",
            Peso: "0.094 kg",
            Dimensiones: "12.10 cm X 10.10 cm X 3.20 cm",
          },
        },
      },
    },
    {
      name: "Auricular Xiaomi Redmi Buds 6 Play Bluetooth - Rosa",
      description:
        "Los Xiaomi Redmi Buds 6 Play con controladores de 10 mm, que ofrecen un sonido equilibrado entre graves potentes y agudos claros en el rango de 20 Hz a 20 kHz. Equipados con Bluetooth 5.4 para una buena conexión, aseguran velocidad y estabilidad con los dispositivos. La cancelación de ruido incorporada bloquea los sonidos externos, brindando una experiencia más inmersiva. La batería de 57 mAh en los auriculares y 600 mAh en el estuche garantizan un uso prolongado durante todo el día.",
      brand: "XIAOMI",
      price: 34999.0,
      category: Category.ACCESSORY,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-xiaomi-mi-redmi-buds-6-play-m2420e1-bluetooth-rosa/2/247681.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-xiaomi-mi-redmi-buds-6-play-m2420e1-bluetooth-rosa/2/247683.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-xiaomi-mi-redmi-buds-6-play-m2420e1-bluetooth-rosa/2/247682.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Redmi Buds 6 Play",
          specs: {
            Conectividad: "Bluetooth 5.4",
            Drivers: "10 mm",
            "Frecuencia de Respuesta": "20Hz - 20kHz",
            Impedancia: "16 Ohms",
            "Cancelación de Ruido": "Sí",
            Micrófono: "Integrado",
            Autonomía: "Auriculares: 57 mAh | Estuche de carga: 600 mAh",
            "Tiempo de Carga":
              "Hasta 7,5 horas con una sola carga | Hasta 36 horas con el estuche de carga.",
            Interfaz: "USB-C",
            Color: "Rosa",
          },
        },
      },
    },
    {
      name: "Auricular Redmi Buds 6 Play Wireless - Negro",
      description:
        "Los auriculares Redmi Buds 6 Play ofrecen una experiencia de audio inalámbrica confiable y de alta calidad con conexión Bluetooth 5.4. Equipados con controladores de 10 mm, proporcionan un sonido claro y potente. La interfaz USB-C permite una carga rápida y eficiente. Con una autonomía de hasta 7,5 horas en los auriculares y hasta 36 horas con el estuche de carga, estos auriculares son ideales para un uso prolongado durante todo el día.",
      brand: "XIAOMI",
      price: 34999.0,
      category: Category.ACCESSORY,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-redmi-buds-6-play-bhr8776gl-wireless-negro/2/235346.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-redmi-buds-6-play-bhr8776gl-wireless-negro/2/235347.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Redmi Buds 6 Play",
          specs: {
            Conectividad: "Bluetooth 5.4",
            Drivers: "10 mm",
            "Cancelación de Ruido": "Sí",
            Batería: "Auriculares: 57 mAh | Case: 600 mAh",
            Autonomía: "Auriculares: 7,5 horas | Case: 36 horas",
            "Tiempo de Carga": "2 horas",
            Interfaz: "USB-C",
            Color: "Negro",
          },
        },
      },
    },
    {
      name: "Auricular Xiaomi Mi Redmi Buds 6 Active M2344E1 - Rosa",
      description:
        "Los auriculares activos Xiaomi Mi Redmi Buds 6 cuentan con tecnología Bluetooth 5.4 y controladores de 14,2 mm para un sonido de alta calidad. Con hasta 6 horas de uso continuo y 24 horas con el estuche, podrás aprovechar al máximo tu música durante todo el día. Al tener cancelación de ruido, ofrece una experiencia auditiva clara durante tus llamadas. Además, el botón con sensor táctil incorporado facilita la reproducción y las llamadas.",
      brand: "XIAOMI",
      price: 38999.0,
      category: Category.ACCESSORY,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-xiaomi-mi-redmi-buds-6-active-m2344e1-rosa/2/231243.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Redmi Buds 6 Active",
          specs: {
            Conectividad: "Bluetooth 5.4",
            Drivers: "14.2 mm",
            "Cancelación de Ruido": "Sí",
            Micrófono: "Integrado",
            Batería: "Auricular 37 mAh | Case 475 mAh",
            Autonomía: "Auricular 6 horas | Case 24 horas",
            "Tiempo de Carga": "1 Hora",
            Interfaz: "USB-C",
            Color: "Rosa",
            Características:
              "Botón sensor táctil para reproducción y llamada, integrado en la estructura | Compatible con la aplicación de auriculares Xiaomi",
          },
        },
      },
    },
    {
      name: "Auricular Xiaomi Mi Redmi Buds 6 Active M2344E1 - Blanco",
      description:
        "Los auriculares Redmi Buds 6 Active están diseñados para ofrecer una experiencia de sonido superior y cómoda. Con conexión inalámbrica Bluetooth 5.4, garantizan una conexión estable y eficiente. Equipados con controladores de 14 mm, brindan una calidad de audio clara y potente. Ofrecen 6 horas de autonomía en los auriculares y hasta 30 horas adicionales con el estuche de carga. La resistencia al agua IPX4 garantiza durabilidad y protección contra salpicaduras.",
      brand: "XIAOMI",
      price: 38999.0,
      category: Category.ACCESSORY,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-xiaomi-mi-redmi-buds-6-active-m2344e1-blanco/2/229693.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Redmi Buds 6 Active",
          specs: {
            Conectividad: "Bluetooth 5.4",
            Drivers: "14.2 mm",
            "Cancelación de Ruido": "Sí",
            Micrófono: "Integrado",
            Batería: "Auricular 37 mAh | Case 475 mAh",
            Autonomía: "Auricular 6 horas | Case 24 horas",
            "Tiempo de Carga": "1 Hora",
            Interfaz: "USB-C",
            Color: "Blanco",
            Características:
              "Botón sensor táctil para reproducción y llamada, integrado en la estructura | Compatible con la aplicación de auriculares Xiaomi",
          },
        },
      },
    },
    {
      name: "Auricular Xiaomi Redmi Buds 6 Lite M2111E1 Wireless - Azul",
      description:
        "Los auriculares Redmi Buds 6 Lite ofrecen una experiencia de audio de alta calidad con comodidad y durabilidad. Con conexión inalámbrica Bluetooth 5.3, garantizan una transmisión estable y rápida. Equipados con controladores de 12,4 mm, proporcionan un sonido claro y potente. La autonomía de 7 horas con los auriculares y hasta 38 horas con el estuche de carga permite largas sesiones de uso. Resistencia al agua IP54. Los micrófonos duales incorporados garantizan llamadas claras y nítidas.",
      brand: "XIAOMI",
      price: 43999.0,
      category: Category.ACCESSORY,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-xiaomi-redmi-buds-6-lite-m2111e1-wireless-azul/2/237649.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-xiaomi-redmi-buds-6-lite-m2111e1-wireless-azul/2/237650.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-xiaomi-redmi-buds-6-lite-m2111e1-wireless-azul/2/237648.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-xiaomi-redmi-buds-6-lite-m2111e1-wireless-azul/2/237647.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Redmi Buds 6 Lite",
          specs: {
            Conectividad: "Bluetooth 5.3",
            Drivers: "12.4 mm",
            "Frecuencia de Respuesta": "20Hz - 20kHz",
            Impedancia: "32 ohm",
            Sensibilidad: "40 dB",
            "Cancelación de Ruido": "Sí",
            Micrófono: "Doble",
            Batería: "Auriculares: 45 mAh | Caja: 480 mAh",
            Autonomía: "Auriculares: 7 horas | Caja: 38 horas",
            "Resistencia al Agua": "IP54",
            Compatibilidad: "Android | iOS",
            Interfaz: "USB-C",
            Color: "Azul",
          },
        },
      },
    },
    {
      name: "Auricular Xiaomi Redmi Buds 6 Lite M2111E1 Wireless - Blanco",
      description:
        "Los auriculares Redmi Buds 6 Lite ofrecen una experiencia de audio de alta calidad con comodidad y durabilidad. Con conexión inalámbrica Bluetooth 5.3, garantizan una transmisión estable y rápida. Equipados con controladores de 12,4 mm, proporcionan un sonido claro y potente. La autonomía de 7 horas con los auriculares y hasta 38 horas con el estuche de carga permite largas sesiones de uso. Resistencia al agua IP54. Los micrófonos duales incorporados garantizan llamadas claras y nítidas.",
      brand: "XIAOMI",
      price: 43999.0,
      category: Category.ACCESSORY,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-xiaomi-redmi-buds-6-lite-m2111e1-wireless-blanco/2/237253.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-xiaomi-redmi-buds-6-lite-m2111e1-wireless-blanco/2/237252.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-xiaomi-redmi-buds-6-lite-m2111e1-wireless-blanco/2/237254.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-xiaomi-redmi-buds-6-lite-m2111e1-wireless-blanco/2/237255.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Redmi Buds 6 Lite",
          specs: {
            Conectividad: "Bluetooth 5.3",
            Drivers: "12.4 mm",
            "Frecuencia de Respuesta": "20Hz - 20kHz",
            Impedancia: "32 ohm",
            Sensibilidad: "40 dB",
            "Cancelación de Ruido": "Sí",
            Micrófono: "Doble",
            Batería: "Auriculares: 45 mAh | Caja: 480 mAh",
            Autonomía: "Auriculares: 7 horas | Caja: 38 horas",
            "Resistencia al Agua": "IP54",
            Compatibilidad: "Android | iOS",
            Interfaz: "USB-C",
            Color: "Blanco",
          },
        },
      },
    },
    {
      name: "Auricular Amazon Echo Buds 2023 Wireless - Blanco",
      description:
        "Los auriculares Amazon Echo Buds 2023 ofrecen una calidad de sonido excepcional con controladores de 12 mm y conectividad Bluetooth 5.2. Con hasta 5 horas de autonomía en los auriculares y 20 horas con el estuche de carga, es ideal para largas sesiones musicales, llamadas y podcasts. Compatible con iOS y Android, proporciona un ajuste cómodo y un sonido claro. Compacto y eficiente, es perfecto para quienes buscan practicidad y rendimiento, ya sea en el trabajo, en la formación o en el ocio.",
      brand: "AMAZON",
      price: 67999.0,
      category: Category.ACCESSORY,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-amazon-echo-buds-2023-wireless-blanco/2/253340.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-amazon-echo-buds-2023-wireless-blanco/2/253341.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-amazon-echo-buds-2023-wireless-blanco/2/253343.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-amazon-echo-buds-2023-wireless-blanco/2/253342.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Echo Buds 2023",
          specs: {
            Conectividad: "Bluetooth 5.2",
            Drivers: "12 mm",
            Micrófono: "2 por auricular",
            Autonomía: "Hasta 5 horas (auriculares) | Hasta 20 horas (estuche)",
            Conector: "USB-C",
            Color: "Blanco",
            Peso: "Auricular: 5.0 g | Estuche: 36.0 g",
            Dimensiones:
              "Auricular: 33.9 x 19.1 x 17.7 mm | Estuche: 23.4 x 58.9 x 58.9 mm",
            Compatibilidad: "Android | iOS",
          },
        },
      },
    },
    {
      name: "Auricular Amazon Echo Buds 2023 Wireless - Negro",
      description:
        "Los auriculares Amazon Echo Buds 2023 ofrecen una calidad de sonido excepcional con controladores de 12 mm y conectividad Bluetooth 5.2. Con hasta 5 horas de autonomía en los auriculares y 20 horas con el estuche de carga, es ideal para largas sesiones musicales, llamadas y podcasts. Compatible con iOS y Android, proporciona un ajuste cómodo y un sonido claro. Compacto y eficiente, es perfecto para quienes buscan practicidad y rendimiento, ya sea en el trabajo, en la formación o en el ocio.",
      brand: "AMAZON",
      price: 67999.0,
      category: Category.ACCESSORY,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-amazon-echo-buds-2023-wireless-negro/2/253365.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-amazon-echo-buds-2023-wireless-negro/2/253366.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-amazon-echo-buds-2023-wireless-negro/2/253367.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Echo Buds 2023",
          specs: {
            Conectividad: "Bluetooth 5.2",
            Drivers: "12 mm",
            "Cancelación de Ruido": "No",
            Micrófono: "Integrado",
            Autonomía: "Auricular 5 horas | Case 20 horas",
            Compatibilidad: "iOS | Android",
            Conector: "USB-C",
            Color: "Negro",
          },
        },
      },
    },
    {
      name: "Auricular Samsung Galaxy Buds Core SM-R410 Wireless - Negro",
      description:
        "Los Samsung Galaxy Buds Core integran cancelación activa de ruido, conectividad Bluetooth 5.4 y certificación IP54 contra polvo y salpicaduras, ideales para el uso diario. Con solo 5,3 g por auricular, ofrecen hasta 35 h de música con el estuche, o 20 h con ANC activado. Incorporan funciones de Galaxy AI, como intérprete y traducción en tiempo real directamente en los auriculares, combinando comodidad, sonido de calidad e inteligencia avanzada.",
      brand: "SAMSUNG",
      price: 74999.0,
      category: Category.ACCESSORY,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-samsung-galaxy-buds-core-sm-r410-wireless-negro/2/302854.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-samsung-galaxy-buds-core-sm-r410-wireless-negro/2/302851.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-samsung-galaxy-buds-core-sm-r410-wireless-negro/2/302852.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-samsung-galaxy-buds-core-sm-r410-wireless-negro/2/302853.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Galaxy Buds Core",
          specs: {
            Conectividad: "Bluetooth 5.4",
            "Cancelación de Ruido": "Sí",
            Batería: "500 mAh",
            Autonomía: "35 h",
            "Resistencia al Agua": "IP54",
            Conector: "USB-C",
            Color: "Negro",
            Características: "Funciones Galaxy AI",
          },
        },
      },
    },
    {
      name: "Auricular Samsung Galaxy Buds Core SM-R410 Wireless - Blanco",
      description:
        "Los Samsung Galaxy Buds Core ofrecen comodidad y tecnología avanzada: cancelación activa de ruido (ANC), certificación IP54, Bluetooth 5.4, y hasta 35 horas de reproducción con el estuche (20 h con ANC activado. Cada auricular pesa apenas 5,3 g y el estuche 31,2 g. Incluyen funciones de Galaxy AI, como intérprete y traducción en tiempo real directamente en los auriculares. Una opción accesible y completa para el uso diario.",
      brand: "SAMSUNG",
      price: 74999.0,
      category: Category.ACCESSORY,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-samsung-galaxy-buds-core-sm-r410-wireless-blanco/2/302877.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-samsung-galaxy-buds-core-sm-r410-wireless-blanco/2/302874.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-samsung-galaxy-buds-core-sm-r410-wireless-blanco/2/302875.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/auriculares/auricular-samsung-galaxy-buds-core-sm-r410-wireless-blanco/2/302876.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Galaxy Buds Core",
          specs: {
            Conectividad: "Bluetooth 5.4",
            "Cancelación de Ruido": "Sí",
            Batería: "500 mAh",
            Autonomía: "35 h",
            "Resistencia al Agua": "IP54",
            Conector: "USB-C",
            Color: "Blanco",
            Características: "Funciones Galaxy AI",
          },
        },
      },
    },
    {
      name: "Dron DJI Neo",
      description:
        'El DJI Neo es un dron ultraligero de 135g con cámara de 12 MP y sensor 1/2", ideal para tomas aéreas en 4K a 30 fps. Tiene 22 GB de memoria interna y hasta 18 minutos de vuelo con alcance de 10 km. Ofrece modos automáticos, estabilización avanzada y control por app, mando o voz. Compacto y fácil de usar, es perfecto para creadores que buscan movilidad y calidad en cada captura.',
      brand: "DJI",
      price: 499000.0,
      category: Category.DRONE,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/drones/drone-dji-neo/2/237026.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/drones/drone-dji-neo/2/237031.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/drones/drone-dji-neo/2/237032.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/drones/drone-dji-neo/2/237151.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Neo",
          specs: {
            Conectividad: "Wi-Fi 802.11a/b/g/n/ac | Bluetooth 5.1",
            Capacidad: "1435 mAh",
            "Carga Máxima": "8,6 V",
            "Velocidad Máxima": "16 m/s",
            "Altitud Máxima": "2000 m",
            "Distancia Máxima Vuelo": "7 km",
            "Tiempo Máximo Vuelo": "18 minutos",
            "Resolución Cámara": "12 MP",
            "Sensor Cámara": "Sensor de imagen de 1/2”",
            Estabilización:
              "Estabilizador mecánico de un solo eje (inclinación)",
            "Bitrate Máx": "75 Mbps",
            "Formato Video": "MP4",
            Color: "Gris",
            Dimensiones: "130 x 157 x 48.5 mm",
          },
        },
      },
    },
    {
      name: 'Smartphone Samsung Galaxy A36 5G A366E 128GB 8GB RAM Dual SIM Pantalla 6.7" - Blanco',
      description:
        "El smartphone Galaxy A36 combina versatilidad y funciones modernas. Su pantalla Super AMOLED de 120 Hz proporciona imágenes fluidas. Equipado con un procesador Snapdragon de 8 núcleos, garantiza un alto rendimiento en la multitarea. La cámara triple de 50MP captura fotos y grabaciones detalladas en 4K. Con conexión 5G, ofrece una navegación ultrarrápida. La batería de larga duración te mantiene conectado durante más tiempo, mientras que la certificación IP67 garantiza la resistencia al agua.",
      brand: "SAMSUNG",
      price: 490350.0,
      category: Category.SMARTPHONE,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-a36-5g-a366e-128gb-8gb-ram-dual-sim-pantalla-6-7-blanco/2/269817.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-a36-5g-a366e-128gb-8gb-ram-dual-sim-pantalla-6-7-blanco/2/269814.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-a36-5g-a366e-128gb-8gb-ram-dual-sim-pantalla-6-7-blanco/2/269815.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Galaxy A36 5G",
          specs: {
            Pantalla: '6.7" Super AMOLED 120Hz',
            Procesador: "Snapdragon 8 núcleos",
            Cámara: "50MP Triple | 4K Recording",
            Conectividad: "5G",
            "Resistencia al Agua": "IP67",
            Color: "Blanco",
            RAM: "8 GB",
            Capacidad: "128 GB",
          },
        },
      },
    },
    {
      name: 'Smartphone Samsung Galaxy A36 5G A366E 128GB 8GB RAM Dual SIM Pantalla 6.7" - Púrpura',
      description:
        "El smartphone Galaxy A36 combina versatilidad y funciones modernas. Su pantalla Super AMOLED de 120 Hz proporciona imágenes fluidas. Equipado con un procesador Snapdragon de 8 núcleos, garantiza un alto rendimiento en la multitarea. La cámara triple de 50MP captura fotos y grabaciones detalladas en 4K. Con conexión 5G, ofrece una navegación ultrarrápida. La batería de larga duración te mantiene conectado durante más tiempo, mientras que la certificación IP67 garantiza la resistencia al agua.",
      brand: "SAMSUNG",
      price: 490350.0,
      category: Category.SMARTPHONE,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-a36-5g-a366e-1288gb-8gb-ram-dual-sim-pantalla-6-7-purpura/2/269828.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-a36-5g-a366e-1288gb-8gb-ram-dual-sim-pantalla-6-7-purpura/2/269829.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-a36-5g-a366e-1288gb-8gb-ram-dual-sim-pantalla-6-7-purpura/2/269830.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Galaxy A36 5G",
          specs: {
            Pantalla: '6.7" Super AMOLED 120Hz',
            Procesador: "Snapdragon 8 núcleos",
            Cámara: "50MP Triple | 4K Recording",
            Conectividad: "5G",
            "Resistencia al Agua": "IP67",
            Color: "Púrpura",
            RAM: "8 GB",
            Capacidad: "128 GB",
          },
        },
      },
    },
    {
      name: 'Smartphone Samsung Galaxy A17 5G SM-A176B 256GB 8GB RAM Dual SIM Pantalla 6.7" - Gris (Caja Slim)',
      description:
        "El Samsung Galaxy A17 5G combina conectividad moderna, 8 GB de RAM y 256 GB de almacenamiento. Su cámara de 50 MP con estabilización óptica (OIS) captura detalles sin trepidaciones. Batería de 5.000 mAh con carga rápida de 25 W y pantalla protegida con Gorilla Glass Victus brindan autonomía y resistencia para el día.",
      brand: "SAMSUNG",
      price: 445500.0,
      category: Category.SMARTPHONE,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-a17-5g-sm-a176b-256gb-8gb-ram-dual-sim-pantalla-6-7-gris-caja-slim/2/303133.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-a17-5g-sm-a176b-256gb-8gb-ram-dual-sim-pantalla-6-7-gris-caja-slim/2/303132.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-a17-5g-sm-a176b-256gb-8gb-ram-dual-sim-pantalla-6-7-gris-caja-slim/2/303134.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-a17-5g-sm-a176b-256gb-8gb-ram-dual-sim-pantalla-6-7-gris-caja-slim/2/303135.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Galaxy A17 5G",
          specs: {
            Pantalla: '6.7" Gorilla Glass Victus',
            Cámara: "50 MP OIS",
            Batería: "5000 mAh | 25W Charging",
            RAM: "8 GB",
            Capacidad: "256 GB",
            Color: "Gris",
            Conectividad: "5G",
          },
        },
      },
    },
    {
      name: 'Smartphone Samsung Galaxy A17 5G SM-A176B 256GB 8GB RAM Dual SIM Pantalla 6.7" - Azul (Caja Slim)',
      description:
        "El Samsung Galaxy A17 5G combina conectividad moderna, 8 GB de RAM y 256 GB de almacenamiento. Su cámara de 50 MP con estabilización óptica (OIS) captura detalles sin trepidaciones. Batería de 5.000 mAh con carga rápida de 25 W y pantalla protegida con Gorilla Glass Victus brindan autonomía y resistencia para el día.",
      brand: "SAMSUNG",
      price: 445500.0,
      category: Category.SMARTPHONE,
      stock: 10,
      images: {
        create: [
          {
            url: "https://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-a17-5g-sm-a176b-256gb-8gb-ram-dual-sim-pantalla-6-7-azul-caja-slim/2/300928.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-a17-5g-sm-a176b-256gb-8gb-ram-dual-sim-pantalla-6-7-azul-caja-slim/2/300927.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-a17-5g-sm-a176b-256gb-8gb-ram-dual-sim-pantalla-6-7-azul-caja-slim/2/300926.jpg",
          },
          {
            url: "https://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-a17-5g-sm-a176b-256gb-8gb-ram-dual-sim-pantalla-6-7-azul-caja-slim/2/300925.jpg",
          },
        ],
      },
      properties: {
        create: {
          model: "Galaxy A17 5G",
          specs: {
            Pantalla: '6.7" Gorilla Glass Victus',
            Cámara: "50 MP OIS",
            Batería: "5000 mAh | 25W Charging",
            RAM: "8 GB",
            Capacidad: "256 GB",
            Color: "Azul",
            Conectividad: "5G",
          },
        },
      },
    },
  ];

  for (const product of products) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Productos agregados exitosamente.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
