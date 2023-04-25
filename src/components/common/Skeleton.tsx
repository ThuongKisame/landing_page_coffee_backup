import React from 'react';

const Skeleton = () => {
  return (
    <div className="w-full">
      <div className=" h-[350px] w-full animate-pulse rounded-md bg-slate-300 object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"></div>
      <div className="animate-pulse pt-3">
        <h3 className="line-clamp-1 w-[30%] rounded-md bg-slate-300 text-sm font-medium text-slate-300 group-hover:underline group-hover:underline-offset-4">
          Name
        </h3>
        <div className="mt-2 flex w-[90%] items-end gap-2 rounded-md bg-slate-300 text-slate-300">
          price
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
