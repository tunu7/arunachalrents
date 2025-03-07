"use client";

import Link from "next/link";
import { Home, PlusCircle, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebaseClient";
import { onAuthStateChanged, User } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const [user, setUser] = useState<User | null>(null);
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "https://facebook.com/arunachalrents", icon: faFacebook },
    { href: "https://twitter.com/", icon: faTwitter },
    { href: "https://instagram.com/", icon: faInstagram }
  ];

  const quickLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
    { href: "/contact", text: "Contact" },
    { href: "/faqs", text: "FAQs" }
  ];

  const legalLinks = [
    { href: "/terms", text: "Terms" },
    { href: "/privacy", text: "Privacy" }
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* Navigation Bar (Mobile & Desktop) */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-6 py-3">
          {/* Left Icon */}
          <Link 
            href="/" 
            className="p-3 rounded-lg hover:bg-gray-200 transition"
          >
            <Home size={26} strokeWidth={3} />
          </Link>

          {/* Center Icon */}
          <Link 
            href="/add-room" 
            className="p-3 rounded-lg hover:bg-gray-200 transition"
          >
            <PlusCircle size={26} strokeWidth={3} />
          </Link>

          {/* Right Icon */}
          <Link 
            href={user ? "/profile" : "/auth/login"} 
            className="p-3 rounded-lg hover:bg-gray-200 transition"
          >
            <UserIcon size={26} strokeWidth={3} />
          </Link>
        </div>
      </div>

      {/* Add spacing to prevent overlap */}
      <div className="h-16"></div>

      {/* Footer Section */}
      <footer className="w-full bg-white border-t mt-8">
        <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              {quickLinks.map((link, index) => (
                <li key={`quick-${index}`}>
                  <Link href={link.href} className="hover:text-blue-600 transition">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>
            <div className="mt-2 flex justify-center md:justify-start space-x-6">
              {socialLinks.map((link, index) => (
                <Link 
                  key={`social-${index}`} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 transition"
                >
                  <FontAwesomeIcon icon={link.icon} className="text-xl" />
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Legal</h3>
            <ul className="mt-2 space-y-2">
              {legalLinks.map((link, index) => (
                <li key={`legal-${index}`}>
                  <Link href={link.href} className="hover:text-blue-600 transition">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 mt-6 pb-4">
          <div>© {currentYear} Arunachal Rents. All rights reserved.</div>
          <div className="mt-2">
            Developed by{" "}
            <Link href="https://tunu.info" className="text-blue-600 hover:underline">
              Tunu Doley
            </Link>
          </div>
        </div>
      </footer>

      {/* Bottom spacing for nav */}
      <div className="h-16"></div>
    </>
  );
}
