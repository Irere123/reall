import React from "react";
import { motion } from "framer-motion";
import { Spinner } from "./Spinner";
import { HeaderController } from "../modules/display/HeaderController";

const LoadingScreen = () => {
  return (
    <>
      <HeaderController />
      <motion.div className={`flex w-full h-full items-center justify-center`}>
        <Spinner />
      </motion.div>
    </>
  );
};

export default LoadingScreen;
