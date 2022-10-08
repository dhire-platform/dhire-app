import { SocialType } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import prisma from 'prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ['GET', 'PUT', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const { id } = req.query as { id: string };
  if (!id) {
    res.status(400).json({ error: 'id is required' });
    return;
  }

  // sanitize id to prevent SQL injection
  if (id.match(/[^a-zA-Z0-9]/)) {
    res.status(400).json({ error: 'invalid id' });
    return;
  }

  switch (req.method) {
    case 'GET':
      await getRecruiterProfileById(req, res, id);
      break;
    case 'PUT':
      await updateRecruiterProfile(req, res, id);
      break;
    case 'DELETE':
      await deleteRecruiterProfile(req, res, id);
      break;
    default:
      res.status(400).json({ error: 'invalid method' });
      break;
  }
}

async function getRecruiterProfileById(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  id: string
) {
  try {
    const user = await prisma.recruiterProfile.findUnique({
      where: {
        userId: id,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}

async function updateRecruiterProfile(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  id: string
) {
  const {
    bio,
    image,
    company,
    location,
    website,
    social,
  } = req.body as {
    bio?: string;
    image?: string;
    company?: string;
    location?: string;
    website?: string;
    social?: SocialType;
  };
  try {
    const recruiterProfile = await prisma.recruiterProfile.update({
      where: {
        userId: id,
      },
      data: {
        bio,
        image,
        location,
        company,
        website,
        social,
      },
    });
    res.status(200).json(recruiterProfile);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}

async function deleteRecruiterProfile(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  id: string
) {
  try {
    const recruiterProfile = await prisma.recruiterProfile.delete({
      where: {
        userId: id,
      },
    });
    res.status(200).json(recruiterProfile);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}