"use client";  //bump
import React, { useState } from "react";

const PROJECT = {
  name: "JW Marriott Residences | Lake Eola",
  tagline:
    "Limited luxury condominium residences above JW Marriott Lake Eola, steps from the Dr. Phillips Center.",
  logoText: "JW Marriott Residences Lake Eola",
  heroImage: "/hero-v1.jpg",
  gallery: [
    "lobbyjw.png",
    "lobby2.png",
    "exteriorjw.png",
    "aerialjw.png",
  ],
  mapEmbed: "https://www.google.com/maps?q=downtown+orlando&output=embed",
  brochureUrl: "#",
  form: {
    formspreeEndpoint: "https://formspree.io/f/xqadweon",
    useNetlifyForms: false,
    notifyEmail: "",
  },
  broker: {
    team: "Corcoran Premier Realty",
    agent: "Brynn Allen, REALTOR®",
    phone: "(407) 617-8963",
    email: "brynn.allen@corcoranpremier.com",
    license: "BK3080729",
  },
};

const NAV = [
  { id: "home", label: "Home" },
  { id: "residences", label: "Residences" },
  { id: "location", label: "Location" },
  { id: "register", label: "Register" },
];

const initial = {
  firstName: "", lastName: "", email: "", phone: "",
  bedrooms: "", priceRange: "", timeline: "", buyerType: "",
  source: "", message: "", optIn: false, marketing: false,
};

export default function Page() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle");

  function scrollToId(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.phone || !form.email) return alert("First name & email required.");
    setStatus("sending");
    try {
      const r = await fetch(PROJECT.form.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, project: PROJECT.name, formName: "Interest List" }),
      });
      setStatus(r.ok ? "success" : "error");
      if (r.ok) setForm(initial);
    } catch { setStatus("error"); }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold tracking-wide">{PROJECT.logoText}</div>
          <nav className="hidden md:flex gap-6 text-sm">
            {NAV.map(n => (
              <button key={n.id} onClick={() => scrollToId(n.id)} className="hover:text-gray-700">
                {n.label}
              </button>
            ))}
          </nav>
          <button onClick={() => scrollToId("register")}
            className="ml-4 rounded-2xl px-4 py-2 text-sm bg-black text-white">Register Interest</button>
        </div>
      </header>

      <section id="home" className="relative">
        <div className="h-[70vh] w-full bg-center bg-cover"
             style={{ backgroundImage: `url(${PROJECT.heroImage})` }} />
        <div className="max-w-5xl mx-auto px-4 -mt-20">
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <h1 className="text-2xl md:text-4xl font-semibold leading-tight">{PROJECT.name}</h1>
            <p className="mt-3 text-gray-600 md:text-lg">{PROJECT.tagline}</p>
          </div>
        </div>
      </section>

      <section id="residences" className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Residences & Amenities</h2>
            <ul className="mt-5 space-y-2 text-gray-700">
              <li>• 2–4 bedroom floor plans; penthouse collection</li>
              <li>• Hotel-serviced living with JW concierge access</li>
              <li>• Elevated pool deck, fitness & spa privileges</li>
              <li>• Valet, 24/7 attended lobby, private owners' lounge</li>
              <li>• Floor-to-ceiling glazing, curated finishes</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {PROJECT.gallery.map((src, i) => (
              <img key={i} src={src} alt="Gallery" className="rounded-2xl w-full h-40 object-cover" />
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold">Unbeatable Downtown Location</h2>
          <div className="mt-6 rounded-2xl overflow-hidden border">
            <iframe title="Map" src={PROJECT.mapEmbed} className="w-full h-[380px]" loading="lazy" />
          </div>
        </div>
      </section>

      <section id="register" className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Join the Interest List</h2>
            <p className="mt-3 text-gray-700">Be first to receive floor plans, pricing, and release timing.</p>
          </div>
          <div>
            {status === "success" ? (
              <div className="rounded-2xl border p-6 bg-green-50">
                <div className="font-medium">Thank you! You're on the list.</div>
                <button onClick={() => setStatus("idle")} className="mt-4 rounded-2xl px-4 py-2 border">Add another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl border p-6 grid grid-cols-1 gap-4">
                <Input label="First name*" value={form.firstName}
                       onChange={v => setForm({ ...form, firstName: v })} required />
                <Input label="Last name*" value={form.lastName}
                       onChange={v => setForm({ ...form, lastName: v })} required />
                <Input label="Email*" type="email" value={form.email}
                       onChange={v => setForm({ ...form, email: v })} required />
                <Input label="Phone" value={form.phone}
                       onChange={v => setForm({ ...form, phone: v })} />
                <button type="submit" disabled={status === "sending"}
                        className="rounded-2xl px-5 py-3 bg-black text-white disabled:opacity-50">
                  {status === "sending" ? "Submitting…" : "Join List"}
                </button>
                {status === "error" && <div className="text-red-600 text-sm">Please try again.</div>}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", required }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-700">{label}</span>
      <input type={type} required={required} value={value}
             onChange={(e) => onChange(e.target.value)}
             className="mt-1 w-full rounded-xl border px-3 py-2" />
    </label>
  );
}
