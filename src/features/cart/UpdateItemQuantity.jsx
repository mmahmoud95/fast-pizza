import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import {
  decreaseQuantity,
  increaseQuantity,
} from "../../store/slices/cartSlice";

const UpdateItemQuantity = ({ pizzaId, currentQuantity }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        type="round"
        action={() => {
          dispatch(decreaseQuantity(pizzaId));
        }}
      >
        -
      </Button>
      <span className="text-sm font-semibold">{currentQuantity}</span>

      <Button
        type="round"
        action={() => {
          dispatch(increaseQuantity(pizzaId));
        }}
      >
        +
      </Button>
    </div>
  );
};
export default UpdateItemQuantity;
