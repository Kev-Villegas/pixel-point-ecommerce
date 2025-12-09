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
    {
      name: 'Consola Portátil Valve Steam Deck V004921-00 1TB 16GB RAM Pantalla 7" - Blanco',
      description:
        "La nueva generación llega a la consola portátil Steam Deck, ahora con pantalla OLED de 7.4 pulgadas con frecuencia de actualización de 90Hz, gatillos analógicos y 2 trackpads con respuesta táctil de alta definición, conexión Bluetooth y Wi-Fi 6, batería ampliada con mayor duración hasta 12 horas, procesador AMD Zen 2 de 4 núcleos y 8 hilos, 16 GB de RAM para velocidad en diversas tareas y sistema operativo SteamOS 3.0, hecho para soportar hasta los juegos más recientes.",
      brand: "VALVE",
      price: 1530000.0,
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
            capacity: "1 TB",
            ram: "16 GB",
            operatingsystem: "SteamOS 3.0",
            processor: "Zen 2 4c/8t, 2,4-3,5 GHz (hasta 448 GFlops FP32)",
            graphics: "8 RDNA 2 CUs, 1,0-1,6 GHz (até 1,6 TFlops FP32)",
            connectivity: "Wi-Fi banda dupla 802.11a | Bluetooth 5.0",
            screentype: "OLED HDR",
            screenresolution: "1280 x 800p",
            interface: "USB-C | 3,5 mm",
            audio: "DSP integrado",
            controls: "IMU incorporada y botones táctiles capacitivos",
            sensors: "Sensor de luz ambiental",
            trackpads:
              "2 trackpads cuadrados de 32,5 mm con retroalimentación háptica",
            battery: "45 W con cable de 2,5 m",
            color: "Blanco",
            features: "Estuche de viaje",
            observations: "Cargador 3 Pines*",
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
            version: "Global",
            operatingsystem: "Android 15, One UI 7",
            capacity: "512 GB",
            ram: "12 GB",
            processor: "Qualcomm Snapdragon 8 Elite",
            graphics: "Adreno 830",
            chipset: "Qualcomm SM8750-AB Snapdragon 8 Elite",
            simcard: "Dual SIM",
            connectivity: "Wi-Fi 7 | Bluetooth 5.4",
            navigation: "GPS | GLONASS | BDS | GALILEO",
            network2g: "GSM 850 / 900 / 1800 / 1900",
            network3g: "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
            network4g: "LTE",
            network5g: "SA/NSA/Sub6/mmWave",
            screentype: "Dynamic AMOLED 2X | 120Hz | HDR10+",
            screensize: '6.8"',
            screenresolution: "1440 x 3120p",
            rearcamera: "200 MP | 50 MP | 10 MP | 50 MP",
            frontcamera: "12MP",
            audio: "Altavoces estéreo",
            battery: "5000 mAh",
            fastcharging: "Sí",
            sensors:
              "Huella digital bajo la pantalla | Acelerómetro | Giroscopio | Sensor de proximidad | Brújula | Barómetro",
            color: "Gris",
            weight: "218 g",
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
            operatingsystem: "Android 15",
            capacity: "512 GB",
            ram: "12 GB",
            processor:
              "Octa-core (2x4.47 GHz Oryon V2 Phoenix L + 6x3.53 GHz Oryon V2 Phoenix M)",
            graphics: "Adreno 830",
            chipset: "Qualcomm SM8750-AB Snapdragon 8 Elite",
            simcard: "Nano-SIM | eSIM",
            connectivity:
              "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band, Wi-Fi Direct, Bluetooth 5.4",
            navigation: "GPS, GLONASS, BDS, GALILEO, QZSS",
            network2g: "GSM 850 / 900 / 1800 / 1900",
            network3g: "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
            network4g:
              "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 32, 38, 39, 40, 41, 66",
            network5g:
              "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 38, 40, 41, 66, 75, 77, 78 SA/NSA/Sub6",
            screentype: "AMOLED 2X, 120Hz",
            screensize: '6.9"',
            screenresolution: "1440 x 3120",
            rearcamera: "200 MP | 10 MP | 50 MP | 50 MP",
            frontcamera: "12MP",
            audio: "Altavoces estéreo",
            battery: "5000 mAh",
            fastcharging: "Sí",
            sensors:
              "Huella dactilar (pantalla, ultrasónico), acelerómetro, giroscopio, proximidad, brújula,                                barómetro",
            color: "Plata Titanio",
            features: "Resistente al polvo y al agua IP68",
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
            operatingsystem: "Android 15",
            capacity: "256 GB",
            ram: "12 GB",
            processor: "Snapdragon 8 Elite",
            chipset: "Snapdragon 8 Elite",
            simcard: "Dual nano-SIM",
            connectivity: "Wi-Fi 7 | Bluetooth 5.4",
            navigation: "GPS, GLONASS, BeiDou, Galileo",
            network2g: "GSM 850 / 900 / 1800 / 1900",
            network3g: "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
            network4g:
              "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 32, 38, 39, 40, 41, 66",
            network5g:
              "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 38, 40, 41, 66, 75, 77, 78 SA/NSA/Sub6",
            screentype: "Dynamic LTPO AMOLED",
            screensize: '6,7"',
            screenresolution: "3120×1440",
            rearcamera: "200MP | 12MP",
            frontcamera: "12MP",
            audio: "Altavoces estéreo",
            fastcharging: "Sí",
            sensors:
              "Huella bajo pantalla (ultrasónica), acelerómetro, giroscopio, proximidad, brújula, barómetro",
            color: "Negro",
            observations: "Caja Slim*",
            weight: "163g",
            dimensions: "158,2×75,6×5,8mm",
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
            operatingsystem: "Android 15",
            capacity: "256 GB",
            ram: "12 GB",
            processor: "Snapdragon 8 Elite",
            chipset: "Snapdragon 8 Elite",
            simcard: "Dual nano-SIM",
            connectivity: "Wi-Fi 7 | Bluetooth 5.4",
            navigation: "GPS, GLONASS, BeiDou, Galileo",
            network2g: "GSM 850 / 900 / 1800 / 1900",
            network3g: "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
            network4g:
              "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 32, 38, 39, 40, 41, 66",
            network5g:
              "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 38, 40, 41, 66, 75, 77, 78 SA/NSA/Sub6",
            screentype: "Dynamic LTPO AMOLED",
            screensize: '6,7"',
            screenresolution: "3120×1440",
            rearcamera: "200MP | 12MP",
            frontcamera: "12MP",
            audio: "Altavoces estéreo",
            fastcharging: "Sí",
            sensors:
              "Huella bajo pantalla (ultrasónica), acelerómetro, giroscopio, proximidad, brújula, barómetro",
            color: "Azul",
            observations: "Caja Slim*",
            weight: "163g",
            dimensions: "158,2×75,6×5,8mm",
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
            interface: "USB",
            compatibilidad: "Windows | macOS | Linux",
            camara: "Webcam",
            screenresolution: "4K 3840 × 2160",
            tasadecuadros: "30 fps",
            campodevision: "360°",
            zoom: "Zoom digital",
            enfoque: "Auto-enfoque inteligente",
            microfonointegrado: "Sí",
            sensors: "CMOS",
            alimentacion: "Via USB",
            color: "Preto",
            features:
              "Corrección automática de luz, micrófonos con cancelación de ruido, plug-and-play, tapa física para privacidad",
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
