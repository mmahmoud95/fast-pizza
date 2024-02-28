import { Link } from "react-router-dom";

const Button = ({ children, disabled, to, type, action }) => {
  const base =
    "inline-block text-sm rounded-full bg-yellow-500 font-semibold uppercase tracking-widest text-stone-800 transition-colors hover:bg-yellow-200 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:ring-offset-2 active:bg-blue-300 disabled:cursor-not-allowed ";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    round: base + " px-2 py-1 md:px-3 md:py-2 text-sm",
    secondary:
      "inline-block text-sm rounded-full font-semibold uppercase tracking-widest text-stone-800 transition-colors hover:bg-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-400 disabled:cursor-not-allowed px-3 py-2.4 md:px-4 md:py-3 border border-stone-400 text-stone-400",
  };
  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }
  return (
    <button
      className={styles[type]}
      disabled={disabled}
      type="submit"
      onClick={action}
    >
      {children}
    </button>
  );
};
export default Button;
