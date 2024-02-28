import { useSelector } from "react-redux";
import { CreateUser } from "../features";
import Button from "./Button";

function Home() {
  const { userName } = useSelector((state) => state.user);
  return (
    <div className="mt-8 px-4 text-center">
      <h1 className="my-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {userName ? (
        <Button type="primary" to="/menu">
          Continue Ordering, {userName}
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
