// components/Footer.tsx
'use client';

import Link from 'next/link';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 h-fit w-full">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Contact Section */}
        <div className="text-center md:text-left">
          <h2 className="text-white text-xl font-semibold mb-2">Contact Me</h2>
          <p className="text-white">Phone: <span className="text-white">+91 9244524565</span></p>
          <p className="text-white">Email: <span className="text-white">adityafullstackdoveloper@email.com</span></p>
        </div>  

        {/* Links Section */}
        <div className="text-center md:text-right">
          <h2 className="text-white text-xl font-semibold mb-2">Follow Me</h2>
          <div className="flex justify-center md:justify-end space-x-6 text-white text-2xl">
            <Link href="https://www.instagram.com/aditya_rawat_devops/" target="_blank">
              <FaInstagram className="hover:text-white transition-colors duration-300" />
            </Link>
            <Link href="https://github.com/adityarwt1" target="_blank">
              <FaGithub className="hover:text-white transition-colors duration-300" />
            </Link>
            <Link href="https://www.linkedin.com/in/aditya-rawat-3862182b0/" target="_blank">
              <FaLinkedin className="hover:text-white transition-colors duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-white mt-6">
        © {new Date().getFullYear()} Aditya Rawat. All rights reserved.
      </div>
    </footer>
  );    
}
