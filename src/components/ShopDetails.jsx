import { useNavigate, useParams } from "react-router-dom"
import pic4 from '../assets/images/pic4.jpg'
import pic3 from '../assets/images/pic6.jpg'
import { Gallery } from "./Gallary";

const ShopDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const shops = [
        { id: '1', name: "Gentlemen's Cut", address: 'Shop No. G112, MG Road, Pune', image: pic4 },
        { id: '2', name: 'Modern Styles', address: 'Shop No. 10, FC Road, Pune', image: pic3 },
    ];
    return (
        <div className="flex flex-col px-4 py-6 gap-8 md:gap-12 md:px-12 bg-gray-900 text-white rounded-xl max-w-4xl mx-auto shadow-2xl">

            {/* Image and Button */}
            <div className="w-full flex flex-col gap-6 items-center text-center">
                <img
                    src={shops[id].image}
                    alt={shops[id].name}
                    className="w-full md:w-[60%] h-[50vh] object-cover rounded-xl shadow-md"
                />
                <button
                    onClick={() => navigate(`/book/${id}`)}
                    className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 text-white font-semibold text-lg rounded-full transition duration-200"
                >
                    Book Now
                </button>
            </div>

            {/* Shop Info */}
            <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold">{shops[id].name}</h2>
                <p className="text-gray-300 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
                    voluptatem necessitatibus dolores dolore dolor rerum quis. Eum
                    recusandae molestiae quo possimus eos explicabo consequuntur
                    veritatis?
                </p>
            </div>

            {/* Gallery */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                <Gallery />
            </div>
        </div>
    );

}

export default ShopDetails