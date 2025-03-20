import { auth } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      include: { shipments: true },
    });

    if (!user || !user.shipments.length) {
      return NextResponse.json(
        { error: "No hay datos de envío" },
        { status: 404 },
      );
    }

    return NextResponse.json(user.shipments, { status: 200 });
  } catch (error) {
    console.error("Error obteniendo ShipmentData:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

// export async function POST(request: NextRequest) {
//   try {
//     const session = await auth();

//     if (!session?.user?.email) {
//       return NextResponse.json({ error: "No autorizado" }, { status: 401 });
//     }

//     const user = await db.user.findUnique({
//       where: { email: session.user.email },
//     });

//     if (!user) {
//       return NextResponse.json(
//         { error: "Usuario no encontrado" },
//         { status: 404 },
//       );
//     }

//     const body = await request.json();

//     const newShipment = await db.shipmentData.create({
//       data: {
//         phoneNumber: body.phoneNumber,
//         streetName: body.streetName,
//         streetNumber: body.streetNumber,
//         province: body.province,
//         city: body.city,
//         postalCode: body.postalCode,
//         apartment: body.apartment,
//         floor: body.floor,
//         userId: user.id,
//       },
//     });

//     return NextResponse.json(newShipment, { status: 201 });
//   } catch (error) {
//     console.error("Error creando ShipmentData:", error);
//     return NextResponse.json(
//       { error: "Error interno del servidor" },
//       { status: 500 },
//     );
//   }
// }

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      include: { shipments: true },
    });

    if (!user || !user.shipments.length) {
      return NextResponse.json(
        { error: "No hay datos de envío registrados" },
        { status: 404 },
      );
    }

    const body = await request.json();

    const updatedShipment = await db.shipmentData.update({
      where: { id: user.shipments[0].id }, // Actualiza el primer registro
      data: {
        phoneNumber: body.phoneNumber || user.shipments[0].phoneNumber,
        streetName: body.streetName || user.shipments[0].streetName,
        streetNumber: body.streetNumber || user.shipments[0].streetNumber,
        province: body.province || user.shipments[0].province,
        city: body.city || user.shipments[0].city,
        postalCode: body.postalCode || user.shipments[0].postalCode,
        apartment: body.apartment || user.shipments[0].apartment,
        floor: body.floor || user.shipments[0].floor,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedShipment, { status: 200 });
  } catch (error) {
    console.error("Error actualizando ShipmentData:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
