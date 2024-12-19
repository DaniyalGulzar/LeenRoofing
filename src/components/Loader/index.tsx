import React from "react";
import Button from "../Button";
import { CirclesWithBar } from "react-loader-spinner";

interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  return (
    <CirclesWithBar
      height="100"
      width="100"
      color="#4A8C67"
      outerCircleColor="#4A8C67"
      innerCircleColor="#4A8C67"
      barColor="#4A8C67"
      ariaLabel="circles-with-bar-loading"
      wrapperStyle={{}}
      wrapperClass="loading-spinner-overlay"
      visible={loading}
    />
  );
};

export default Loader;
