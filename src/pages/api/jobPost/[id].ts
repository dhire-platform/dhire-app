import { SalaryType, Skill } from '@prisma/client';
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
      await getJobPostById(req, res, id);
      break;
    case 'PUT':
      await updateJobPost(req, res, id);
      break;
    case 'DELETE':
      await deleteJobPost(req, res, id);
      break;
    default:
      res.status(400).json({ error: 'invalid method' });
      break;
  }
}

async function getJobPostById(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  id: string
) {
  try {
    const user = await prisma.jobPost.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}

async function updateJobPost(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  id: string
) {
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
    const jobPost = await prisma.jobPost.update({
      where: {
        id: id,
      },
      data: {
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
      },
    });
    res.status(200).json(jobPost);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}

async function deleteJobPost(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  id: string
) {
  try {
    const jobPost = await prisma.jobPost.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json(jobPost);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}