import { Link } from "react-router-dom";

export default function ShopCard({ shop }) {
    return (
        <Link to={`/shop/${shop.id}`}>
            <div className="border rounded-lg overflow-hidden hover:shadow-lg">
                <img src={shop.image} alt={shop.name} className="h-[50vh] w-full object-cover object-center" />
                <div className="p-4 bg-amber-200">
                 <h2 className="text-xl font-semibold">{shop.name}</h2>
                 <p className="text-gray-600">{shop.address}</p>
                </div>
            </div>
        </Link>
    );
}