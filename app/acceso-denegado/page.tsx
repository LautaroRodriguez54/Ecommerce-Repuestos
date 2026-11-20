import { RedirectPage } from "@/components/errors/RedirectPage";

type Props = {
  searchParams: Promise<{
    reason?: string;
    next?: string;
  }>;
};

export default async function AccessDeniedPage({ searchParams }: Props) {
  const { reason, next } = await searchParams;

  const status = reason === "unauthenticated" ? 401 : 403;

  const safeNext = next?.startsWith("/") && !next.startsWith("//") ? next : "/";

  return (
    <RedirectPage
      status={status}
      redirectTo={
        status === 401 ? `/login?next=${encodeURIComponent(safeNext)}` : "/"
      }
      seconds={3}
    />
  );
}
