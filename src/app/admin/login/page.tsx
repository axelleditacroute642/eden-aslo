import { login } from "../auth-actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        action={login}
        className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-slate-200 p-8"
      >
        <h1 className="text-xl font-semibold text-slate-900 mb-1">Espace admin</h1>
        <p className="text-sm text-slate-500 mb-6">L&apos;Eden d&apos;Aslo</p>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            Mot de passe incorrect.
          </p>
        )}

        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />

        <button
          type="submit"
          className="w-full rounded-md bg-slate-900 text-white text-sm font-medium py-2.5 hover:bg-slate-800 transition-colors"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
