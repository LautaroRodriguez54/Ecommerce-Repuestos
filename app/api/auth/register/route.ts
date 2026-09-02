import { registerUser } from "@/services/auth/auth.service";

import { registerUserSchema } from "@/validators/user.schema";

import { ERROR_MESSAGES } from "@/constants/messages";

import {
  created,
  badRequest,
  conflict,
  serverError,
} from "@/utils/apiResponse";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = registerUserSchema.safeParse(body);

    if (!validation.success) {
      return badRequest(validation.error.issues[0].message);
    }

    const user = await registerUser(validation.data);

    return created(user);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === ERROR_MESSAGES.USER_ALREADY_EXISTS
    ) {
      return conflict(error.message);
    }

    return serverError();
  }
}