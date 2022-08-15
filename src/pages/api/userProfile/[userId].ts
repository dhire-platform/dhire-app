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

  const { userId } = req.query as { userId: string };
  if (!userId) {
    res.status(400).json({ error: 'id is required' });
    return;
  }

  // sanitize id to prevent SQL injection
  if (userId.match(/[^a-zA-Z0-9]/)) {
    res.status(400).json({ error: 'invalid userId' });
    return;
  }

  switch (req.method) {
    case 'GET':
      await getUserProfileById(req, res, userId);
      break;
    case 'PUT':
      await updateUserProfile(req, res, userId);
      break;
    case 'DELETE':
      await deleteUserProfile(req, res, userId);
      break;
    default:
      res.status(400).json({ error: 'invalid method' });
      break;
  }
}

async function getUserProfileById(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  userId: string
) {
  try {
    const user = await prisma.userProfile.findUnique({
      where: {
        id: userId,
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
  userId: string
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
        id: userId,
      },
      data: {
        userId,
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
  userId: string
) {
  try {
    const user = await prisma.userProfile.delete({
      where: {
        id: userId,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}
