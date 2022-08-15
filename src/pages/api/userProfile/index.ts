import prisma from 'prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { Skill, SocialType } from '@prisma/client';

async function createUserProfile(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const {
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
  } = req.body as {
    walletId: string;
    bio?: string;
    image?: string;
    skills: Skill[];
    location?: string;
    website?: string;
    experience?: JSON[];
    education?: JSON[];
    projects?: JSON[];
    social?: SocialType;
  };
  try {
    const userProfile = await prisma.userProfile.create({
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
    console.log('create user profile =', userProfile);
    res.status(200).json(userProfile);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}

export default createUserProfile;
