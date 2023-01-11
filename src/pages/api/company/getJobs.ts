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
      await getJobsByCompanyId(req, res, id);
      break;
    default:
      res.status(400).json({ error: 'invalid method' });
      break;
  }
}

async function getJobsByCompanyId(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  id: string
) {
  try {
    const user = await prisma.company.findUnique({
      where: {
        id: id,
      },
      select: {
        jobPosts: {
          include: {
            applicants: {
              include: {
                user: {
                  include: {
                    user: {
                      select: {
                        name: true,
                        username: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}
