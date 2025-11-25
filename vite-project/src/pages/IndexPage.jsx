import { Input } from "antd";
import CategoriseCard from "../categories/CategoriseCard";
import SaleCard from "../sale/SaleCard";

export default function IndexPage() {
  return (
    <div>
      <div className="relative w-full">
        <img src="/Amazing.jpg" alt="" className="w-full h-[600px] object-cover brightness-[0.6]" />
        <div className="absolute top-1/2 left-10 -translate-y-1/2 text-white">
          <h1 className="text-[96px] font-bold leading-tight drop-shadow-xl">
            Amazing Discounts<br />on Garden Products!
          </h1>
          <button className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 transition text-white rounded-lg text-lg font-semibold shadow-lg">
            Check out
          </button>
        </div>
      </div>
      <div>
        <CategoriseCard />
      </div>
      <div>
        <div className="w-full h-[486px] rounded-3xl overflow-hidden bg-linear-to-r from-green-900 to-green-600 px-10 py-8 flex flex-col">
          <h2 className="text-white font-bold text-[64px] leading-[110%] text-center mb-6">
            5% off on the first order
          </h2>
          <div className="flex flex-1 items-center">
            <div className="flex-1 h-full flex items-end">
              <img src="/first-order.png" alt="" className="h-full object-contain" />
            </div>
            <div className="flex-1 flex flex-col items-center gap-6">
              <div className="w-[452px] flex flex-col gap-6">
                <Input placeholder="Name" className="h-14 rounded-xl text-[20px] font-medium" />
                <Input placeholder="Phone number" className="h-14 rounded-xl text-[20px] font-medium" />
                <Input placeholder="Email" className="h-14 rounded-xl text-[20px] font-medium" />
              </div>
              <button className="w-[452px] h-14 bg-white rounded-xl text-[20px] font-medium hover:bg-gray-100 transition">
                Get a discount
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <SaleCard/>
      </div>
    </div>
  )
}
