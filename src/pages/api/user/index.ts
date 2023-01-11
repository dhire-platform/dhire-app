import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import prisma from 'prisma/client';

enum Role {
  RECRUITER = 'RECRUITER',
  APPLICANT = 'APPLICANT',
}
async function createNewUser(req: NextApiRequest, res: NextApiResponse) {
  const { name, type, wallet, username } = req.body as {
    name: string;
    type: Role;
    wallet: string;
    username: string;
  };
  try {
    const user = await prisma.user.create({
      data: {
        name,
        type,
        wallet,
        username,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}

async function getAllUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        username: true,
        UserProfile: {
          select: {
            bio: true,
            image: true,
            skills: true,
            location: true,
            createdAt: true,
          },
        },
      },
    });
    res.status(200).json(users);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}
async function createUser(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['GET', 'POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  switch (req.method) {
    case 'GET':
      await getAllUsers(req, res);
      break;
    case 'POST':
      await createNewUser(req, res);
      break;
    default:
      break;
  }
}

export default createUser;
