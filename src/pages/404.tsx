import Link from 'next/link';

import { Main } from '@/templates/Main';

const Index = () => {
  // console.log('products', products);
  return (
    <Main>
      <div className="grid h-[calc(100vh-4rem)] place-content-center bg-white px-4">
        <div className="text-center">
          <h1 className="text-[10rem] font-black text-gray-200">404</h1>

          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </p>

          <p className="mt-4 text-gray-500">
            Sản phẩm bạn đang tìm kiếm không tồn tại
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Quay trở lại cửa hàng
          </Link>
        </div>
      </div>
    </Main>
  );
};

export default Index;
