import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const cats = await prisma.cat.findMany();
  return new Response(JSON.stringify(cats), { status: 200 });
}

export async function POST(request) {
  const { name, color } = await request.json();
  const newCat = await prisma.cat.create({
    data: { name, color },
  });
  return new Response(JSON.stringify(newCat), { status: 201 });
}

export async function DELETE(request) {
  const { id } = await request.json();
  await prisma.cat.delete({ where: { id: parseInt(id, 10) } });
  return new Response(null, { status: 204 });
}