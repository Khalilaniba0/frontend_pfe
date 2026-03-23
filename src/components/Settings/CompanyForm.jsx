import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
 
export default function CompanyForm({ initialData, onSubmit }) {
  const [formData, setFormData] = useState(initialData);
  const [logoPreview, setLogoPreview] = useState(initialData.logoUrl || null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [logoError, setLogoError] = useState(null);
  const fileInputRef = useRef(null);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
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
      setFormData((prev) => ({ ...prev, logo: file, logoUrl: reader.result }));
    };
    reader.readAsDataURL(file);
    setSaved(false);
  };
 
  const handleRemoveLogo = () => {
    setLogoPreview(null);
    setLogoError(null);
    setFormData((prev) => ({ ...prev, logo: null, logoUrl: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
    setSaved(false);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await onSubmit(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };
 
  const handleCancel = () => {
    setFormData(initialData);
    setLogoPreview(initialData.logoUrl || null);
    setLogoError(null);
    setSaved(false);
  };
 
  return (
    <div className="bg-white rounded-2xl border border-border p-6">
 
      {/* Header */}
      <div className="mb-6">
        <h3 className="font-display font-semibold text-text-primary text-lg">
          Informations de l'entreprise
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          Mettez à jour les informations de votre organisation.
        </p>
      </div>
 
      <form onSubmit={handleSubmit} className="space-y-5">
 
        {/* ── Logo ── */}
        <div>
          <label className="block font-body text-sm font-medium text-text-primary mb-2">
            Logo de l'entreprise
          </label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-border bg-bg-soft flex items-center justify-center overflow-hidden flex-shrink-0">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo de l'entreprise"
                  className="w-full h-full object-contain p-1"
                />
              ) : (
                <span className="material-symbols-outlined text-3xl text-text-muted">
                  business
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                onChange={handleLogoChange}
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-white font-body font-medium text-sm text-text-primary hover:bg-bg-soft transition-colors"
              >
                <span className="material-symbols-outlined text-base">upload</span>
                Choisir un logo
              </label>
              {logoPreview && (
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 bg-white font-body font-medium text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                  Supprimer
                </button>
              )}
              <p className="text-xs text-text-muted">PNG, JPG, SVG ou WebP · Max 2MB</p>
              {logoError && (
                <p className="text-xs text-red-500">{logoError}</p>
              )}
            </div>
          </div>
        </div>
 
        <div className="border-t border-border" />
 
        {/* ── Nom ── */}
        <div>
          <label
            htmlFor="name"
            className="block font-body text-sm font-medium text-text-primary mb-1.5"
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
            placeholder="Ex : Talentia Corp"
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-white font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>
 
        {/* ── Description ── */}
        <div>
          <label
            htmlFor="description"
            className="block font-body text-sm font-medium text-text-primary mb-1.5"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Décrivez brièvement votre entreprise, sa mission, ses valeurs..."
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-white font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
          />
        </div>
 
        {/* ── Secteur + Taille ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="sector"
              className="block font-body text-sm font-medium text-text-primary mb-1.5"
            >
              Secteur d'activité
            </label>
            <input
              type="text"
              id="sector"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              placeholder="Ex : Technologie & SaaS"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="size"
              className="block font-body text-sm font-medium text-text-primary mb-1.5"
            >
              Taille de l'entreprise
            </label>
            <select
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white font-body text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            >
              <option value="1 - 10 employes">1 – 10 employés</option>
              <option value="10 - 50 employes">10 – 50 employés</option>
              <option value="50 - 200 employes">50 – 200 employés</option>
              <option value="200 - 500 employes">200 – 500 employés</option>
              <option value="500+ employes">500+ employés</option>
            </select>
          </div>
        </div>
 
        {/* ── Site web ── */}
        <div>
          <label
            htmlFor="website"
            className="block font-body text-sm font-medium text-text-primary mb-1.5"
          >
            Site web
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-body text-sm select-none">
              https://
            </span>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="www.monentreprise.com"
              className="w-full pl-20 pr-4 py-2.5 rounded-xl border border-border bg-white font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
        </div>
 
        {/* ── Email + Téléphone ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block font-body text-sm font-medium text-text-primary mb-1.5"
            >
              Email de contact <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="contact@entreprise.com"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block font-body text-sm font-medium text-text-primary mb-1.5"
            >
              Téléphone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              placeholder="+216 XX XXX XXX"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
        </div>
 
        {/* ── Pays + Ville ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="country"
              className="block font-body text-sm font-medium text-text-primary mb-1.5"
            >
              Pays
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country || ""}
              onChange={handleChange}
              placeholder="Ex : Tunisie"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block font-body text-sm font-medium text-text-primary mb-1.5"
            >
              Ville
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              placeholder="Ex : Tunis"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
        </div>
 
        {/* ── Adresse ── */}
        <div>
          <label
            htmlFor="address"
            className="block font-body text-sm font-medium text-text-primary mb-1.5"
          >
            Adresse
          </label>
          <textarea
            id="address"
            name="address"
            rows={2}
            value={formData.address}
            onChange={handleChange}
            placeholder="Numéro, rue, code postal..."
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-white font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
          />
        </div>
 
        {/* ── Actions ── */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
          <div className="h-6">
            {saved && (
              <span className="inline-flex items-center gap-1.5 text-sm text-success font-body">
                <span className="material-symbols-outlined text-base">check_circle</span>
                Modifications enregistrées
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl border border-border bg-white font-body font-medium text-sm text-text-primary hover:bg-bg-soft transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary font-display font-semibold text-sm text-white hover:bg-primary-dark transition-colors shadow-md disabled:opacity-60"
            >
              {saving ? (
                <>
                  <span className="material-symbols-outlined text-base animate-spin">
                    progress_activity
                  </span>
                  Enregistrement...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">save</span>
                  Enregistrer
                </>
              )}
            </button>
          </div>
        </div>
 
      </form>
    </div>
  );
}
 
CompanyForm.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    sector: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    address: PropTypes.string.isRequired,
    logoUrl: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};