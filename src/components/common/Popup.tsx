import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import OutsideAlerter from '@/hooks/useOutsideAlerter';

interface PopupProps {
  title: string;
  text: string;
  link: string;
  btnText: string;
}
const Popup = ({ title, text, link, btnText }: PopupProps) => {
  const router = useRouter();
  return (
    <div
      className="fixed left-0  top-0 z-50 flex h-full w-full items-center justify-center "
      style={{ backgroundColor: 'rgba(69, 90, 100, 0.7)' }}
    >
      <OutsideAlerter
        action={() => {
          router.push(`${link}`);
        }}
      >
        <section className="rounded-3xl bg-white shadow-2xl">
          <div className="p-8 text-center sm:p-12">
            <h2 className="text-lg font-semibold uppercase tracking-widest text-[#E6B325]">
              {title}
            </h2>

            <p className="mt-6 text-base font-bold">{text}</p>

            <Link
              className="mt-8 inline-block w-full rounded-full bg-[#E6B325] py-4 text-sm font-bold text-white shadow-xl"
              href={`${link}`}
            >
              {btnText}
            </Link>
          </div>
        </section>
      </OutsideAlerter>
    </div>
  );
};

export default Popup;
