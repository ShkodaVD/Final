import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../stores";
import Counter from "../components/Counter";


export default function Categori_1() {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [pricefrom, setPricefrom] = useState("");
    const [priceto, setPriceto] = useState("");
    const [discont, setDiscont] = useState(false);
    const [sortBy, setSortBy] = useState("default");
    const [cart, setCart] = useContext(CartContext);

    useEffect(() => {
        async function getCategory() {
            const response = await fetch(`http://localhost:3333/categories/${id}`);
            if (response.ok) {
                const data = await response.json();
                setCategory(data);
            }
        }
        getCategory();
    }, [id]);

    if (!category) return <p className="p-10 text-xl text-gray-500">Loading...</p>;

    // создаем массив по фильтру
    let filtered = category.data.filter(product => {
        const price = parseFloat(product.price) || 0;
        // диапазон цен
        const min = parseFloat(pricefrom) || 0;
        const max = parseFloat(priceto) || Infinity;

        if (price < min || price > max) return false;
        // скидка
        if (discont && !product.discount) return false;

        return true;
    });
    // филтр массива по возрастанию
    if (sortBy === "priceAsc") {
        filtered = filtered.sort((a, b) => a.price - b.price);
    }
    // убыванию
    if (sortBy === "priceDesc") {
        filtered = filtered.sort((a, b) => b.price - a.price);
    }

    function addToCart(product) {
        setCart(prevCart => {
            const index = prevCart.findIndex(item => item.id === product.id);
            // нет товара
            if (index === -1) {

                return [...prevCart, { ...product, quantity: 1 }];
            } else {
                // есть товар
                return prevCart.map((item, i) =>
                    i === index ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
        });
    }


    function renderButton(product) {
        const index = cart.findIndex(p => p.id === product.id);
        // если нет
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
        // если есть    
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
                    {/* до */}
                    <input
                        type="number"
                        placeholder="to"
                        value={priceto}
                        onChange={(e) => setPriceto(e.target.value)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                </div>
                <div className="flex items-center gap-6">
                    {/* скидка */}
                    <label className="flex items-center space-x-2">
                        <span>Discounted items</span>
                        <input
                            type="checkbox"
                            checked={discont}
                            onChange={(e) => setDiscont(e.target.checked)}
                            className="w-4 h-4"
                        />
                    </label>
                    {/* выбор */}
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
            <h2 className="text-3xl font-bold mb-4">
                {/* загол и кол-во товаров */}
                {category.category.title} ({filtered.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.map(product => (
                    <div className="group block border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative mb-3">
                            <img
                                src={`http://localhost:3333${product.image}`}
                                alt={product.title}
                                className="w-full h-48 object-cover rounded"
                            />
                            {renderButton(product)}
                        </div>
                        {/* обычная навиг */}
                        <Link key={product.id} to={`/products/${product.id}`}>
                            <h3 className="text-sm font-medium mb-2 line-clamp-2">
                                {product.title}
                            </h3>
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
