import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const cats = await prisma.cat.findMany();
    return res.status(200).json(cats);
  }

  if (req.method === "POST") {
    const { name, color } = req.body;
    try {
      const newCat = await prisma.cat.create({ data: { name, color } });
      return res.status(201).json(newCat);
    } catch (err) {
      return res.status(500).json({ error: "Error creating cat" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      await prisma.cat.delete({ where: { id: parseInt(id) } });
      return res.status(204).end();
    } catch (err) {
      return res.status(500).json({ error: "Error deleting cat" });
    }
  }
}