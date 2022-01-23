import type { NextPage } from 'next';
import { FaArrowLeft, FaStar, FaHeart, FaMinus, FaPlus } from "react-icons/fa";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 py-20 px-5 sm:px-20 grid gap-10 min-h-screen">
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <span className="font-semibold text-3xl">Select Item</span>
        <div className="flex justify-between">
          <span className="text-gray-500 my-2">Grey Chair</span>
          <span className="font-semibold">$19</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Tooly Table</span>
          <span className="font-semibold">$80</span>
        </div>
        <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed">
          <span>Total</span>
          <span className="font-semibold">$10</span>
        </div>
        <div className="mt-5 bg-slate-500 text-white p-3 text-center rounded-full w-2/3 mx-auto">Checkout</div>
      </div>


      <div className="bg-white overflow-hidden rounded-2xl shadow-xl">
        <div className="bg-blue-500 p-6 pb-14">
          <span className="text-white text-2xl">Profile</span>
        </div>
        <div className="rounded-2xl p-6 relative -top-5 bg-white">
          <div className="flex relative -top-16 items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 bg-red-400 rounded-full" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="font-medium">$$2,310</span>
            </div>
          </div>
          <div className="relative flex flex-col items-center -mt-10 -mb-5">
            <span className="text-lg font-medium">Tony Molloy</span>
            <span className="text-sm text-gray-500">미국</span>
          </div>
        </div>
      </div>


      <div className="bg-white p-10 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center">
          <span><FaArrowLeft className="text-blue-600"/></span>
          <div className="flex space-x-3 mb-5">{/*space-x 자식요소 서로의 공간 떼어내기 */}
            <div className="flex items-center"><FaStar className='text-yellow-400 mr-2'/> <span> 4.9</span></div>
            <span className="flex items-center shadow-xl p-2 rounded-md text-red-500"><FaHeart/></span>
          </div>
        </div>
        <div className="bg-zinc-400 h-72 mb-5 rounded-xl"/>
        <div>
          <div className="font-medium text-xl">Swoon Lounge</div>
          <span className="text-xs text-gray-500">Chair</span>
        </div>
        <div className="mt-3 mb-5 flex justify-between items-center">
          <div>
            <input type="radio" />
            <input type="radio" />
            <input type="radio" />
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-blue-100 aspect-square w-8 rounded-md flex items-center justify-center"><FaMinus className='text-gray-500'/></button>
            <span>1</span>
            <button className="p-2 bg-blue-100 aspect-square w-8 rounded-md flex items-center justify-center"><FaPlus className='text-gray-500'/></button>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <span className='font-medium text-2xl'>$450</span>
          <button className='bg-blue-500 text-center text-white text-sm rounded-lg py-2 px-10'>Add to cart</button>
        </div>
      </div>


      <div className="bg-white p-10 rounded-2xl shadow-xl"></div>
    </div>
  );
};

export default Home;
