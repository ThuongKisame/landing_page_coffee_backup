import 'moment/locale/vi'; // Import Vietnamese locale

import emailjs from '@emailjs/browser';
import moment from 'moment';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Popup from '@/components/common/Popup';
import { CartContext } from '@/contexts/CartContext';
import { getDistrict, getProvince, getWard } from '@/libs/getAddressVietNam';
import { validatePhoneNumber } from '@/utils/validation';

import Dropdown from './Dropdown';

type InputFiledType = {
  value: string;
  error: string;
};

export type ItemsAddressType = {
  name: string;
  code: number;
};
export type InputFiledTypeAddress = {
  value: ItemsAddressType;
  error: string;
  items: ItemsAddressType[];
};

export default function Index() {
  const { cartItems, totalMoney, clearCart } = useContext(CartContext);
  const [isOrderDone, setIsOrderDone] = useState(false);

  const [name, setName] = useState<InputFiledType>({ value: '', error: '' });
  const [phoneNumber, setPhoneNumber] = useState<InputFiledType>({
    value: '',
    error: '',
  });
  const [address, setAddress] = useState<InputFiledType>({
    value: '',
    error: '',
  });
  const [province, setProvince] = useState<InputFiledTypeAddress>({
    value: { name: '', code: 0 },
    error: '',
    items: [],
  });
  const [district, setDistrict] = useState<InputFiledTypeAddress>({
    value: { name: '', code: 0 },
    error: '',
    items: [],
  });
  const [ward, setWard] = useState<InputFiledTypeAddress>({
    value: { name: '', code: 0 },
    error: '',
    items: [],
  });

  // fetch province data
  useEffect(() => {
    const getProvinceItems = async () => {
      const data = await getProvince();
      if (data)
        setProvince({
          ...province,
          items: data.map((item: any) => {
            return { name: item?.name, code: item?.code };
          }),
        });
    };
    if (cartItems.length > 0) getProvinceItems();
  }, [cartItems]);

  // fetch district data
  useEffect(() => {
    const getDistrictItems = async () => {
      const data = await getDistrict();
      if (data)
        setDistrict({
          ...district,
          items: data
            .filter((item: any) => item.province_code === province.value.code)
            .map((item: any) => {
              return { name: item?.name, code: item?.code };
            }),
        });
    };
    if (cartItems.length > 0 && province.value.code !== 0) getDistrictItems();
  }, [province.value.code]);

  // fetch ward data
  useEffect(() => {
    const getWardItems = async () => {
      const data = await getWard();
      if (data)
        setWard({
          ...ward,
          items: data
            .filter((item: any) => item.district_code === district.value.code)
            .map((item: any) => {
              return { name: item?.name, code: item?.code };
            }),
        });
    };
    if (cartItems.length > 0 && district.value.code !== 0) getWardItems();
  }, [district.value.code]);

  const handleOnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName({ ...name, value: e.target.value });
  };
  const handleOnChangePhoneNumber = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber({ ...phoneNumber, value: e.target.value });
  };
  const handleOnChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, value: e.target.value });
  };

  const checkForm = () => {
    let isValid = true;
    setName((prev) => ({
      ...prev,
      error: '',
    }));
    setPhoneNumber((prev) => ({
      ...prev,
      error: '',
    }));
    setAddress((prev) => ({
      ...prev,
      error: '',
    }));
    setProvince((prev) => ({
      ...prev,
      error: '',
    }));
    setDistrict((prev) => ({
      ...prev,
      error: '',
    }));
    setWard((prev) => ({
      ...prev,
      error: '',
    }));

    if (name.value.trim() === '') {
      setName((prev) => ({
        ...prev,
        error: 'Vui lòng điền đầy đủ thông tin',
      }));
      isValid = false;
    }

    if (phoneNumber.value.trim() === '') {
      setPhoneNumber((prev) => ({
        ...prev,
        error: 'Vui lòng điền đầy đủ thông tin',
      }));
      isValid = false;
    } else if (!validatePhoneNumber(phoneNumber.value)) {
      setPhoneNumber((prev) => ({
        ...prev,
        error: 'Vui lòng nhập đúng định dạng số điện thoại',
      }));
      isValid = false;
    }

    if (address.value.trim() === '') {
      setAddress((prev) => ({
        ...prev,
        error: 'Vui lòng điền đầy đủ thông tin',
      }));
      isValid = false;
    }
    if (province.value.name.trim() === '') {
      setProvince((prev) => ({
        ...prev,
        error: 'Vui lòng điền đầy đủ thông tin',
      }));
      isValid = false;
    }
    if (district.value.name.trim() === '') {
      setDistrict((prev) => ({
        ...prev,
        error: 'Vui lòng điền đầy đủ thông tin',
      }));
      isValid = false;
    }
    if (ward.value.name.trim() === '') {
      setWard((prev) => ({
        ...prev,
        error: 'Vui lòng điền đầy đủ thông tin',
      }));
      isValid = false;
    }
    return isValid;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValidForm = checkForm();
    if (isValidForm) {
      // console.log({
      //   products: cartItems,
      //   province: province.value.name,
      //   district: district.value.name,
      //   ward: ward.value.name,
      //   name: name.value,
      //   phoneNumber: phoneNumber.value,
      //   address: address.value,
      // });

      const productFormatHTML = `${cartItems.map(
        (item) =>
          `<img src="${item.image}" alt="product" style="width:100px"><br>${
            item.name
          }<br>Giá gốc: ${new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(item.price)}<br>Khuyễn mãi: ${
            item.discount
          }%<br>Số lượng: ${item.quantity}
          
          <br>Giá sau khuyến mãi: ${new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(
            (item.price - (item.price * item.discount) / 100) * item.quantity
          )}<br><br>`
      )}<strong>Tổng tiền: ${new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(totalMoney)}</strong>`;

      const date = moment().locale('vi').format('LLL');

      const addressFormat = `<br>Tên người mua: ${name.value}<br> Số điện thoại: ${phoneNumber.value}<br> Địa chỉ: ${address.value}<br> Xã/Phường/Thị Trấn: ${ward.value.name} <br> Quận/Huyện: ${district.value.name} <br> Tỉnh/Thành phố: ${province.value.name} <br> Vào lúc: ${date} `;

      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
          {
            from_name: 'Website Coffee Mr.Go',
            html: true,
            my_html: `${addressFormat} <hr> ${productFormatHTML} `,
            message: '',
            email_id: 'websiteMrGo@gmail.com',
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
        )
        .then(
          () => {
            clearCart();
            setIsOrderDone(true);
          },
          (error: any) => {
            console.error(error);
            toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!');
          }
        );
    }
  };

  return (
    <>
      {isOrderDone && (
        <Popup
          title="Đặt hàng thành công!"
          text="Coffee Mr.GO cám ơn bạn đã đặt hàng của shop. Chúng tôi sẽ liên hệ để xác nhận thông tin. Xin cám ơn!!!"
          link="/shop"
          btnText="Tiếp tục mua sản phẩm"
        />
      )}
      {cartItems.length === 0 && (
        <div className="grid h-[calc(100vh-4rem)] place-content-center bg-white px-4">
          <div className="text-center">
            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Không có sản phẩm nào để thanh toán
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
            >
              Quay trở lại cửa hàng
            </Link>
          </div>
        </div>
      )}
      {cartItems.length > 0 && (
        <section>
          <div className=" mx-auto grid max-w-screen-xl grid-cols-1 gap-4 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
            <div className="py-12 md:py-12">
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
                                              (product.price *
                                                product.discount) /
                                                100
                                          )}
                                        </dd>
                                      </div>
                                    </dl>
                                  </div>
                                </div>
                              </td>

                              <td className="whitespace-nowrap px-0 py-2 text-center text-gray-700 sm:px-4">
                                {product.quantity}
                              </td>

                              <td className="whitespace-nowrap px-0 py-2 text-center text-gray-700 sm:px-4">
                                {new Intl.NumberFormat('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND',
                                }).format(
                                  (product.price -
                                    (product.price * product.discount) / 100) *
                                    product.quantity
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
                <form className="grid grid-cols-6 gap-6" onSubmit={submit}>
                  <div className="relative col-span-6">
                    <label
                      htmlFor="LastName"
                      className="block text-xs font-medium text-gray-700"
                    >
                      Họ tên
                    </label>

                    <input
                      type="text"
                      id="name"
                      value={name.value}
                      onChange={handleOnChangeName}
                      className="mt-1 w-full rounded-md border-gray-200 px-4 py-2 shadow sm:text-sm"
                    />
                    {name.error && (
                      <p
                        id="messForname"
                        className="absolute text-xs text-red-700"
                      >
                        {name.error}
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
                      type="input"
                      id="Phone"
                      value={phoneNumber.value}
                      onChange={handleOnChangePhoneNumber}
                      className="mt-1 w-full rounded-md border-gray-200 px-4 py-2 shadow sm:text-sm"
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
                  <div className="relative col-span-6 ">
                    <label
                      htmlFor="Address"
                      className="block text-xs font-medium text-gray-700"
                    >
                      Địa chỉ
                    </label>

                    <input
                      id="Address"
                      value={address.value}
                      onChange={handleOnChangeAddress}
                      className="mt-1 w-full rounded-md border-gray-200 px-4 py-2 shadow sm:text-sm"
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

                  <div className="relative col-span-6">
                    <Dropdown
                      label="Tỉnh/Thành phố"
                      items={province.items}
                      error={province.error}
                      value={province.value}
                      setValue={setProvince}
                    />
                  </div>
                  <div className="relative col-span-6">
                    <Dropdown
                      label="Quận/Huyện"
                      items={district.items}
                      error={district.error}
                      value={district.value}
                      setValue={setDistrict}
                    />
                  </div>
                  <div className="relative col-span-6">
                    <Dropdown
                      label="Xã/Phường/Thị Trấn"
                      items={ward.items}
                      error={ward.error}
                      value={ward.value}
                      setValue={setWard}
                    />
                  </div>

                  <div className="col-span-6">
                    <div className="space-y-2 py-2 text-center">
                      <button
                        type="submit"
                        className="block w-full rounded border bg-[#E6B325] px-5 py-3  text-sm font-medium text-white  transition hover:border-[#E6B325] hover:ring-1  hover:ring-[#E6B325]"
                      >
                        Đặt hàng
                      </button>

                      <Link
                        href="/cart"
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
      )}
    </>
  );
}
