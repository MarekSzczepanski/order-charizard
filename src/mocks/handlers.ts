import { rest } from 'msw';
import { api } from '../utils/globalVariables';

const handlers = [
  rest.post(`${api}/users/_token/`, (req, res, ctx) => {
    const dummyToken =
      '9216da0fcdd45767890f8c8b72abde65f01c71a341f725f376fb36c69254de28';
    return res(
      ctx.status(200),
      ctx.json({
        user_token: dummyToken,
      }),
    );
  }),
];

export default handlers;
