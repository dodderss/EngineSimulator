import React from "react";
import "./statisticItem.tsx.css";

interface StatisticItemProps {
  image: string;
  text: string;
}

const StatisticItem: React.FC<StatisticItemProps> = ({ image, text }) => {
  return (
    <div className="statItem flex items-center gap-4">
      <img src={image} alt="icon" width="56" height="56" className="pl-4" />
      <p className="text-2xl font-bold">{text}</p>
    </div>
  );
};

export default StatisticItem;
