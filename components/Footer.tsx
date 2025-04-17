// components/Footer.tsx
'use client';

import Link from 'next/link';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white text-white py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Contact Section */}
        <div className="text-center md:text-left">
          <h2 className="text-white text-xl font-semibold mb-2">Contact Me</h2>
          <p className="text-white">Phone: <span className="text-white">+91 9244524565</span></p>
          <p className="text-white">Email: <span className="text-white">example@email.com</span></p>
        </div>

        {/* Links Section */}
        <div className="text-center md:text-right">
          <h2 className="text-white text-xl font-semibold mb-2">Follow Me</h2>
          <div className="flex justify-center md:justify-end space-x-6 text-white text-2xl">
            <Link href="https://www.instagram.com" target="_blank">
              <FaInstagram className="hover:text-white transition-colors duration-300" />
            </Link>
            <Link href="https://github.com" target="_blank">
              <FaGithub className="hover:text-white transition-colors duration-300" />
            </Link>
            <Link href="https://www.linkedin.com" target="_blank">
              <FaLinkedin className="hover:text-white transition-colors duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-white mt-6">
        © {new Date().getFullYear()} YourName. All rights reserved.
      </div>
    </footer>
  );    
}
