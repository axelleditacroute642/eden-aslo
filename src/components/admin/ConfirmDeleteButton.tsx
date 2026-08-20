"use client";

import { useState } from "react";

export default function ConfirmDeleteButton({
  label = "Supprimer",
  confirmLabel = "Confirmer ?",
  className = "text-sm text-red-600 hover:text-red-700 font-medium",
  formAction,
}: {
  label?: string;
  confirmLabel?: string;
  className?: string;
  formAction?: (formData: FormData) => void;
}) {
  const [confirming, setConfirming] = useState(false);

  return (
    <button
      type="submit"
      formAction={formAction}
      onClick={(e) => {
        if (!confirming) {
          e.preventDefault();
          setConfirming(true);
          setTimeout(() => setConfirming(false), 3000);
        }
      }}
      className={confirming ? "text-sm font-semibold text-red-700 underline" : className}
    >
      {confirming ? confirmLabel : label}
    </button>
  );
}
