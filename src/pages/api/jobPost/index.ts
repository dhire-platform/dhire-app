import { SalaryType, Skill } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import prisma from 'prisma/client';

async function createJobPost(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const {
    title,
    description,
    location,
    from,
    to,
    companyId,
    salary,
    salaryType,
    applicants,
    recruiterProfileUserId,
    skills,
  } = req.body as {
    title: string;
    description: string;
    location: string;
    from: Date;
    to: Date;
    companyId: string;
    salary: number;
    salaryType: SalaryType;
    applicants?: string[];
    recruiterProfileUserId: string;
    skills: Skill[];
  };
  try {
    const jobPost = await prisma.jobPost.create({
      data: {
        title,
        description,
        location,
        from,
        to,
        company: {
          connect: {
            id: companyId,
          },
        },
        applicants,
        salary,
        salaryType,
        RecruiterProfile: {
          connect: {
            userId: recruiterProfileUserId,
          },
        },
        skills,
      },
    });
    res.status(200).json(jobPost);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}

export default createJobPost;