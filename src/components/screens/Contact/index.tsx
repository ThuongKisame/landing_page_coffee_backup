import Link from 'next/link';
import React, { useContext } from 'react';
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebookSquare, FaTiktok } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { IoLogoTwitter, IoLogoYoutube } from 'react-icons/io5';
import { SiGooglemaps, SiZalo } from 'react-icons/si';

import Skeleton from '@/components/common/Skeleton';
import type { Address, SocialLink } from '@/contexts/ContactContext';
import { ContactContext } from '@/contexts/ContactContext';

const Index = () => {
  const contactContext = useContext(ContactContext);
  return contactContext.isLoading ? (
    <>{<Skeleton />}</>
  ) : (
    <section>
      <div className="m-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-16 lg:py-8">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
          <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
            <h2 className="text-3xl font-bold sm:text-4xl">
              {contactContext.title}
            </h2>

            <p className="mt-4 text-gray-600">{contactContext.description}</p>

            <a
              href={`tel:${contactContext.phoneNumber}`}
              className="mt-8 inline-block rounded bg-[#e6b325] px-12 py-3 text-sm font-medium text-white shadow transition hover:ring-2 hover:ring-[#e6b325]"
            >
              Hỗ trợ / mua hàng
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            {contactContext.listSocial?.map(
              (item: SocialLink, index: number) => {
                return (
                  item.status && (
                    <Link
                      className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
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

                      <h2 className="mt-2 font-bold">{item.name}</h2>

                      <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                        {item.description}
                      </p>
                    </Link>
                  )
                );
              }
            )}
          </div>
        </div>
      </div>

      <div className="mt-24 border-t-2 border-[#f3f3f3] bg-[#F3F4F6]">
        <div className="mx-auto flex h-full max-w-screen-xl flex-col items-center px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold uppercase text-[#e6b325]">
            Hệ thống cửa hàng
          </h2>

          {contactContext.listAddress?.map((item: Address, index: number) => {
            return (
              <div key={index} className="py-4 text-center">
                <div className="flex items-center justify-center">
                  <SiGooglemaps size={20} className="text-[#e6b325]" />
                  <p className="ml-1 py-2 text-lg font-medium uppercase">
                    {item.area}
                  </p>
                </div>
                {item.addresses.map((elm: any, ind: number) => {
                  return (
                    elm?.status && (
                      <div key={ind} className="sm:flex">
                        <p>{elm?.address} | </p>
                        {elm?.linkAddress && (
                          <Link
                            className="ml-1 text-[#e6b325]"
                            href={`${elm.linkAddress}`}
                          >
                            Xem trên bản đồ
                          </Link>
                        )}
                      </div>
                    )
                  );
                })}
                <p className="ml-1 py-2 text-lg font-medium uppercase">
                  ------------
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-[60px]">
        <div className="mx-auto flex h-full max-w-screen-xl items-center px-4 sm:px-6 lg:px-8">
          <IoIosMail size={26} />
          <Link className="ml-1" href={`mailto:${contactContext.gmail}`}>
            {contactContext.gmail}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Index;
