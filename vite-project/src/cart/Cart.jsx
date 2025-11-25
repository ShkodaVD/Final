import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { CartContext } from "../stores";
import Counter from "../components/Counter";
import SuccessAlert from "../components/ui/SuccessAlert";

export default function CartPage() {
  const [cart, setCart] = useContext(CartContext);
  const navigate = useNavigate();
  // окно
  const [showSuccess, setShowSuccess] = useState(false);

  // сумма товаров
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  // сумма цены
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const continueShopping = () => {
    navigate("/");
  };


  const handleOrder = () => {

    setShowSuccess(true);


  };

  const onCloseSuccess = () => {
    setShowSuccess(false);

  };


  if (cart.length === 0) {
    return (
      <div className="p-4 text-start">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <div className="bg-white p-12 rounded-lg">
          <p className="text-xl mb-6">Looks like you have no items in your basket currently.</p>
          <button
            onClick={continueShopping}
            className="bg-green-700 text-white py-3 px-8 rounded font-semibold text-lg transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.map((product) => (
            <div key={product.id} className="border-b border-gray-300 py-6">
              <div className="flex items-start gap-6">
                <img
                  className="w-24 h-24 object-cover rounded"
                  src={`http://localhost:3333${product.image}`}
                  alt={product.title}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {product.title}
                    </h3>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-gray-500 text-xl font-light transition-colors"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <Counter quantity={product.quantity} id={product.id} />
                    <span className="text-gray-600"> ${product.price}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price * product.quantity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 p-6 rounded-lg h-fit">
          <h3 className="text-xl font-bold mb-4">Order details</h3>
          <div className="mb-6">
            <p className="text-lg mb-2">{totalItems} items</p>
            <p className="text-2xl font-bold">Total ${totalPrice}</p>
          </div>

          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border border-gray-300"
            />
            <input
              type="tel"
              placeholder="Phone number"
              className="w-full p-3 border border-gray-300"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300"
            />
          </div>


          <button
            onClick={handleOrder}
            className="w-full bg-green-600 text-white py-3 rounded font-semibold text-lg transition-colors hover:bg-green-700"
          >
            Order
          </button>
        </div>
      </div>


      <SuccessAlert
        isOpen={showSuccess}
        onClose={onCloseSuccess}
      />
    </div>
  );
}