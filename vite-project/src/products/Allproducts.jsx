import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import Counter from "../components/Counter";
import { CartContext } from "../stores";
export default function ProductsPage() {
    const [products, setProducts] = useState(null);
    const [category, setCategory] = useState("All");
    const [pricefrom, setPricefrom] = useState("");
    const [priceto, setPriceto] = useState("");
    const [discont, setDiscont] = useState(false);
    const [cart, setCart] = useContext(CartContext);
    const [sortBy, setSortBy] = useState("default");



    useEffect(() => {
        async function getProducts() {
            const resp = await fetch("http://localhost:3333/products/all");
            const data = await resp.json();
            setProducts(data);
        }
        getProducts();
    }, []);

    const filtered = products?.filter(product => {
        const price = parseFloat(product.price) || 0;
        // от
        const minPrice = parseFloat(pricefrom) || 0;
        // до
        const maxPrice = parseFloat(priceto) || Infinity;

        if (price < minPrice || price > maxPrice) return false;
        // скидка
        if (discont && !product.discount) return false;
        // если не загружен еще ниче не вывод
        if (category !== "All" && product.category !== category) return false;

        return true;
    }) || [];

    function addToCart(product) {
        setCart(prevCart => {
            const index = prevCart.findIndex(item => item.id === product.id);
            // нет в корзине
            if (index === -1) {
                return [...prevCart, { ...product, quantity: 1 }];
            } else {
                // есть
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
        <div className="p-6">

            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-white flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <label className="font-medium text-sm">Price:</label>
                    {/* цена от */}
                    <input
                        type="number"
                        placeholder="from"
                        value={pricefrom}
                        onChange={(e) => setPricefrom(e.target.value)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    {/* цена до */}
                    <input
                        type="number"
                        placeholder="to"
                        value={priceto}
                        onChange={(e) => setPriceto(e.target.value)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                </div>
                <div className="flex items-center gap-6">
                    {/* типа скидки */}
                    <label className="flex items-center space-x-2">
                        <span>Discounted items</span>
                        <input
                            type="checkbox"
                            checked={discont}
                            onChange={(e) => setDiscont(e.target.checked)}
                            className="w-4 h-4"
                        />
                    </label>
                    {/* типа выбор */}
                    <div className="flex items-center gap-2">
                        <label className="text-sm">Sorted:</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                            <option value="default">by default</option>
                            <option value="priceAsc">Price: Low to High</option>
                            <option value="priceDesc">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* товар загрузился */}
            {products ? (
                <div>
                    <h2 className="text-xl font-bold mb-4">
                        ALL PRODUCTS ({filtered.length})
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {
                            filtered.map(product => (
                                <div className="group block border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">

                                    <div className="relative mb-3">
                                        <img
                                            src={`http://localhost:3333${product.image}`}
                                            alt={product.title || product.name}
                                            className="w-full h-48 object-cover rounded"

                                        />
                                        {/* кнопка */}
                                        {renderButton(product)}
                                    </div>
                                    <Link key={product.id} to={`/products/${product.id}`}>
                                        <h3 className="text-sm font-medium mb-2 line-clamp-2">
                                            {product.title || product.name}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold">
                                                ${product.price}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ) : (
                // товар не загрузился
                <p className="text-gray-500">Загрузка...</p>
            )}
        </div>
    );
}
