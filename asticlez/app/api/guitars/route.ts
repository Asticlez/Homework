import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/app/utils/db";

// GET: List all guitars
export async function GET() {
  try {
    const guitars = await prisma.guitar.findMany(); // Fetch guitars from the database
    return NextResponse.json(guitars);
  } catch (error) {
    console.error("Failed to fetch guitars:", error);
    return NextResponse.json({ error: "Failed to fetch guitars" }, { status: 500 });
  }
}

// POST: Add a new guitar
export async function POST(request: Request) {
  const { name, brand, price, imageUrl } = await request.json();

  // Validate input
  if (!name || !brand || !price) {
    return NextResponse.json({ error: "Name, brand, and price are required" }, { status: 400 });
  }
  if (isNaN(price) || price <= 0) {
    return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 });
  }

  try {
    const newGuitar = await prisma.guitar.create({
      data: {
        name,
        brand,
        price: parseFloat(price),
        imageUrl: imageUrl || null,
        likeScore: 0, // Default like score
      },
    });

    return NextResponse.json(newGuitar, { status: 201 });
  } catch (error) {
    console.error("Failed to create guitar:", error);
    return NextResponse.json({ error: "Failed to create guitar" }, { status: 500 });
  }
}

// PUT: Update a guitar by ID
export async function PUT(request: Request) {
  const { id, name, brand, price, imageUrl } = await request.json();

  // Validate input
  if (!id || !name || !brand || !price) {
    return NextResponse.json({ error: "ID, name, brand, and price are required" }, { status: 400 });
  }
  if (isNaN(price) || price <= 0) {
    return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 });
  }

  try {
    const updatedGuitar = await prisma.guitar.update({
      where: { id },
      data: {
        name,
        brand,
        price: parseFloat(price),
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json(updatedGuitar);
  } catch (error) {
    console.error("Failed to update guitar:", error);
    return NextResponse.json({ error: "Guitar not found or update failed" }, { status: 404 });
  }
}

// DELETE: Delete a guitar by ID
export async function DELETE(request: Request) {
  const { id } = await request.json();

  // Validate input
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    await prisma.guitar.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Guitar deleted successfully" });
  } catch (error) {
    console.error("Failed to delete guitar:", error);
    return NextResponse.json({ error: "Failed to delete guitar" }, { status: 500 });
  }
}

// PATCH: Increment like score for a guitar by ID
export async function PATCH(request: Request) {
  const { id } = await request.json();

  // Validate input
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const updatedGuitar = await prisma.guitar.update({
      where: { id },
      data: { likeScore: { increment: 1 } },
    });

    return NextResponse.json(updatedGuitar);
  } catch (error) {
    console.error("Failed to update like score:", error);
    return NextResponse.json({ error: "Failed to update like score" }, { status: 500 });
  }
}
