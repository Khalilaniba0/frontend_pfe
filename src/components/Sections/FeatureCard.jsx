import React, { useState } from "react";

export default function FeatureCard({ icon, title, description, tag }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`th-feature-card rounded-2xl p-7 transition-all duration-300 cursor-default border ${
        hovered
          ? "bg-primary-light border-primary/30 -translate-y-1 shadow-[0_16px_40px_rgba(0,0,0,0.08),0_0_0_1px_rgba(8,145,178,0.15)]"
          : "bg-white border-slate-200 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between items-start mb-5">
        <div
          className={`w-[46px] h-[46px] rounded-xl bg-primary-dark/15 border border-primary-dark/25 flex items-center justify-center text-primary-dark transition-transform duration-300 ${
            hovered ? "scale-110" : "scale-100"
          }`}
        >
          {icon}
        </div>
        <span className="text-[0.65rem] font-bold text-primary-dark bg-primary-dark/[0.12] border border-primary-dark/20 px-2.5 py-1 rounded-full font-body tracking-wider">
          {tag}
        </span>
      </div>

      <h4 className="font-body font-bold text-[1.0625rem] text-slate-900 mb-2.5 tracking-tight">
        {title}
      </h4>

      <p className="font-body text-sm text-slate-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
