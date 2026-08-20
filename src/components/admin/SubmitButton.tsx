"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  className = "rounded-md bg-slate-900 text-white text-sm font-medium px-4 py-2 hover:bg-slate-800 transition-colors disabled:opacity-50",
  pendingLabel = "Enregistrement…",
}: {
  children: React.ReactNode;
  className?: string;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingLabel : children}
    </button>
  );
}
