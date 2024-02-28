import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "../../store/slices/cartSlice";

const DeleteItem = ({ pizzaId }) => {
  const dispatch = useDispatch();
  const deleteItemHandler = () => {
    dispatch(deleteItem(pizzaId));
  };
  return (
    <Button type="small" action={deleteItemHandler}>
      Delete
    </Button>
  );
};
export default DeleteItem;
