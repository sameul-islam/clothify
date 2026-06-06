import { Link } from "react-router-dom";
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="w-full border-t border-black/10 py-20 ">

      <div className="max-w-6xl mx-auto px-5">

        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-lg tracking-[0.35em] uppercase font-semibold font-Cormorant text-black">
              SEP<span className="italic">Y</span>
            </h2>

            <p className="mt-4 text-sm text-black/60 leading-relaxed">
              Modern luxury fashion designed for timeless elegance and everyday confidence.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">

              <a href="#" className="text-black/60 hover:text-black transition">
                <FiInstagram size={18} />
              </a>

              <a href="#" className="text-black/60 hover:text-black transition">
                <FiFacebook size={18} />
              </a>

              <a href="#" className="text-black/60 hover:text-black transition">
                <FiTwitter size={18} />
              </a>

              <a href="#" className="text-black/60 hover:text-black transition">
                <FiYoutube size={18} />
              </a>

            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-[11px] tracking-[0.35em] uppercase text-black font-semibold mb-4">
              Shop
            </h3>

            <div className="flex flex-col gap-2 text-sm text-black/70">
              <Link className="hover:text-black/40 transition" to="/women">Women</Link>
              <Link className="hover:text-black/40 transition" to="/men">Men</Link>
              <Link className="hover:text-black/40 transition" to="/collections">Collections</Link>
              <Link className="hover:text-black/40 transition" to="/sale">Sale</Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[11px] tracking-[0.35em] uppercase text-black font-semibold mb-4">
              Support
            </h3>

            <div className="flex flex-col gap-2 text-sm text-black/70">
              <Link className="hover:text-black/40 transition">Contact</Link>
              <Link className="hover:text-black/40 transition">Shipping</Link>
              <Link className="hover:text-black/40 transition">Returns</Link>
              <Link className="hover:text-black/40 transition">FAQ</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[11px] tracking-[0.35em] uppercase text-black font-semibold mb-4">
              Legal
            </h3>

            <div className="flex flex-col gap-2 text-sm text-black/70">
              <Link className="hover:text-black/40 transition">Privacy Policy</Link>
              <Link className="hover:text-black/40 transition">Terms of Service</Link>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-black/10 pt-6 flex flex-col md:flex-row justify-between gap-4 text-xs text-black/50">

          <p>© {new Date().getFullYear()} SEPY. All rights reserved.</p>

          <p>Crafted with minimal luxury experience</p>

        </div>

      </div>

    </footer>
  );
}