import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useRef } from 'react';
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebookSquare, FaTiktok } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { IoLogoTwitter, IoLogoYoutube } from 'react-icons/io5';
import { SiZalo } from 'react-icons/si';

import type { SocialLink } from '@/contexts/ContactContext';
import { ContactContext } from '@/contexts/ContactContext';
import { navBar } from '@/masterdata/common';
import { AppConfig } from '@/utils/AppConfig';

const Footer = () => {
  const navRef = useRef(navBar);
  const contactContext = useContext(ContactContext);

  return (
    <footer
      aria-label="Site Footer"
      className="border-t border-gray-300 bg-gray-100"
    >
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex justify-center text-teal-600">
          <Link className="block text-teal-600" href="/">
            <Image
              src="/assets/logo/logo-mr-go.png"
              alt="logo"
              width={70}
              height={70}
            />
          </Link>
        </div>

        <p className="mx-auto mt-4 max-w-md text-center leading-relaxed text-gray-500">
          Hân hạnh được phục vụ quý khách !
        </p>

        <nav aria-label="Footer Nav" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            {navRef.current.map((item, index) => (
              <li key={index}>
                <Link
                  className={`  duration-200 hover:border-b hover:border-[#E6B325] hover:text-[#E6B325] `}
                  href={item.link}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          {contactContext.listSocial?.map((item: SocialLink, index: number) => {
            return (
              item.status && (
                <Link
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href={item.link}
                  key={index}
                >
                  <span className="inline-block rounded-lg bg-gray-50 p-3">
                    {'facebook'.includes(item.name.toLowerCase()) && (
                      <FaFacebookSquare className="text-blue-700" />
                    )}
                    {'youtube'.includes(item.name.toLowerCase()) && (
                      <IoLogoYoutube className="text-red-700" />
                    )}
                    {'tiktok'.includes(item.name.toLowerCase()) && (
                      <FaTiktok className="text-black" />
                    )}
                    {'instagram'.includes(item.name.toLowerCase()) && (
                      <AiFillInstagram className="text-red-700" />
                    )}
                    {'zalo'.includes(item.name.toLowerCase()) && (
                      <SiZalo className="text-blue-700" />
                    )}
                    {'twitter'.includes(item.name.toLowerCase()) && (
                      <IoLogoTwitter className="text-blue-700" />
                    )}
                  </span>
                </Link>
              )
            );
          })}
          <Link
            className="text-gray-700 transition hover:text-gray-700/75"
            href={`mailto:${contactContext.gmail}`}
          >
            <span className="inline-block rounded-lg bg-gray-50 p-3">
              <IoIosMail className="text-blue-700" />
            </span>
          </Link>
        </ul>
      </div>
      <div className="border-t border-gray-300 py-6 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Made with{' '}
        <a href="https://www.facebook.com/minhkhuy76/">Minh Khuy</a> and{' '}
        <a href="https://www.facebook.com/thuong.nhat.319">Nhật Thương</a>
      </div>
    </footer>
  );
};

export default Footer;
