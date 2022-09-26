import { Role } from '@prisma/client';
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

  const { wallet } = req.query as { wallet: string };
  if (!wallet) {
    res.status(400).json({ error: 'wallet is required' });
    return;
  }

  // sanitize wallet to prevent SQL injection
  if (wallet.match(/[^a-zA-Z0-9]/)) {
    res.status(400).json({ error: 'invalid wallet' });
    return;
  }

  switch (req.method) {
    case 'GET':
      await getUserById(req, res, wallet);
      break;
    case 'PUT':
      await updateUser(req, res, wallet);
      break;
    case 'DELETE':
      await deleteUser(req, res, wallet);
      break;
    default:
      res.status(400).json({ error: 'invalid method' });
      break;
  }
}

async function getUserById(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  wallet: string
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        wallet: wallet,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}

async function updateUser(
  req: NextApiRequest,
  res: NextApiResponse,
  wallet: string
) {
  const { name, type, username } = req.body as {
    name?: string;
    type?: Role;
    username?: string;
  };
  try {
    const user = await prisma.user.update({
      where: {
        wallet: wallet,
      },
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

async function deleteUser(
  req: NextApiRequest,
  res: NextApiResponse,
  wallet: string
) {
  try {
    const user = await prisma.user.delete({
      where: {
        wallet: wallet,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}
