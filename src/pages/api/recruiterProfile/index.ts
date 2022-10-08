import { SocialType } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import prisma from 'prisma/client';

async function createRecruiterProfile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const {
    userId,
    bio,
    image,
    company,
    location,
    website,
    social,
  } = req.body as {
    userId: string;
    bio?: string;
    image?: string;
    company?: string;
    location?: string;
    website?: string;
    social?: SocialType;
  };
  try {
    const recruiterProfile = await prisma.recruiterProfile.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
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

export default createRecruiterProfile;