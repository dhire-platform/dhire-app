import prisma from 'prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { Skill, SocialType } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ['GET', 'PUT', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const { walletId } = req.query as { walletId: string };
  if (!walletId) {
    res.status(400).json({ error: 'id is required' });
    return;
  }

  // sanitize id to prevent SQL injection
  if (walletId.match(/[^a-zA-Z0-9]/)) {
    res.status(400).json({ error: 'invalid walletId' });
    return;
  }

  switch (req.method) {
    case 'GET':
      await getUserProfileById(req, res, walletId);
      break;
    case 'PUT':
      await updateUserProfile(req, res, walletId);
      break;
    case 'DELETE':
      await deleteUserProfile(req, res, walletId);
      break;
    default:
      res.status(400).json({ error: 'invalid method' });
      break;
  }
}

async function getUserProfileById(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  walletId: string
) {
  try {
    const user = await prisma.userProfile.findUnique({
      where: {
        id: walletId,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}

async function updateUserProfile(
  req: NextApiRequest,
  res: NextApiResponse,
  walletId: string
) {
  const {
    bio,
    image,
    skills,
    location,
    website,
    experience,
    education,
    projects,
    social,
  } = req.body as {
    bio?: string;
    image?: string;
    skills?: Skill[];
    location?: string;
    website?: string;
    experience?: JSON[];
    education?: JSON[];
    projects?: JSON[];
    social?: SocialType;
  };

  try {
    const user = await prisma.userProfile.update({
      where: {
        id: walletId,
      },
      data: {
        walletId,
        bio,
        image,
        skills,
        location,
        website,
        experience,
        education,
        projects,
        social,
      },
    });
    console.log('user update', user);
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}

async function deleteUserProfile(
  req: NextApiRequest,
  res: NextApiResponse,
  walletId: string
) {
  try {
    const user = await prisma.userProfile.delete({
      where: {
        id: walletId,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}
