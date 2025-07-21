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
        <>
            <div className="flex flex-col md:flex-row px-4 py-15 gap-8 md:gap-12 md:px-12 text-white rounded-xl mx-auto shadow-2xl">

                {/* Image and Button */}
                <div className="w-full flex flex-col gap-6 items-center text-center">
                    <img
                        src={shops[id].image}
                        alt={shops[id].name}
                        className="w-full md:w-[60%] h-[50vh] object-cover rounded-xl shadow-md"
                    />
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
                    <button
                        onClick={() => navigate(`/book/${id}`)}
                        className="bg-orange-500 cursor-pointer hover:bg-orange-700 px-6 py-2 text-white font-semibold text-lg rounded-full transition duration-200"
                    >
                        Book Now
                    </button>
                </div>

                {/* Gallery */}

            </div>
            <div>
                <h2 className="text-2xl font-bold mb-6 px-5 ">Gallery</h2>
                <Gallery />
            </div>
        </>
    );

}

export default ShopDetails