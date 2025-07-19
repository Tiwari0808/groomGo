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
        <div className="flex flex-col px-2 py-2 gap-5 md:gap-9 md:px-15">
            <div className="w-full flex flex-col gap-5 justify-center items-center" >
                <img src={shops[id].image} className="bg-cover bg-center w-full md:w-[50%] h-[50vh]" />
                <button onClick={()=>navigate('/book')} className="bg-cyan-500 p-2 rounded-[8px] text-white cursor-pointer">Book Now</button>
            </div>
            <div>
                <h2 className="text-[20px] lg:text-[24px] font-medium">{`${shops[id].name}`}</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis voluptatem necessitatibus dolores dolore dolor rerum quis. Eum recusandae molestiae quo possimus eos explicabo consequuntur veritatis?</p>
            </div>
            <div>
                <h2 className="text-[20px] lg:text-[24px] font-medium mb-5">Gallary</h2>
                <Gallery />
            </div>
        </div>
    )
}

export default ShopDetails