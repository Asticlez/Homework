import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; // Import Prisma Client

const prisma = new PrismaClient(); // Initialize Prisma Client

// GET: List all guitars
export async function GET() {
  try {
    const guitars = await prisma.guitar.findMany(); // Fetch guitars from the database
    return NextResponse.json(guitars);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch guitars" }, { status: 500 });
  }
}

// POST: Add a new guitar
export async function POST(request: Request) {
  const { name, brand, price, imageUrl } = await request.json();

  try {
    const newGuitar = await prisma.guitar.create({
      data: { name, brand, price, imageUrl }, // Create a new guitar in the database
    });

    return NextResponse.json(newGuitar, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add guitar" }, { status: 500 });
  }
}

// DELETE: Delete a guitar by ID
export async function DELETE(request: Request) {
  const { id } = await request.json();

  try {
    const deletedGuitar = await prisma.guitar.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Guitar deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete guitar" }, { status: 500 });
  }
}

// PUT: Update a guitar by ID
export async function PUT(request: Request) {
  const { id, name, brand, price, imageUrl } = await request.json();

  try {
    const updatedGuitar = await prisma.guitar.update({
      where: { id },
      data: { name, brand, price, imageUrl },
    });

    return NextResponse.json(updatedGuitar);
  } catch (error) {
    return NextResponse.json({ error: "Guitar not found or update failed" }, { status: 404 });
  }
}