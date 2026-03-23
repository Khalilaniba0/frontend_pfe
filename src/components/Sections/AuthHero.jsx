import React from "react";

export default function AuthHero() {
  const avatars = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAJs1lAPnXKfVljfGTFxo9WjjCgLRtUYDVm9jYwSkTeO0K3m-2TUuGU2b55gQAD8dqSpMZOQgkEZj-BX3iRMwLSASyCHyyiBBa3EWgZSHFvvqByZ-v0kneioFHzJ8RguA7ctGKd-f3miiu0UVwiyrL9IITzmk6Lc2tM0KEi2i_xGut20ZuKvE3KuXzh6vpnmVKX5-796hyr2CjBSxK_lHHHKY81W64PJl8RcMZhQwNUPh-re9VBlJClOD6oUd8us02BRgs_bdIZrw69",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBVRUFLZPVV8-EHMykDKN-JNU6J7mjerP-rMo7xVg0XwIod1tJpSrrHMtG3UZS4LOKc9gmFypOuT_K1PDA_PQOuTB3w863x4lmWPfEIcp1wsgTQcOmivCw-7enbpr5-WS0mesAsltUaMyl5xkdA4qiiCEYg8usVycRhnMPW7UbGKyoMr9We5KVi1exLCeDwDhYwz60TebNCyg-TdTx1ncxvSQZSqVy5RMqcHcR3SinU9BKnQPZIyyu1EZwOplIHPqcvSCCpRgn5QkHb",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCfEuP_Qfp6bIzqGk7STsWtbsyoli1koQpMjhPB5T2zjkIZQmu0t0M0queQf7ImWCn8MAaoq_RhggRILTI-8TPsW59s1ROz_m34QJMU4oYkhk0BVYEnGktoLbfnlulwuslo_UXGGonXAZHULxEHZ1kQ8DtZkDULt47Y5bvpLtq-6oejES3pSlwgYNVdLzdoARaZdMgPw7cp8N5bdG7lQYMhEUmdb8xKyjEKMf3Q3uNa_Rr-nAQSmLBjeQq-cF7IzJZmKtovTDxaEDyL",
  ];

  return (
    <div className="hidden lg:flex relative w-1/2 bg-primary/10 items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80 z-0"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDA3UQ3BM4p3Ri62fqQsLQ3Fk_LQPYn9r7RZBqZuNpJ4V6Oud6e4S9f0VG1tpqCc60Hw7tBo4wwoQimZ3e4X8vsWfQQv6u1hJ6ZP09A5YngR0XWVqVyNme6D78JT5uDHF8Uvyyfjr0EHXoBT16UG2LlsfpJb2RplgR1gz9lROv5Wwfi3lEjScV43Y9_Ka-WnQ7bbXl_-FvClcsWJmW1DmocFMF8IvXVzDQtXpUeM7i4CJnl8lnEOpyLxPvCGF6fZkchS96OkydhUZlJ')",
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top right, rgba(16, 31, 34, 0.8), rgba(16, 31, 34, 0.4), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-12 py-10 max-w-[520px]">
        {/* Badge */}
        <span className="inline-block px-2.5 py-[3px] rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest mb-[18px]">
          Prêt pour l'entreprise
        </span>

        {/* Title */}
        <h1 className="text-4xl font-black text-white leading-tight mb-4">
          Donnez de l'intelligence à votre gestion des effectifs.
        </h1>

        {/* Description */}
        <p className="text-slate-200 text-[15px] leading-relaxed m-0">
          Rejoignez des milliers d'organisations qui simplifient leurs opérations RH, du
          recrutement à la gestion de la performance.
        </p>

        {/* Avatars + trust */}
        <div className="mt-8 flex items-center gap-4">
          <div className="flex">
            {avatars.map((src, i) => (
              <img
                key={i}
                alt="User"
                src={src}
                className="w-[34px] h-[34px] rounded-full border-2 border-white object-cover"
                style={{ marginLeft: i === 0 ? 0 : -10 }}
              />
            ))}
          </div>
          <span className="text-white text-[13px] font-medium">
            Approuvé par plus de 500 entreprises internationales
          </span>
        </div>
      </div>
    </div>
  );
}
