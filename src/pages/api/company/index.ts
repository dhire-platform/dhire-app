import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import prisma from 'prisma/client';

async function createCompany(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const {
    name,
    website,
    logo,
    description,
    size,
    type,
    industry,
    founded,
    markets,
    funding,
    location,
  } = req.body as {
    name: string;
    website?: string;
    logo?: string;
    description?: string;
    size?: number;
    type?: string;
    industry?: string;
    founded?: Date;
    markets?: string[];
    funding?: string[];
    location?: string;
  };
  try {
    const company = await prisma.company.create({
      data: {
        name,
        website,
        logo,
        description,
        size,
        type,
        industry,
        founded,
        markets,
        funding,
        location,
      },
    });
    res.status(200).json(company);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}

export default createCompany;
