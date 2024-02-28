import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

const UpdateOder = ({ order }) => {
  const frtcher = useFetcher();
  return (
    <frtcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
    </frtcher.Form>
  );
};
export default UpdateOder;

export const action = async ({ params }) => {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;  
};
