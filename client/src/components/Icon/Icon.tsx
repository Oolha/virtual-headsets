import Icons from "../../../public/svg/sprite.svg";

type IconProps = {
  id: string;
  className?: string;
  size?: number | string;
};

export const Icon: React.FC<IconProps> = ({ id, className, size }) => {
  return (
    <svg className={className} height={size} width={size}>
      <use href={Icons + "#" + id}></use>
    </svg>
  );
};
