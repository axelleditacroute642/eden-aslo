"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, getExpectedSessionValue } from "@/lib/auth";

export async function login(formData: FormData) {
  const password = formData.get("password");
  const expected = getExpectedSessionValue();

  if (
    !expected ||
    typeof password !== "string" ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    redirect("/admin/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, expected, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}
