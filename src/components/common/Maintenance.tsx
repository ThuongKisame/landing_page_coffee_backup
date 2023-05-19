import Image from 'next/image';

const Index = () => {
  return (
    <div className="grid  h-screen place-content-center bg-gray-100 px-4">
      <div className="text-center">
        <div className="flex justify-center text-teal-600">
          <div className="block text-teal-600">
            <Image
              src="/assets/logo/logo-mr-go.png"
              alt="logo"
              width={70}
              height={70}
            />
          </div>
        </div>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Coffee Mr.Go hiện đang bảo trì.
        </p>

        <p className="mt-4 text-gray-500">Vui lòng quay lại sau!!!</p>
      </div>
    </div>
  );
};

export default Index;
