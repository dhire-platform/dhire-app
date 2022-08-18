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
      await getUserProfileById(req, res, id);
      break;
    case 'PUT':
      await updateUserProfile(req, res, id);
      break;
    case 'DELETE':
      await deleteUserProfile(req, res, id);
      break;
    default:
      res.status(400).json({ error: 'invalid method' });
      break;
  }
}

async function getUserProfileById(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  id: string
) {
  try {
    const user = await prisma.userProfile.findUnique({
      where: {
        userId: id,
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
  id: string
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
    walletId: string;
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
    console.log(req.body);
    console.log(id);
    const user = await prisma.userProfile.update({
      where: {
        userId: id,
      },
      data: {
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
    console.log(e);
    res.status(400).json({ error: (e as Error).message });
  }
}

async function deleteUserProfile(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) {
  try {
    const user = await prisma.userProfile.delete({
      where: {
        userId: id,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}
