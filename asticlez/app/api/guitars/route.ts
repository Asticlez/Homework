import { NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

// File path for `guitar.json`
const filePath = path.resolve(process.cwd(), 'guitar.json');

// Zod Schema for Guitar Validation
const GuitarSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.number().positive("Price must be a positive number"),
});

// Helper functions to read/write `guitar.json`
const readGuitars = () => {
  if (!fs.existsSync(filePath)) {
    // If `guitar.json` doesn't exist, initialize it with an empty array
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeGuitars = (data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// GET: List all guitars
export async function GET() {
  const guitars = readGuitars();
  return NextResponse.json(guitars);
}

// POST: Add a new guitar
export async function POST(request: Request) {
  const { name, brand, price } = await request.json();

  // Validate input with Zod
  const validatedData = GuitarSchema.safeParse({ name, brand, price });
  if (!validatedData.success) {
    return NextResponse.json({ error: validatedData.error.errors }, { status: 400 });
  }

  const guitars = readGuitars();
  const newGuitar = {
    id: (guitars.length + 1).toString(),
    name,
    brand,
    price,
  };

  guitars.push(newGuitar);
  writeGuitars(guitars);

  return NextResponse.json(newGuitar);
}

// DELETE: Delete a guitar by ID
export async function DELETE(request: Request) {
  const { id } = await request.json();
  let guitars = readGuitars();
  const filteredGuitars = guitars.filter((guitar) => guitar.id !== id);

  if (filteredGuitars.length === guitars.length) {
    return NextResponse.json({ error: "Guitar not found" }, { status: 404 });
  }

  writeGuitars(filteredGuitars);

  return NextResponse.json({ message: "Guitar deleted successfully" });
}

// PUT: Update a guitar by ID
export async function PUT(request: Request) {
  const { id, name, brand, price } = await request.json();

  // Validate input with Zod
  const validatedData = GuitarSchema.safeParse({ name, brand, price });
  if (!validatedData.success) {
    return NextResponse.json({ error: validatedData.error.errors }, { status: 400 });
  }

  const guitars = readGuitars();
  const guitarIndex = guitars.findIndex((guitar) => guitar.id === id);
  if (guitarIndex === -1) {
    return NextResponse.json({ error: "Guitar not found" }, { status: 404 });
  }

  guitars[guitarIndex] = { id, name, brand, price };
  writeGuitars(guitars);

  return NextResponse.json(guitars[guitarIndex]);
}