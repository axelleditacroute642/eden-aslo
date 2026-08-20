"use server";

import { revalidatePath } from "next/cache";
import { readSite, writeSite } from "@/lib/store";

export async function updateContact(formData: FormData) {
  const site = await readSite();
  const get = (key: string) => String(formData.get(key) ?? "");

  site.contact = {
    catteryName: get("catteryName"),
    address: get("address"),
    postalCode: get("postalCode"),
    city: get("city"),
    country: get("country"),
    phone: get("phone"),
    email: get("email"),
    hours: get("hours"),
    socials: {
      instagram: get("instagram"),
      facebook: get("facebook"),
    },
  };

  await writeSite(site);
  revalidatePath("/", "layout");
}
