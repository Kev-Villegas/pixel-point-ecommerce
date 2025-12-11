import { prisma } from "../app/_lib/prisma.js";
import { Category } from "@prisma/client";

async function main() {
  // Borrar en orden correcto respetando las relaciones de claves foráneas
  // console.log("🗑️  Borrando todos los datos de la base de datos...");

  // 1. Primero borrar las tablas que dependen de otras (tablas hijas)
  // await prisma.orderItem.deleteMany({});
  // console.log("✅ OrderItems borrados");

  // await prisma.like.deleteMany({});
  // console.log("✅ Likes borrados");

  // await prisma.image.deleteMany({});
  // console.log("✅ Images borradas");

  // await prisma.properties.deleteMany({});
  // console.log("✅ Properties borradas");

  // await prisma.shipmentData.deleteMany({});
  // console.log("✅ ShipmentData borrados");

  // await prisma.account.deleteMany({});
  // console.log("✅ Accounts borradas");

  // await prisma.session.deleteMany({});
  // console.log("✅ Sessions borradas");

  // await prisma.verificationToken.deleteMany({});
  // console.log("✅ VerificationTokens borrados");

  // await prisma.order.deleteMany({});
  // console.log("✅ Orders borradas");

  // await prisma.product.deleteMany({});
  // console.log("✅ Products borrados");

  // await prisma.user.deleteMany({});
  // console.log("✅ Users borrados");

  // console.log("\n🎉 Todos los datos han sido borrados exitosamente\n");
  // console.log("📝 Insertando productos de ejemplo...");

  const products = [
    // {
    //   name: 'Consola Portátil Valve Steam Deck V004921-00 1TB 16GB RAM Pantalla 7" - Blanco',
    //   description:
    //     "La nueva generación llega a la consola portátil Steam Deck, ahora con pantalla OLED de 7.4 pulgadas con frecuencia de actualización de 90Hz, gatillos analógicos y 2 trackpads con respuesta táctil de alta definición, conexión Bluetooth y Wi-Fi 6, batería ampliada con mayor duración hasta 12 horas, procesador AMD Zen 2 de 4 núcleos y 8 hilos, 16 GB de RAM para velocidad en diversas tareas y sistema operativo SteamOS 3.0, hecho para soportar hasta los juegos más recientes.",
    //   brand: "VALVE",
    //   price: 1530000.0,
    //   category: Category.CONSOLE,
    //   stock: 10,
    //   images: {
    //     create: [
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/consola-portatil/consola-portatil-valve-steam-deck-v004921-00-1tb-16gb-ram-pantalla-7-blanco/1/1254372.jpg",
    //       },
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/consola-portatil/consola-portatil-valve-steam-deck-v004921-00-1tb-16gb-ram-pantalla-7-blanco/2/1254372.jpg",
    //       },
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/consola-portatil/consola-portatil-valve-steam-deck-v004921-00-1tb-16gb-ram-pantalla-7-blanco/3/1254372.jpg",
    //       },
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/consola-portatil/consola-portatil-valve-steam-deck-v004921-00-1tb-16gb-ram-pantalla-7-blanco/4/1254372.jpg",
    //       },
    //     ],
    //   },
    //   properties: {
    //     create: {
    //       model: "Steam Deck",
    //       specs: {
    //         capacity: "1 TB",
    //         ram: "16 GB",
    //         operatingsystem: "SteamOS 3.0",
    //         processor: "Zen 2 4c/8t, 2,4-3,5 GHz (hasta 448 GFlops FP32)",
    //         graphics: "8 RDNA 2 CUs, 1,0-1,6 GHz (até 1,6 TFlops FP32)",
    //         connectivity: "Wi-Fi banda dupla 802.11a | Bluetooth 5.0",
    //         screentype: "OLED HDR",
    //         screenresolution: "1280 x 800p",
    //         interface: "USB-C | 3,5 mm",
    //         audio: "DSP integrado",
    //         controls: "IMU incorporada y botones táctiles capacitivos",
    //         sensors: "Sensor de luz ambiental",
    //         trackpads:
    //           "2 trackpads cuadrados de 32,5 mm con retroalimentación háptica",
    //         battery: "45 W con cable de 2,5 m",
    //         color: "Blanco",
    //         features: "Estuche de viaje",
    //         observations: "Cargador 3 Pines*",
    //       },
    //     },
    //   },
    // },
    // {
    //   name: 'Smartphone Samsung Galaxy S25 5G SM-S938B Global 512GB 12GB RAM Dual SIM Pantalla 6.2" - Gris',
    //   description:
    //     'Smartphone con pantalla AMOLED 2X de 6,9" QHD+ y tasa de 120Hz adaptativa. El Galaxy S25 Ultra integra Snapdragon 8 Elite, 12 GB de RAM y 512 GB de almacenamiento. Cámara principal de 200 MP, ultra gran angular de 50 MP y zoom óptico de hasta 5x. Batería de 5000 mAh con carga rápida de 45W y carga inalámbrica de 15W. Resistente al agua y polvo (IP68), con Android 15 y One UI 7.',
    //   brand: "SAMSUNG",
    //   price: 1770000.0,
    //   category: Category.SMARTPHONE,
    //   stock: 10,
    //   images: {
    //     create: [
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-5g-sm-s938b-global-512gb-12gb-ram-dual-sim-pantalla-6-2-gris/1/1203790.jpg",
    //       },
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-5g-sm-s938b-global-512gb-12gb-ram-dual-sim-pantalla-6-2-gris/2/1203790.jpg",
    //       },
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-5g-sm-s938b-global-512gb-12gb-ram-dual-sim-pantalla-6-2-gris/3/1203790.jpg",
    //       },
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-5g-sm-s938b-global-512gb-12gb-ram-dual-sim-pantalla-6-2-gris/4/1203790.jpg",
    //       },
    //     ],
    //   },
    //   properties: {
    //     create: {
    //       model: "Samsung Galaxy S25 Ultra",
    //       specs: {
    //         version: "Global",
    //         operatingsystem: "Android 15, One UI 7",
    //         capacity: "512 GB",
    //         ram: "12 GB",
    //         processor: "Qualcomm Snapdragon 8 Elite",
    //         graphics: "Adreno 830",
    //         chipset: "Qualcomm SM8750-AB Snapdragon 8 Elite",
    //         simcard: "Dual SIM",
    //         connectivity: "Wi-Fi 7 | Bluetooth 5.4",
    //         navigation: "GPS | GLONASS | BDS | GALILEO",
    //         network2g: "GSM 850 / 900 / 1800 / 1900",
    //         network3g: "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
    //         network4g: "LTE",
    //         network5g: "SA/NSA/Sub6/mmWave",
    //         screentype: "Dynamic AMOLED 2X | 120Hz | HDR10+",
    //         screensize: '6.8"',
    //         screenresolution: "1440 x 3120p",
    //         rearcamera: "200 MP | 50 MP | 10 MP | 50 MP",
    //         frontcamera: "12MP",
    //         audio: "Altavoces estéreo",
    //         battery: "5000 mAh",
    //         fastcharging: "Sí",
    //         sensors:
    //           "Huella digital bajo la pantalla | Acelerómetro | Giroscopio | Sensor de proximidad | Brújula | Barómetro",
    //         color: "Gris",
    //         weight: "218 g",
    //       },
    //     },
    //   },
    // },
    // {
    //   name: 'Smartphone Samsung Galaxy S25 Ultra 5G SM-S938B 512GB 12GB RAM Dual SIM Pantalla 6.9" - Plata Titanio',
    //   description:
    //     "El smartphone S25 Ultra combina un diseño elegante, funciones modernas y alto rendimiento. Su pantalla AMOLED de 120Hz ofrece imágenes fluidas. La cámara cuádruple de 200 MP graba en 8K, lo que garantiza fotos y videos con gran detalle. Equipado con un procesador Snapdragon de 8 núcleos y conexión 5G, proporciona velocidad y eficiencia. La certificación IP68 garantiza la resistencia al agua y al polvo, mientras que la batería de larga duración garantiza un uso más prolongado.",
    //   brand: "SAMSUNG",
    //   price: 1770000.0,
    //   category: Category.SMARTPHONE,
    //   stock: 10,
    //   images: {
    //     create: [
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-ultra-5g-sm-s938b-512gb-12gb-ram-dual-sim-pantalla-6-9-plata-titanio/1/1189025.jpg",
    //       },
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-ultra-5g-sm-s938b-512gb-12gb-ram-dual-sim-pantalla-6-9-plata-titanio/2/1189025.jpg",
    //       },
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-ultra-5g-sm-s938b-512gb-12gb-ram-dual-sim-pantalla-6-9-plata-titanio/3/1189025.jpg",
    //       },
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-ultra-5g-sm-s938b-512gb-12gb-ram-dual-sim-pantalla-6-9-plata-titanio/4/1189025.jpg",
    //       },
    //     ],
    //   },
    //   properties: {
    //     create: {
    //       model: "S25 Ultra",
    //       specs: {
    //         operatingsystem: "Android 15",
    //         capacity: "512 GB",
    //         ram: "12 GB",
    //         processor:
    //           "Octa-core (2x4.47 GHz Oryon V2 Phoenix L + 6x3.53 GHz Oryon V2 Phoenix M)",
    //         graphics: "Adreno 830",
    //         chipset: "Qualcomm SM8750-AB Snapdragon 8 Elite",
    //         simcard: "Nano-SIM | eSIM",
    //         connectivity:
    //           "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band, Wi-Fi Direct, Bluetooth 5.4",
    //         navigation: "GPS, GLONASS, BDS, GALILEO, QZSS",
    //         network2g: "GSM 850 / 900 / 1800 / 1900",
    //         network3g: "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
    //         network4g:
    //           "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 32, 38, 39, 40, 41, 66",
    //         network5g:
    //           "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 38, 40, 41, 66, 75, 77, 78 SA/NSA/Sub6",
    //         screentype: "AMOLED 2X, 120Hz",
    //         screensize: '6.9"',
    //         screenresolution: "1440 x 3120",
    //         rearcamera: "200 MP | 10 MP | 50 MP | 50 MP",
    //         frontcamera: "12MP",
    //         audio: "Altavoces estéreo",
    //         battery: "5000 mAh",
    //         fastcharging: "Sí",
    //         sensors:
    //           "Huella dactilar (pantalla, ultrasónico), acelerómetro, giroscopio, proximidad, brújula,                                barómetro",
    //         color: "Plata Titanio",
    //         features: "Resistente al polvo y al agua IP68",
    //       },
    //     },
    //   },
    // },
    // {
    //   name: 'Smartphone Samsung Galaxy S25 Edge SM-S937B 256GB 12GB RAM Dual SIM Pantalla 6.7" - Negro (Caja Slim)',
    //   description:
    //     'Estilo premium y potencia que se adapta a vos. El Galaxy S25 Edge combina pantalla Dynamic AMOLED 2X de 6,7" a 120 Hz con cuerpo delgado de titanio, brindando comodidad y diseño refinado. Sus 12 GB de RAM y 256 GB de memoria aseguran fluidez incluso en tareas pesadas. La cámara de 200 MP captura cada detalle con calidad profesional. Ideal para quienes editan, juegan o trabajan desde el móvil y buscan velocidad, buena imagen y autonomía real.',
    //   brand: "SAMSUNG",
    //   price: 1182500.0,
    //   category: Category.SMARTPHONE,
    //   stock: 10,
    //   images: {
    //     create: [
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-edge-sm-s937b-256gb-12gb-ram-dual-sim-pantalla-6-7-negro-caja-slim/1/1299540.jpg",
    //       },
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-edge-sm-s937b-256gb-12gb-ram-dual-sim-pantalla-6-7-negro-caja-slim/2/1299540.jpg",
    //       },
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-edge-sm-s937b-256gb-12gb-ram-dual-sim-pantalla-6-7-negro-caja-slim/3/1299540.jpg",
    //       },
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-edge-sm-s937b-256gb-12gb-ram-dual-sim-pantalla-6-7-negro-caja-slim/4/1299540.jpg",
    //       },
    //     ],
    //   },
    //   properties: {
    //     create: {
    //       model: "S25 Edge",
    //       specs: {
    //         operatingsystem: "Android 15",
    //         capacity: "256 GB",
    //         ram: "12 GB",
    //         processor: "Snapdragon 8 Elite",
    //         chipset: "Snapdragon 8 Elite",
    //         simcard: "Dual nano-SIM",
    //         connectivity: "Wi-Fi 7 | Bluetooth 5.4",
    //         navigation: "GPS, GLONASS, BeiDou, Galileo",
    //         network2g: "GSM 850 / 900 / 1800 / 1900",
    //         network3g: "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
    //         network4g:
    //           "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 32, 38, 39, 40, 41, 66",
    //         network5g:
    //           "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 38, 40, 41, 66, 75, 77, 78 SA/NSA/Sub6",
    //         screentype: "Dynamic LTPO AMOLED",
    //         screensize: '6,7"',
    //         screenresolution: "3120×1440",
    //         rearcamera: "200MP | 12MP",
    //         frontcamera: "12MP",
    //         audio: "Altavoces estéreo",
    //         fastcharging: "Sí",
    //         sensors:
    //           "Huella bajo pantalla (ultrasónica), acelerómetro, giroscopio, proximidad, brújula, barómetro",
    //         color: "Negro",
    //         observations: "Caja Slim*",
    //         weight: "163g",
    //         dimensions: "158,2×75,6×5,8mm",
    //       },
    //     },
    //   },
    // },
    // {
    //   name: 'Smartphone Samsung Galaxy S25 Edge SM-S937B 256GB 12GB RAM Dual SIM Pantalla 6.7" - Azul (Caja Slim)',
    //   description:
    //     'Estilo premium y potencia que se adapta a vos. El Galaxy S25 Edge combina pantalla Dynamic AMOLED 2X de 6,7" a 120 Hz con cuerpo delgado de titanio, brindando comodidad y diseño refinado. Sus 12 GB de RAM y 256 GB de memoria aseguran fluidez incluso en tareas pesadas. La cámara de 200 MP captura cada detalle con calidad profesional. Ideal para quienes editan, juegan o trabajan desde el móvil y buscan velocidad, buena imagen y autonomía real.',
    //   brand: "SAMSUNG",
    //   price: 1182500.0,
    //   category: Category.SMARTPHONE,
    //   stock: 10,
    //   images: {
    //     create: [
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-edge-sm-s937b-256gb-12gb-ram-dual-sim-pantalla-6-7-azul-caja-slim/1/1299557.jpg",
    //       },
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-edge-sm-s937b-256gb-12gb-ram-dual-sim-pantalla-6-7-azul-caja-slim/2/1299557.jpg",
    //       },
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-edge-sm-s937b-256gb-12gb-ram-dual-sim-pantalla-6-7-azul-caja-slim/3/1299557.jpg",
    //       },
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/smartphones/smartphone-samsung-galaxy-s25-edge-sm-s937b-256gb-12gb-ram-dual-sim-pantalla-6-7-azul-caja-slim/4/1299557.jpg",
    //       },
    //     ],
    //   },
    //   properties: {
    //     create: {
    //       model: "S25 Edge",
    //       specs: {
    //         operatingsystem: "Android 15",
    //         capacity: "256 GB",
    //         ram: "12 GB",
    //         processor: "Snapdragon 8 Elite",
    //         chipset: "Snapdragon 8 Elite",
    //         simcard: "Dual nano-SIM",
    //         connectivity: "Wi-Fi 7 | Bluetooth 5.4",
    //         navigation: "GPS, GLONASS, BeiDou, Galileo",
    //         network2g: "GSM 850 / 900 / 1800 / 1900",
    //         network3g: "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
    //         network4g:
    //           "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 32, 38, 39, 40, 41, 66",
    //         network5g:
    //           "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 38, 40, 41, 66, 75, 77, 78 SA/NSA/Sub6",
    //         screentype: "Dynamic LTPO AMOLED",
    //         screensize: '6,7"',
    //         screenresolution: "3120×1440",
    //         rearcamera: "200MP | 12MP",
    //         frontcamera: "12MP",
    //         audio: "Altavoces estéreo",
    //         fastcharging: "Sí",
    //         sensors:
    //           "Huella bajo pantalla (ultrasónica), acelerómetro, giroscopio, proximidad, brújula, barómetro",
    //         color: "Azul",
    //         observations: "Caja Slim*",
    //         weight: "163g",
    //         dimensions: "158,2×75,6×5,8mm",
    //       },
    //     },
    //   },
    // },
    // {
    //   name: "Webcam Redragon Cyberlens GW911 Ultra HD 4K Micrófono Integrado - Negro",
    //   description:
    //     "Imagen clara y profesional para videollamadas, streaming o clases en línea. La Webcam Redragon GW911 ofrece resolución 4K Ultra HD, logrando vídeos nítidos y detallados en conferencias, clases o transmisiones. El autoenfoque inteligente y la corrección automática de luz mantienen tu imagen clara incluso con poca iluminación. Los micrófonos duales con cancelación de ruido eliminan sonidos externos, garantizando voz limpia durante llamadas. Ideal para trabajo remoto, clases o streaming.",
    //   brand: "REDRAGON",
    //   price: 107850.0,
    //   category: Category.PERIPHERAL,
    //   stock: 10,
    //   images: {
    //     create: [
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/webcams/webcam-redragon-cyberlens-gw911-ultra-hd-4k-microfono-integrado-negro/1/1295443.jpg",
    //       },
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/webcams/webcam-redragon-cyberlens-gw911-ultra-hd-4k-microfono-integrado-negro/2/1295443.jpg",
    //       },
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/webcams/webcam-redragon-cyberlens-gw911-ultra-hd-4k-microfono-integrado-negro/3/1295443.jpg",
    //       },
    //       {
    //         url: "http://www.atacadoconnect.com/imagem/webcams/webcam-redragon-cyberlens-gw911-ultra-hd-4k-microfono-integrado-negro/4/1295443.jpg",
    //       },
    //     ],
    //   },
    //   properties: {
    //     create: {
    //       model: "Cyberlens",
    //       specs: {
    //         interface: "USB",
    //         compatibilidad: "Windows | macOS | Linux",
    //         camara: "Webcam",
    //         screenresolution: "4K 3840 × 2160",
    //         tasadecuadros: "30 fps",
    //         campodevision: "360°",
    //         zoom: "Zoom digital",
    //         enfoque: "Auto-enfoque inteligente",
    //         microfonointegrado: "Sí",
    //         sensors: "CMOS",
    //         alimentacion: "Via USB",
    //         color: "Preto",
    //         features:
    //           "Corrección automática de luz, micrófonos con cancelación de ruido, plug-and-play, tapa física para privacidad",
    //       },
    //     },
    //   },
    // },
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
            tipodeconexion: "Con cable",
            conector: "Mini Jack 3.5 mm",
            frecuenciaderespuesta: "20 Hz - 20 kHz",
            impedancia: "32k Ohms | 1 kHz",
            drivers: "50 mm",
            microfono: "Omnidireccional",
            sensibilidaddelmicrofono: "-41dB (+/-3dB)",
            compatibilidad: "PC, PS4/5, Xbox One, X | S, Mobile",
            longituddelcable: "1.8 m",
            color: "Carbón",
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
            tipodeconexion: "Con cable",
            conector: "Mini Jack 3.5 mm",
            frecuenciaderespuesta: "10 Hz - 28 kHz",
            impedancia: "32 ohm",
            drivers: "50 mm",
            microfono: "Bidireccional",
            sensibilidaddelmicrofono: "-40,5 dBV (1 V/Pa a 1 kHz)",
            calidaddesonido: "DTS Headphone:X Spatial Audio",
            controldevolumen: "Integrado",
            iluminacion: "No",
            material: "Plástico",
            color: "Negro",
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
            tipodeconexion: "Con cable",
            interfaz: "USB",
            conector: "Mini Jack 3.5 mm",
            alcance: "2 m",
            frecuenciaderespuesta: "20 Hz - 20 kHz",
            impedancia: "64O ± 15% (f = 1KHZ)",
            drivers: "53 mm",
            microfono:
              "Omnidireccional | Micrófono Desmontable con Captación de voz Totalmente Libre de Ruido para su Comunicación en el Juego",
            sensibilidaddelmicrofono: "-42 ± 3dB",
            calidaddesonido: "7.1 Surround",
            compatibilidad: "PC | PS4, PS3 | Xbox One | Switch | Smartphones",
            material:
              "Almohadillas Courino de Calidad Avanzada para Mayor Durabilidad",
            color: "Blanco",
            features:
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
            tipodeconexion: "Sin cable",
            conectividad: "Bluetooth 5.3 | AUX 3,5 mm",
            conector: "Mini Jack 3.5 mm",
            alcance: "15 m",
            frecuenciaderespuesta: "20 Hz – 20 kHz",
            impedancia: "16",
            drivers: "40 mm",
            microfono: "Integrado",
            calidaddesonido: "Audio estéreo",
            longituddelcable: "1,2m",
            battery: "500 mAh",
            autonomiadelabateria: "50h",
            tiempodecarga: "2–3h",
            color: "Negro",
            features: "Cancelación activa de ruido (ANC)",
            weight: "327g",
            dimensions: "186 × P83 × A182 mm",
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
            tipodeconexion: "Con cable",
            conector: "USB",
            impedancia: "32 ohm",
            drivers: "40 mm",
            sensibilidaddelmicrofono: "-42 ± 3dB",
            calidaddesonido: "7.1 Virtual",
            longituddelcable: "2 m",
            material: "Almohadillas de cuero",
            color: "Blanco",
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
          // {
          //     url: "http://www.atacadoconnect.com/imagem/headsets/headset-gamer-kingston-hyper-x-cloud-stinger-hx-hscs-bk-na-negro/2/383721.jpg"
          // },
          // {
          //     url: "http://www.atacadoconnect.com/imagem/headsets/headset-gamer-kingston-hyper-x-cloud-stinger-hx-hscs-bk-na-negro/3/383721.jpg"
          // },
          // {
          //     url: "http://www.atacadoconnect.com/imagem/headsets/headset-gamer-kingston-hyper-x-cloud-stinger-hx-hscs-bk-na-negro/4/383721.jpg"
          // }
        ],
      },
      properties: {
        create: {
          model: "Hyper X Cloud Stinger",
          specs: {
            frecuenciaderespuesta: "18-23.000 Hz",
            impedancia: "30 ohms",
            compatibilidad: "PC | Mac | S4 | Xbox | Nintendo Swicth",
            longituddelcable: "1.6 m",
            color: "Negro",
            weight: "275 g",
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
