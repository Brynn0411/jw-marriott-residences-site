
"use client";
import React, { useState } from "react";


export default function Page() {
  const PROJECT = {
    name: "JW Marriott Residences | Downtown Orlando",
    tagline:
      "Limited luxury condominium residences above JW Marriott Orlando, steps from the Dr. Phillips Center.",
    logoText: "JW Marriott Residences",
    heroImage: "/hero.jpg",
    gallery: [
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691398372-84f0f9f3f95b?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop",
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
      phone: "(407) 555-0123",
      email: "brynn@example.com",
      license: "SL1234567",
    },
  };

  const NAV = [
    { id: "home", label: "Home" },
    { id: "residences", label: "Residences" },
    { id: "location", label: "Location" },
    { id: "register", label: "Register" },
  ];

  const initial = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bedrooms: "",
    priceRange: "",
    timeline: "",
    buyerType: "",
    source: "",
    message: "",
    optIn: false,
    marketing: false,
  };
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle");
  const usingFormspree = !!PROJECT.form.formspreeEndpoint;

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

 async function handleSubmit(e) {
  e.preventDefault();
  if (!form.firstName || !form.email) {
    alert("Please provide at least your first name and email.");
    return;
  }
  setStatus("sending");
  try {
    const endpoint = PROJECT.form.formspreeEndpoint;
    if (!endpoint) throw new Error("Missing Formspree endpoint");

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Accept": "application/json",      // important for Formspree AJAX
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        project: PROJECT.name,
        formName: "Interest List"
      })
    });

    if (resp.ok) {
      setStatus("success");
      setForm(initial);
    } else {
      const data = await resp.json().catch(() => ({}));
      console.error("Formspree error:", data);
      setStatus("error");
      alert("Submit failed. Check Allowed Domains and your endpoint.");
    }
  } catch (err) {
    console.error(err);
    setStatus("error");
  }
}


  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold tracking-wide">{PROJECT.logoText}</div>
          <nav className="hidden md:flex gap-6 text-sm">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollToId(n.id)} className="hover:text-gray-700">
                {n.label}
              </button>
            ))}
          </nav>
          <button onClick={() => scrollToId("register")} className="ml-4 rounded-2xl px-4 py-2 text-sm bg-black text-white hover:opacity-90">
            Register Interest
          </button>
        </div>
      </header>

      <section id="home" className="relative">
        <div className="h-[70vh] w-full bg-center bg-cover" style={{ backgroundImage: `url(${PROJECT.heroImage})` }} />
        <div className="max-w-5xl mx-auto px-4 -mt-20">
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <h1 className="text-2xl md:text-4xl font-semibold leading-tight">{PROJECT.name}</h1>
            <p className="mt-3 text-gray-600 md:text-lg">{PROJECT.tagline}</p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <button onClick={() => scrollToId("residences")} className="rounded-2xl px-5 py-3 bg-black text-white">Explore Residences</button>
              <a href={PROJECT.brochureUrl} target="_blank" rel="noreferrer" className="rounded-2xl px-5 py-3 border">Download Brochure</a>
            </div>
          </div>
        </div>
      </section>

      <section id="residences" className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Residences & Amenities</h2>
            <ul className="mt-5 space-y-2 text-gray-700">
              <li>• 1–3 bedroom floor plans; penthouse collection</li>
              <li>• Hotel-serviced living with JW concierge access</li>
              <li>• Elevated pool deck, fitness & spa privileges</li>
              <li>• Valet, 24/7 attended lobby, private owners' lounge</li>
              <li>• Floor-to-ceiling glazing, curated finishes</li>
              <li>• Moments to Dr. Phillips Center, Lake Eola, Amway Center</li>
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="p-4 rounded-2xl border">
                <div className="text-xs uppercase tracking-wide text-gray-500">Estimated Pricing</div>
                <div className="mt-1 font-medium">From the $700Ks+</div>
              </div>
              <div className="p-4 rounded-2xl border">
                <div className="text-xs uppercase tracking-wide text-gray-500">HOA/Condo Dues</div>
                <div className="mt-1 font-medium">TBD</div>
              </div>
              <div className="p-4 rounded-2xl border">
                <div className="text-xs uppercase tracking-wide text-gray-500">Delivery</div>
                <div className="mt-1 font-medium">TBD</div>
              </div>
              <div className="p-4 rounded-2xl border">
                <div className="text-xs uppercase tracking-wide text-gray-500">Developer</div>
                <div className="mt-1 font-medium">TBD</div>
              </div>
            </div>
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
          <p className="mt-3 text-gray-700 max-w-3xl">
            Centrally located in the heart of Downtown Orlando with dining, arts, and major venues just outside your door.
          </p>
          <div className="mt-6 rounded-2xl overflow-hidden border">
            <iframe title="Map" src={PROJECT.mapEmbed} className="w-full h-[380px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>

      <section id="register" className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Join the Interest List</h2>
            <p className="mt-3 text-gray-700">Be among the first to receive floor plans, pricing, and release timing.</p>
            <div className="mt-6 p-4 rounded-2xl border text-sm text-gray-600">
              <p>
                By submitting, you agree to be contacted about {PROJECT.name}. You can opt out at any time.{" "}
                {PROJECT.form.notifyEmail && (
                  <>Inquiries: <a href={`mailto:${PROJECT.form.notifyEmail}`} className="underline">{PROJECT.form.notifyEmail}</a>.</>
                )}
              </p>
            </div>
            <div className="mt-6 text-sm text-gray-600">
              <p className="italic">Broker: {PROJECT.broker.team}. {PROJECT.broker.agent} {PROJECT.broker.license && `• Lic ${PROJECT.broker.license}`}</p>
            </div>
          </div>
          <div>
            {status === "success" ? (
              <div className="rounded-2xl border p-6 bg-green-50">
                <div className="font-medium">Thank you!</div>
                <p className="mt-2 text-gray-700">You're on the list. We'll follow up with details shortly.</p>
                <button onClick={() => setStatus("idle")} className="mt-4 rounded-2xl px-4 py-2 border">Add another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} name="Interest List" className="rounded-2xl border p-6 grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="First name*" value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} required />
                  <Input label="Last name" value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Email*" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                  <Input label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select label="Bedrooms" value={form.bedrooms} onChange={(v) => setForm({ ...form, bedrooms: v })} options={["1","2","3","Penthouse"]} />
                  <Select label="Price range" value={form.priceRange} onChange={(v) => setForm({ ...form, priceRange: v })} options={["$700k–$900k","$900k–$1.2M","$1.2M+","TBD"]} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select label="Timeline" value={form.timeline} onChange={(v) => setForm({ ...form, timeline: v })} options={["ASAP","3–6 months","6–12 months","> 12 months"]} />
                  <Select label="Buyer type" value={form.buyerType} onChange={(v) => setForm({ ...form, buyerType: v })} options={["Primary","Pied-à-terre","Investment","1031","Other"]} />
                </div>
                <Select label="How did you hear about us?" value={form.source} onChange={(v) => setForm({ ...form, source: v })} options={["Instagram","Facebook","Referral","Drive-by","Open House","Other"]} />
                <TextArea label="Notes" value={form.message} onChange={(v) => setForm({ ...form, message: v })} placeholder="Tell us what matters to you (views, floor, finishes, etc.)" />
                <Checkbox label="I agree to receive updates about this property." checked={form.optIn} onChange={(v) => setForm({ ...form, optIn: v })} />
                <Checkbox label="I'm a real estate agent." checked={form.marketing} onChange={(v) => setForm({ ...form, marketing: v })} />
                <button type="submit" disabled={status === "sending"} className="rounded-2xl px-5 py-3 bg-black text-white disabled:opacity-50">
                  {status === "sending" ? "Submitting…" : "Join List"}
                </button>
                {status === "error" && <div className="text-red-600 text-sm">Something went wrong. Please try again or email us directly.</div>}
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>© {new Date().getFullYear()} {PROJECT.broker.team}. All rights reserved. Fair Housing & Equal Opportunity.</div>
            <div className="flex gap-6">
              <a href="#register" className="hover:underline">Privacy</a>
              <a href="#register" className="hover:underline">Disclaimer</a>
              <a href={`mailto:${PROJECT.broker.email}`} className="hover:underline">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", required }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-700">{label}</span>
      <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2" />
    </label>
  );
}

function Select({ label, value, onChange, options = [] }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-700">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2">
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-700">{label}</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={4} className="mt-1 w-full rounded-xl border px-3 py-2" />
    </label>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-start gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1" />
      <span className="text-gray-700">{label}</span>
    </label>
  );
}
