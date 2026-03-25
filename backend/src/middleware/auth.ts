import { FastifyRequest, FastifyReply } from 'fastify';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ success: false, message: 'Unauthorized' });
  }
}

export async function optionalAuth(request: FastifyRequest, _reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch {
    // Optional - don't block the request
  }
}
