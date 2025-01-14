import { Oval } from "react-loader-spinner";

interface LoaderProps {
  height?: number;
  width?: number;
  color?: string;
  secondaryColor?: string;
}

const Loader: React.FC<LoaderProps> = ({
  height = 60,
  width = 60,
  color = "#3ddeed",
  secondaryColor = "#fff",
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Oval
        height={height}
        width={width}
        color={color}
        visible={true}
        secondaryColor={secondaryColor}
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loader;
