import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getTotalPrice } from "../../store/slices/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store/store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../../store/slices/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const {
    userName,
    address,
    status: addressStatus,
    position,
    error,
  } = useSelector((state) => state.user);
  console.log(position);
  const isLoading = addressStatus === "loading";
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formError = useActionData();
  const [withPriority, setWithPriority] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const totalCartPrice = useSelector(getTotalPrice);
  const priotoryPrice = withPriority ? 0.2 * totalCartPrice : 0;
  const totalPrice = totalCartPrice + priotoryPrice;
  const dispatch = useDispatch();
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={userName}
            required
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              type="tel"
              name="phone"
              required
              className="input w-full"
              pattern={isValidPhone.toString()}
            />
            {formError?.phone && (
              <p className="mt-3 rounded-md bg-red-100 p-2 text-sm text-red-700">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              disabled={isLoading}
              type="text"
              name="address"
              required
              defaultValue={address}
              className="input w-full"
            />{" "}
            {addressStatus === "error" && (
              <p className="mt-3 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {error}
              </p>
            )}
          </div>{" "}
          {!position.longitude && !position.latitude && (
            <span className="absolute right-[6px] top-[35px] z-20 sm:top-[3px]  md:top-[5px]">
              <Button
                disabled={isLoading}
                type="small"
                action={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get location
              </Button>
            </span>
          )}{" "}
        </div>

        <div className="mb-12 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            id="priority"
            className="h-4 w-4 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />

          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input value={JSON.stringify(cart)} name="cart" type="hidden" />{" "}
          <input
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
            name="position"
            type="hidden"
          />
          <Button disabled={isSubmitting || isLoading} type="primary">
            {isSubmitting
              ? "Place Order........"
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "please provide a valid number we might need to contact you";
  if (Object.keys(errors).length) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;
