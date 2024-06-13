import classNames from "classnames";

type Props = {
  disabled?: boolean;
  title: string;
  className?: string | undefined;
  onClick: React.MouseEventHandler;
};
const Button = ({ className, disabled = false, title, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        className,
        "p-3 rounded-md font-semibold ",
        disabled
          ? " bg-gray-600 text-gray-400"
          : " bg-gradient-to-r from-pink to-orange text-grey-200"
      )}
      disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
