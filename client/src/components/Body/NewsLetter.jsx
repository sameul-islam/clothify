import { useState } from "react";

export default function NewsLetter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    setEmail("");
  };

  return (
    <section className="w-full bg-[#0B0B0B] text-white py-24">

      <div className="max-w-4xl mx-auto px-5 text-center">

        {/* Title */}
        <p className="text-[11px] tracking-[0.35em] uppercase text-white/50">
          SEPY Newsletter
        </p>

        <h2 className="mt-4 text-2xl md:text-3xl font-light tracking-[0.25em] uppercase">
          Join The Inner Circle
        </h2>

        <p className="mt-6 text-sm text-white/60 max-w-xl mx-auto leading-relaxed">
          Be the first to discover new collections, private drops, and exclusive offers.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email address"
            className="
              w-full sm:w-[320px]
              px-4 py-3
              bg-transparent
              border border-white/20
              text-white
              placeholder:text-white/30
              outline-none
              text-sm
              tracking-wide
            "
          />

          <button
            type="submit"
            className="
              px-8 py-3
              bg-white
              text-black
              text-[11px]
              tracking-[0.3em]
              uppercase
              hover:bg-white/90
              transition
            "
          >
            Subscribe
          </button>

        </form>

      </div>

    </section>
  );
}