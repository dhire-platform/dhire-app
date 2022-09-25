import prisma from 'prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { Role } from '@prisma/client';

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
      await getUserById(req, res, id);
      break;
    case 'PUT':
      await updateUser(req, res, id);
      break;
    case 'DELETE':
      await deleteUser(req, res, id);
      break;
    default:
      res.status(400).json({ error: 'invalid method' });
      break;
  }
}

async function getUserById(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  id: string
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
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
  id: string
) {
  const { name, type, wallet, username } = req.body as {
    name?: string;
    type?: Role;
    wallet?: string;
    username?: string;
  };
  try {
    const user = await prisma.user.update({
      where: {
        id: id,
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
  id: string
) {
  try {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}
