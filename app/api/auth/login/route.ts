import { loginUser } from "@/services/auth/auth.service";

import { loginUserSchema } from "@/validators/user.schema";

import { ERROR_MESSAGES } from "@/constants/messages";

import {
  success,
  badRequest,
  unauthorized,
  serverError,
} from "@/utils/apiResponse";

import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = loginUserSchema.safeParse(body);

    if (!validation.success) {
      return badRequest(validation.error.issues[0].message);
    }

    const result = await loginUser(validation.data);

    const cookieStore = await cookies();

    cookieStore.set("session", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return success({
      user: result.user,
    });

  } catch (error) {
    if (
      error instanceof Error &&
      error.message === ERROR_MESSAGES.INVALID_CREDENTIALS
    ) {
      return unauthorized(error.message);
    }

    if (
      error instanceof Error &&
      error.message === ERROR_MESSAGES.USER_INACTIVE
    ) {
      return unauthorized(error.message);
    }

    return serverError();
  }
}