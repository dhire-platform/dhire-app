import prisma from 'prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

enum Role {
  RECRUITER = 'RECRUITER',
  APPLICANT = 'APPLICANT',
}

async function createUser(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  });
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

export default createUser;
