import { handleContactRequest, ServerRequestLike, ServerResponseLike } from './_lib/contact';

export default async function handler(req: ServerRequestLike, res: ServerResponseLike) {
  return handleContactRequest(req, res);
}
