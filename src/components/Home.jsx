import ShopCard from "./shopCard";
import pic4 from '../assets/images/pic4.jpg'
import pic3 from '../assets/images/pic6.jpg'
import { useNavigate } from "react-router-dom";
export default function Home() {
    const navigate = useNavigate();
   const shops = [
    { id: '1', name: "Gentlemen's Cut", address: 'Shop No. G112, MG Road, Pune', image:pic4 },
    { id: '2', name: 'Modern Styles', address: 'Shop No. 10, FC Road, Pune', image:pic3},
  ];

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-1 lg:px-30 gap-4">
        <h2 className="text-[20px] font-medium">Choose Your Style Now</h2>
      {shops.map((shop) => (
        <ShopCard key={shop.id} shop={shop} />
      ))}
    </div>
  );
}