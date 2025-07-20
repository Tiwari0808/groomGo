import { Link } from "react-router-dom";

export default function ShopCard({ shop }) {
    return (
        <Link to={`/shopDetails/${shop.id}`}>
            <div className="border  border-gray-700 bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition">
                <img src={shop.image} alt={shop.name} className="h-[50vh] w-full object-cover object-center" />
                <div className="p-4">
                 <h2 className="text-xl font-semibold text-white">{shop.name}</h2>
                 <p className="text-gray-600">{shop.address}</p>
                </div>
            </div>
        </Link>
    );
}