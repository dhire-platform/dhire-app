import { ApplicantStatus } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import prisma from 'prisma/client';
/* Get all applicantions of a user + update & delete a particular applicant */
/* Post a new applicant => applicant/jobId =>  */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
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
    case 'POST':
      await addNewApplicant(req, res, id);
      break;
    case 'GET':
      await getApplicantByUserId(req, res, id);
      break;
    case 'PUT':
      await updateApplicant(req, res, id);
      break;
    case 'DELETE':
      await deleteApplicant(req, res, id);
      break;
    default:
      res.status(400).json({ error: 'invalid method' });
      break;
  }
}
async function addNewApplicant(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  id: string
) {
  const { user_id, interview_step, next_interview_date, archieved, status } =
    req.body as {
      user_id: string;
      interview_step: string;
      next_interview_date: Date;
      archieved: boolean;
      status: ApplicantStatus;
    };
  try {
    const applicant = await prisma.applicant.create({
      data: {
        jobId: id,
        user_id,
        interview_step,
        next_interview_date,
        archieved,
        status,
      },
    });
    res.status(200).json(applicant);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}
async function getApplicantByUserId(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  id: string
) {
  try {
    const applicants = await prisma.applicant.findMany({
      where: {
        user_id: id,
      },
    });
    res.status(200).json(applicants);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}

async function updateApplicant(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  id: string
) {
  try {
    const applicant = await prisma.applicant.update({
      where: {
        id: id,
      },
      data: req.body,
    });
    res.status(200).json(applicant);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}

async function deleteApplicant(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  id: string
) {
  try {
    const applicant = await prisma.applicant.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json(applicant);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}
