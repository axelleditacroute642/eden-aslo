export const ADMIN_SESSION_COOKIE = "eden_admin_session";

export function getExpectedSessionValue(): string | undefined {
  return process.env.ADMIN_SESSION_SECRET;
}
