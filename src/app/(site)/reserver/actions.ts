"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { readSite } from "@/lib/store";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendReservationRequest(formData: FormData) {
  const honeypot = String(formData.get("website") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const kitten = String(formData.get("kitten") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const params = new URLSearchParams();
  if (kitten) params.set("chaton", kitten);

  if (honeypot) {
    redirect(`/reserver/merci?${params.toString()}`);
  }

  if (!name || !email || !message) {
    params.set("error", "missing");
    redirect(`/reserver?${params.toString()}`);
  }

  if (!EMAIL_PATTERN.test(email)) {
    params.set("error", "email");
    redirect(`/reserver?${params.toString()}`);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    params.set("error", "config");
    redirect(`/reserver?${params.toString()}`);
  }

  const site = await readSite();
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Réservations L'Eden d'Aslo <onboarding@resend.dev>",
    to: site.contact.email,
    replyTo: email,
    subject: kitten ? `Réservation — ${kitten}` : "Nouvelle demande de réservation",
    text: [
      `Nom : ${name}`,
      `Email : ${email}`,
      `Téléphone : ${phone || "—"}`,
      `Chaton : ${kitten || "—"}`,
      "",
      "Message :",
      message,
    ].join("\n"),
  });

  if (error) {
    params.set("error", "send");
    redirect(`/reserver?${params.toString()}`);
  }

  redirect(`/reserver/merci?${params.toString()}`);
}
