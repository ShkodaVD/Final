import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../stores";
import Counter from "../components/Counter";

export default function SaleCard() {

    const [products, setProducts] = useState([]);

    const [cart, setCart] = useContext(CartContext);

    useEffect(() => {
        async function getProducts() {
            const resp = await fetch("http://localhost:3333/products/all");
            if (resp.ok) {
                const data = await resp.json();
                setProducts(data);
            }
        }
        getProducts();
    }, []);

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

    function renderButton(product) {
        const index = cart.findIndex(p => p.id === product.id);

        if (index === -1) {
            return (
                <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 bg-green-500 hover:bg-black text-white py-3 rounded-b-lg text-sm font-medium transition-all duration-300"
                >
                    Add to Cart
                </button>
            );
        }

        return (
            <div className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 bg-gray-500 text-white py-3 rounded-b-lg text-sm font-medium transition-all duration-300 flex justify-center items-center">
                <Counter id={product.id} quantity={cart[index].quantity} />
            </div>
        );
    }

    return (
        <div className="mb-20 pt-[26px] px-[41px]">
            <h2 className="text-[64px] font-bold mb-10">Sale</h2>
            <div className="grid grid-cols-4 gap-12 justify-center">
                {products.slice(0, 4).map(product => (
                    <div className="group flex flex-col items-center border border-[#E5E5E5] 
                        rounded-3xl p-6 bg-white shadow-sm w-[350px]">
                        <div className="relative w-full h-[350px] overflow-hidden rounded-2xl">
                            <img
                                src={`http://localhost:3333${product.image}`}
                                alt="product image"
                                className="w-full h-full object-cover"
                            />
                            {renderButton(product)}
                        </div>
                        <Link
                            key={product.id}
                            to={`/products/${product.id}`}
                        >
                            <p className="text-[20px] w-full text-left">{product.title}</p>
                            <div className="flex items-center gap-3 w-full">
                                <span className="text-lg font-bold">
                                    ${product.price}
                                </span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    );
}
