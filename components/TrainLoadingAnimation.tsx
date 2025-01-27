import type React from "react";
import Lottie from "react-lottie-player";
import trainAnimationData from "@/public/train-animation.json";

const TrainLoadingAnimation: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <Lottie
        loop
        animationData={trainAnimationData}
        play
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
};

export default TrainLoadingAnimation;
