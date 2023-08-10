import type { NextApiRequest, NextApiResponse } from 'next';

import { Nullable } from '../../../lib/common';
import { getToken, JWT } from 'next-auth/jwt';

import prisma from '../../../lib/prisma';

/*
 * GET Request: Returns ranked list of users
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token: Nullable<JWT> = await getToken({ req });

  if (!token) {
    res.status(401);
    res.send({ users: [] });
    return;
  }

  const tickets = await prisma.resolvedTicket.findMany({
    where: {
      NOT: {
        resolvedTime: null,
      },
    },
    orderBy: {
      publishTime: 'desc',
    },
  });

  const frequency: { [key: string]: number } = {};

  tickets.forEach((ticket) => {
    if (frequency[String(ticket.claimantName)]) {
      frequency[String(ticket.claimantName)] += 1;
    } else {
      frequency[String(ticket.claimantName)] = 1;
    }
  });

  res.status(200);
  res.send(frequency);
}
