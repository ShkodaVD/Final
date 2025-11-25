import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../stores";
import Counter from "../components/Counter";

export default function OneProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [cart, setCart] = useContext(CartContext);

    useEffect(() => {
        async function getProduct() {
            const resp = await fetch(`http://localhost:3333/products/${id}`);
            if (resp.ok) {
                const data = await resp.json();
                setProduct(data[0]);
            }
        }
        getProduct();
    }, [id]);

    function addToCart(product) {
        setCart(prevCart => {
            const index = prevCart.findIndex(item => item.id === product.id);
            if (index === -1) {

                return [...prevCart, { ...product, quantity: 1 }];
            } else {

                return prevCart.map((item, i) =>
                    i === index ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
        });
    }

    if (!product) {
        return <p className="p-10 text-xl text-gray-500">Loading...</p>;
    }

    return (
        <div className="mx-auto max-w-6xl p-8 flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="w-full bg-white rounded-xl shadow-lg flex items-center justify-center">
                    <img
                        src={`http://localhost:3333${product.image}`}
                        alt={product.title}
                        className="w-full h-full object-contain rounded-xl"

                    />
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-6 justify-center">
                <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
                <span className="text-3xl font-bold mb-4">${product.price}</span>

                <div className="flex items-center gap-4 mb-4">
                    {cart.findIndex(p => p.id === product.id) === -1 ? (
                        <button
                            onClick={() => addToCart(product)}
                            className="bg-green-600 hover:bg-black text-white text-lg font-semibold px-8 py-4 rounded-lg transition w-[510px]"
                        >
                            Add to cart
                        </button>
                    ) : (
                        <div className="bg-gray-500 text-white text-lg font-semibold px-8 py-4 rounded-lg transition w-[510px] flex justify-center items-center">
                            <Counter
                            id={product.id}
                            quantity={cart.find(p => p.id === product.id).quantity}
                        />
                        </div>
                    )}
                </div>


                <div>
                    <h2 className="text-xl font-semibold mb-2">Description</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
                </div>
            </div>
        </div>
    );
}
