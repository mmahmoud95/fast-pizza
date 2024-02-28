import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPrice, getTotalQuantity } from "../../store/slices/cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartPrice = useSelector(getTotalPrice);
  const totalCartQuantity = useSelector(getTotalQuantity);
  if (!totalCartQuantity) return null;
  return (
    <div className=" flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p
        className="space-x-3 text-stone-300 sm:space-x-5"
        onClick={(e) => changeColor(e)}
      >
        <span className="">{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart" className="font-semibold">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
