"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const countryCodes = [
  { code: "+225", country: "CI", flag: "🇨🇮", name: "Côte d'Ivoire" },
  { code: "+229", country: "BJ", flag: "🇧🇯", name: "Bénin" },
  { code: "+226", country: "BF", flag: "🇧🇫", name: "Burkina Faso" },
  { code: "+237", country: "CM", flag: "🇨🇲", name: "Cameroun" },
  { code: "+236", country: "CF", flag: "🇨🇫", name: "Centrafrique" },
  { code: "+235", country: "TD", flag: "🇹🇩", name: "Tchad" },
  { code: "+269", country: "KM", flag: "🇰🇲", name: "Comores" },
  { code: "+242", country: "CG", flag: "🇨🇬", name: "Congo" },
  { code: "+243", country: "CD", flag: "🇨🇩", name: "RD Congo" },
  { code: "+240", country: "GQ", flag: "🇬🇶", name: "Guinée Équatoriale" },
  { code: "+241", country: "GA", flag: "🇬🇦", name: "Gabon" },
  { code: "+224", country: "GN", flag: "🇬🇳", name: "Guinée" },
  { code: "+245", country: "GW", flag: "🇬🇼", name: "Guinée-Bissau" },
  { code: "+223", country: "ML", flag: "🇲🇱", name: "Mali" },
  { code: "+227", country: "NE", flag: "🇳🇪", name: "Niger" },
  { code: "+221", country: "SN", flag: "🇸🇳", name: "Sénégal" },
  { code: "+228", country: "TG", flag: "🇹🇬", name: "Togo" },
  { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
  { code: "+32", country: "BE", flag: "🇧🇪", name: "Belgique" },
  { code: "+41", country: "CH", flag: "🇨🇭", name: "Suisse" },
];

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nom: "",
    prenoms: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    profession: "",
    linkedinUrl: "",
  });
  const [countryCode, setCountryCode] = useState("+225");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (!photo) {
      setError("Veuillez ajouter une photo");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: `${formData.prenoms} ${formData.nom}`,
        image: photoPreview || undefined,
        phone: formData.phoneNumber ? `${countryCode} ${formData.phoneNumber}` : "",
        profession: formData.profession,
        linkedinUrl: formData.linkedinUrl,
        callbackURL: "/me/home",
      });

      if (error) {
        setError(error.message || "Une erreur est survenue");
        return;
      }

      router.push("/");
    } catch {
      setError("Une erreur est survenue lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Créer un compte</h1>
          <p className="mt-2 text-sm text-foreground/60">
            Rejoignez la communauté CCJA
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Photo */}
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium mb-2">
                Photo <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-dashed border-foreground/20 bg-foreground/5">
                  {photoPreview ? (
                    <Image
                      src={photoPreview}
                      alt="Aperçu"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <svg
                        className="h-8 w-8 text-foreground/40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </div>
              <p className="mt-2 text-xs text-foreground/60">
                Cliquez pour ajouter une photo
              </p>
            </div>

            {/* Nom */}
            <div>
              <label htmlFor="nom" className="block text-sm font-medium">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                id="nom"
                name="nom"
                type="text"
                required
                value={formData.nom}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm placeholder-foreground/40 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/40"
                placeholder="KONAN"
              />
            </div>

            {/* Prénoms */}
            <div>
              <label htmlFor="prenoms" className="block text-sm font-medium">
                Prénoms <span className="text-red-500">*</span>
              </label>
              <input
                id="prenoms"
                name="prenoms"
                type="text"
                required
                value={formData.prenoms}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm placeholder-foreground/40 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/40"
                placeholder="Jean-Baptiste"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Adresse email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm placeholder-foreground/40 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/40"
                placeholder="vous@exemple.com"
              />
            </div>

            {/* Numéro de téléphone */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium">
                Numéro de téléphone
              </label>
              <div className="mt-1 flex">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="rounded-l-md border border-r-0 border-foreground/20 bg-background px-2 py-2 text-sm focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/40"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="block w-full rounded-r-md border border-foreground/20 bg-background px-3 py-2 text-sm placeholder-foreground/40 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/40"
                  placeholder="07 00 00 00 00"
                />
              </div>
            </div>

            {/* Profession */}
            <div>
              <label htmlFor="profession" className="block text-sm font-medium">
                Profession <span className="text-red-500">*</span>
              </label>
              <input
                id="profession"
                name="profession"
                type="text"
                required
                value={formData.profession}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm placeholder-foreground/40 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/40"
                placeholder="Avocat, Juriste, Magistrat..."
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label htmlFor="linkedinUrl" className="block text-sm font-medium">
                Profil LinkedIn
              </label>
              <input
                id="linkedinUrl"
                name="linkedinUrl"
                type="url"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm placeholder-foreground/40 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/40"
                placeholder="https://linkedin.com/in/votre-profil"
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Mot de passe <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm placeholder-foreground/40 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/40"
                placeholder="••••••••"
              />
            </div>

            {/* Confirmation mot de passe */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirmer le mot de passe <span className="text-red-500">*</span>
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm placeholder-foreground/40 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/40"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Inscription..." : "Créer mon compte"}
          </button>
        </form>

        <p className="text-center text-sm text-foreground/60">
          Déjà un compte ?{" "}
          <Link
            href="/auth/sign-in"
            className="font-medium text-foreground hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
