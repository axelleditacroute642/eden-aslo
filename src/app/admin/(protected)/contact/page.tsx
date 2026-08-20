import { readSite } from "@/lib/store";
import { updateContact } from "./actions";
import SubmitButton from "@/components/admin/SubmitButton";
import { pageTitleClass, cardClass, labelClass, inputClass } from "@/components/admin/ui";

export default async function AdminContactPage() {
  const site = await readSite();
  const { contact } = site;

  return (
    <div className="max-w-2xl">
      <h1 className={pageTitleClass}>Contact</h1>

      <form action={updateContact} className={`${cardClass} grid gap-4 sm:grid-cols-2`}>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="catteryName">
            Nom de la chatterie
          </label>
          <input id="catteryName" name="catteryName" defaultValue={contact.catteryName} className={inputClass} />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="address">
            Adresse
          </label>
          <input id="address" name="address" defaultValue={contact.address} className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="postalCode">
            Code postal
          </label>
          <input id="postalCode" name="postalCode" defaultValue={contact.postalCode} className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="city">
            Ville
          </label>
          <input id="city" name="city" defaultValue={contact.city} className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="country">
            Pays
          </label>
          <input id="country" name="country" defaultValue={contact.country} className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            Téléphone
          </label>
          <input id="phone" name="phone" defaultValue={contact.phone} className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input id="email" name="email" type="email" defaultValue={contact.email} className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="hours">
            Horaires
          </label>
          <input id="hours" name="hours" defaultValue={contact.hours} className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="instagram">
            Instagram
          </label>
          <input id="instagram" name="instagram" defaultValue={contact.socials.instagram} className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="facebook">
            Facebook
          </label>
          <input id="facebook" name="facebook" defaultValue={contact.socials.facebook} className={inputClass} />
        </div>

        <div className="sm:col-span-2 mt-2">
          <SubmitButton>Enregistrer</SubmitButton>
        </div>
      </form>
    </div>
  );
}
