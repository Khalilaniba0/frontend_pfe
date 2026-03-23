import React, { useState, useRef } from "react";

export default function EntrepriseTab() {
  const [formData, setFormData] = useState({
    name: "Talentia Corp",
    description: "",
    sector: "Technologie & SaaS",
    size: "50 – 200 employés",
    website: "",
    email: "",
    address: "",
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoError, setLogoError] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogoError(null);

    const validTypes = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setLogoError("Format non supporté. Utilisez PNG, JPG, SVG ou WebP.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setLogoError("Fichier trop volumineux. Maximum 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      {/* Header */}
      <h2 className="text-lg font-display font-semibold text-text-primary mb-1">
        Informations de l'entreprise
      </h2>
      <p className="text-sm text-text-secondary mb-6">
        Mettez à jour les informations de votre organisation.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Upload Logo */}
        <div>
          <label className="text-sm font-display font-medium text-text-primary mb-1 block">
            Logo de l'entreprise
          </label>
          <div
            className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Logo preview"
                className="w-20 h-20 object-contain mx-auto mb-2"
              />
            ) : (
              <span className="material-symbols-outlined text-4xl text-text-muted mb-2">
                upload
              </span>
            )}
            <p className="text-sm font-display font-medium text-text-primary">
              Choisir un logo
            </p>
            <p className="text-xs text-text-muted mt-1">
              PNG, JPG, SVG ou WebP · Max 2MB
            </p>
            {logoError && (
              <p className="text-xs text-red-500 mt-2">{logoError}</p>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            onChange={handleLogoChange}
            className="hidden"
          />
        </div>

        {/* Nom de l'entreprise */}
        <div>
          <label
            htmlFor="name"
            className="text-sm font-display font-medium text-text-primary mb-1 block"
          >
            Nom de l'entreprise <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="border border-border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="text-sm font-display font-medium text-text-primary mb-1 block"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Décrivez brièvement votre entreprise..."
            className="border border-border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
          />
        </div>

        {/* Secteur + Taille */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="sector"
              className="text-sm font-display font-medium text-text-primary mb-1 block"
            >
              Secteur d'activité
            </label>
            <select
              id="sector"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              className="border border-border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              <option value="Technologie & SaaS">Technologie & SaaS</option>
              <option value="Finance & Banque">Finance & Banque</option>
              <option value="Santé">Santé</option>
              <option value="Commerce & Retail">Commerce & Retail</option>
              <option value="Industrie">Industrie</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="size"
              className="text-sm font-display font-medium text-text-primary mb-1 block"
            >
              Taille de l'entreprise
            </label>
            <select
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="border border-border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              <option value="1 – 10 employés">1 – 10 employés</option>
              <option value="10 – 50 employés">10 – 50 employés</option>
              <option value="50 – 200 employés">50 – 200 employés</option>
              <option value="200 – 500 employés">200 – 500 employés</option>
              <option value="500+ employés">500+ employés</option>
            </select>
          </div>
        </div>

        {/* Site web */}
        <div>
          <label
            htmlFor="website"
            className="text-sm font-display font-medium text-text-primary mb-1 block"
          >
            Site web
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://"
            className="border border-border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        {/* Email de contact */}
        <div>
          <label
            htmlFor="email"
            className="text-sm font-display font-medium text-text-primary mb-1 block"
          >
            Email de contact
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="contact@entreprise.com"
            className="border border-border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        {/* Adresse */}
        <div>
          <label
            htmlFor="address"
            className="text-sm font-display font-medium text-text-primary mb-1 block"
          >
            Adresse
          </label>
          <textarea
            id="address"
            name="address"
            rows={2}
            value={formData.address}
            onChange={handleChange}
            placeholder="Numéro, rue, code postal, ville..."
            className="border border-border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white font-display font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}
