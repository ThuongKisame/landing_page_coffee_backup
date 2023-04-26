import Link from 'next/link';
import { useCallback, useContext, useState } from 'react';

import { CartContext } from '@/contexts/CartContext';

export default function Index() {
  const { cartItems, totalMoney } = useContext(CartContext);

  const [firstName, setFirstName] = useState({ value: '', error: '' });
  const [lastName, setLastName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' });
  const [address, setAddress] = useState({ value: '', error: '' });

  function validateEmail(value: string) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(value).toLowerCase());
  }

  function validatePhoneNumber(value: string) {
    const regex = /^\d{10}$/; // biểu thức chính quy để kiểm tra số điện thoại
    return regex.test(value);
  }

  const handleChangeFirstName = useCallback(
    (value: string) => {
      if (value.length === 0) {
        setFirstName({ value, error: 'Vui lòng điền đầy đủ thông tin' });
      } else {
        setFirstName({ value, error: '' });
      }
    },
    [setFirstName]
  );

  const handleChangeLastName = useCallback(
    (value: string) => {
      if (value.length === 0) {
        setLastName({ value, error: 'Vui lòng điền đầy đủ thông tin' });
      } else {
        setLastName({ value, error: '' });
      }
    },
    [setLastName]
  );

  const handleChangeEmail = useCallback(
    (value: string) => {
      if (value.length === 0) {
        setEmail({ value, error: 'Vui lòng điền đầy đủ thông tin' });
      } else if (validateEmail(value)) {
        setEmail({ value, error: '' });
      } else {
        setEmail({
          value,
          error: 'Vui lòng nhập đúng định dạng Email',
        });
      }
    },
    [setEmail, validateEmail]
  );

  const handleChangePhoneNumber = useCallback(
    (value: string) => {
      if (value.length === 0) {
        setPhoneNumber({
          value,
          error: 'Vui lòng điền đầy đủ thông tin',
        });
      } else if (validatePhoneNumber(value)) {
        setPhoneNumber({ value, error: '' });
      } else {
        setPhoneNumber({
          value,
          error: 'Vui lòng nhập đúng định dạng số điện thoại',
        });
      }
    },
    [setPhoneNumber, validatePhoneNumber]
  );

  const handleChangeAddress = useCallback(
    (value: string) => {
      if (value.length === 0) {
        setAddress({ value, error: 'Vui lòng điền đầy đủ thông tin' });
      } else {
        setAddress({ value, error: '' });
      }
    },
    [setAddress]
  );

  const checkForm = useCallback(() => {
    let stmp = true;
    if (firstName.value.trim() === '') {
      setFirstName((prev) => ({
        ...prev,
        error: 'Vui lòng điền đầy đủ thông tin',
      }));
      stmp = false;
    }

    if (lastName.value.trim() === '') {
      setLastName((prev) => ({
        ...prev,
        error: 'Vui lòng điền đầy đủ thông tin',
      }));
      stmp = false;
    }

    if (email.value.trim() === '') {
      setEmail((prev) => ({
        ...prev,
        error: 'Vui lòng điền đầy đủ thông tin',
      }));
      stmp = false;
    } else if (!validateEmail(email.value)) {
      setEmail((prev) => ({
        ...prev,
        error: 'Vui lòng nhập đúng định dạng Email',
      }));
      stmp = false;
    }

    if (phoneNumber.value.trim() === '') {
      setPhoneNumber((prev) => ({
        ...prev,
        error: 'Vui lòng điền đầy đủ thông tin',
      }));
      stmp = false;
    } else if (!validatePhoneNumber(phoneNumber.value)) {
      setPhoneNumber((prev) => ({
        ...prev,
        error: 'Vui lòng nhập đúng định dạng số điện thoại',
      }));
      stmp = false;
    }

    if (address.value.trim() === '') {
      setAddress((prev) => ({
        ...prev,
        error: 'Vui lòng điền đầy đủ thông tin',
      }));
      stmp = false;
    }
    return stmp;
  }, [
    firstName.value,
    lastName.value,
    email.value,
    phoneNumber.value,
    address.value,
    validateEmail,
    validatePhoneNumber,
  ]);

  return (
    <section>
      <div className=" mx-auto  grid max-w-screen-xl grid-cols-1 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
        <div className=" py-12 md:py-12 ">
          <div className=" w-full space-y-8">
            <div>
              <div className="flow-root  ">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                    <thead className="border-t-2 border-gray-600 ltr:text-left rtl:text-right">
                      <tr>
                        <th className="px-0 py-2 text-left font-medium text-gray-900 sm:px-4 ">
                          Sản phẩm
                        </th>
                        <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900 sm:px-4">
                          Số lượng
                        </th>
                        <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900 sm:px-4">
                          Giá tiền
                        </th>
                        <th className="px-4 py-2"></th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {cartItems.map((product: any, index) => (
                        <tr key={index}>
                          <td className=" px-0 py-2 font-medium text-gray-900 sm:px-4">
                            <div className="flex-row md:flex">
                              <img
                                alt=""
                                src={product.image}
                                className="h-16 w-16 rounded object-cover"
                              />

                              <div className="flex flex-col justify-center px-1">
                                <h3 className="line-clamp-1 text-sm text-gray-900">
                                  {product.name}
                                </h3>

                                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                  <div>
                                    <dt className="inline">Giá: </dt>
                                    <dd className="inline">
                                      {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                      }).format(
                                        product.price -
                                          (product.price * product.discount) /
                                            100
                                      )}
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-0 py-2 text-center text-gray-700 sm:px-4">
                            {product.amount}
                          </td>

                          <td className="whitespace-nowrap px-0 py-2 text-center text-gray-700 sm:px-4">
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            }).format(
                              (product.price -
                                (product.price * product.discount) / 100) *
                                product.amount
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="w-full  border-t-2 border-gray-600">
                  <div className="flex justify-between border-b border-gray-600 px-0 py-1 sm:px-4">
                    <span className="font-medium">Tổng tiền</span>
                    <span className="pr-4 font-bold text-gray-700 sm:pr-10">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(totalMoney)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 py-8 md:py-12">
          <div className="mx-auto max-w-lg px-4 lg:px-8">
            <form className="grid grid-cols-6 gap-6">
              <div className="relative col-span-3">
                <label
                  htmlFor="FirstName"
                  className="block text-xs font-medium text-gray-700"
                >
                  Họ
                </label>

                <input
                  type="text"
                  id="FirstName"
                  value={firstName.value}
                  onChange={(e) => handleChangeFirstName(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 py-2 shadow sm:text-sm"
                  required
                />
                {firstName.error && (
                  <p
                    id="messForFirstName"
                    className="absolute text-xs text-red-700"
                  >
                    {firstName.error}
                  </p>
                )}
              </div>

              <div className="relative col-span-3">
                <label
                  htmlFor="LastName"
                  className="block text-xs font-medium text-gray-700"
                >
                  Tên
                </label>

                <input
                  type="text"
                  id="LastName"
                  value={lastName.value}
                  onChange={(e) => handleChangeLastName(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 py-2 shadow sm:text-sm"
                  required
                />
                {lastName.error && (
                  <p
                    id="messForLastName"
                    className="absolute text-xs text-red-700"
                  >
                    {lastName.error}
                  </p>
                )}
              </div>

              <div className="relative col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-xs font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="Email"
                  value={email.value}
                  onChange={(e) => handleChangeEmail(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 py-2 shadow sm:text-sm"
                  required
                />
                {email.error && (
                  <p
                    id="messForEmail"
                    className="absolute text-xs text-red-700"
                  >
                    {email.error}
                  </p>
                )}
              </div>

              <div className="relative col-span-6">
                <label
                  htmlFor="Phone"
                  className="block text-xs font-medium text-gray-700"
                >
                  Số điện thoại
                </label>

                <input
                  type="tel"
                  id="Phone"
                  value={phoneNumber.value}
                  onChange={(e) => handleChangePhoneNumber(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 py-2 shadow sm:text-sm"
                  required
                />
                {phoneNumber.error && (
                  <p
                    id="messForPhoneNumber"
                    className="absolute text-xs text-red-700"
                  >
                    {phoneNumber.error}
                  </p>
                )}
              </div>

              <div className="relative col-span-6">
                <label
                  htmlFor="Address"
                  className="block text-xs font-medium text-gray-700"
                >
                  Địa chỉ
                </label>

                <textarea
                  id="Address"
                  value={address.value}
                  onChange={(e) => handleChangeAddress(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 py-2 shadow sm:text-sm"
                  required
                />
                {address.error && (
                  <p
                    id="messForAddress"
                    className="absolute text-xs text-red-700"
                  >
                    {address.error}
                  </p>
                )}
              </div>

              <div className="col-span-6">
                <div className="space-y-2 py-2 text-center">
                  <button
                    className="w-full"
                    onClick={(e) => {
                      if (checkForm()) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Link
                      href={`/cart/checkout`}
                      className="block rounded border bg-[#E6B325] px-5 py-3  text-sm font-medium text-white  transition hover:border-[#E6B325] hover:ring-1  hover:ring-[#E6B325]"
                    >
                      Đặt hàng
                    </Link>
                  </button>

                  <Link
                    href={`/cart`}
                    className="block rounded border border-gray-600 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-[#E6B325] hover:text-[#E6B325] hover:ring-1 hover:ring-[#E6B325]"
                  >
                    Quay lại giỏ hàng
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
