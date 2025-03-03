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

  // Social links data
  const socialLinks = [
    { href: "https://facebook.com/arunachalrents", icon: faFacebook },
    { href: "https://twitter.com/", icon: faTwitter },
    { href: "https://instagram.com/", icon: faInstagram }
  ];

  // Quick links data
  const quickLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
    { href: "/contact", text: "Contact" },
    { href: "/faqs", text: "FAQs" }
  ];

  // Legal links data
  const legalLinks = [
    { href: "/terms", text: "Terms" },
    { href: "/privacy", text: "Privacy" }
  ];

  // Mobile nav items
  const navItems = [
    { href: "/", icon: <Home size={26} strokeWidth={3} /> },
    { href: "/add-room", icon: <PlusCircle size={26} strokeWidth={3} /> }
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* Mobile Navigation Footer */}
      <div className="fixed bottom-0 w-full bg-white shadow-md p-1 flex justify-around items-center border-t md:hidden z-50">
        {navItems.map((item, index) => (
          <Link 
            key={`nav-${index}`} 
            href={item.href} 
            className="p-3 rounded-lg hover:bg-gray-200 transition"
          >
            {item.icon}
          </Link>
        ))}
        <Link 
          href={user ? "/profile" : "/auth/login"} 
          className="p-3 rounded-lg hover:bg-gray-200 transition"
        >
          <UserIcon size={26} strokeWidth={3} />
        </Link>
      </div>

      {/* Add padding to the main content to ensure space below mobile nav */}
      <div className="md:hidden h-16"></div>

      {/* Informational Footer */}
      <footer className="w-full bg-white border-t pb-8 md:pb-6 mt-8">
        <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links Section */}
          <div>
            <h3 className="text-md font-semibold text-gray-800">Quick Links</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {quickLinks.map((link, index) => (
                <li key={`quick-${index}`}>
                  <Link href={link.href} className="hover:text-blue-600 transition">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-md font-semibold text-gray-800">Follow Us</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <div className="mt-2 flex justify-center md:justify-start space-x-4">
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
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-md font-semibold text-gray-800">Legal</h3>
            <ul className="mt-2 space-y-1 text-sm">
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

        {/* Copyright Section */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <div>© {currentYear} Arunachal Rents. All rights reserved.</div>
          <div className="mt-2">
            Developed by{" "}
            <Link href="https://tunu.info" className="text-blue-600 hover:underline">
              Tunu Doley
            </Link>
          </div>
        </div>
      </footer>

      {/* Add padding at the bottom on mobile to account for fixed nav */}
      <div className="md:hidden h-16"></div>
    </>
  );
}