import prisma from 'prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { EducationType, ExperienceType, ProjectType, Skill, SocialType } from '@prisma/client';

async function createUserProfile(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const {
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
  } = req.body as {
    userId: string;
    bio?: string;
    image?: string;
    skills?: Skill[];
    location?: string;
    website?: string;
    experience?: ExperienceType[];
    education?: EducationType[];
    projects?: ProjectType[];
    social?: SocialType;
  };
  try {
    const userProfile = await prisma.userProfile.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        bio,
        image,
        skills,
        location,
        website,
        experience,
        education,
        projects,
        social
      },
    });
    res.status(200).json(userProfile);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}

export default createUserProfile;
