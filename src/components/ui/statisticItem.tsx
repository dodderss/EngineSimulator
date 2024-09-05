import React, { useEffect } from "react";
import "./statisticItem.tsx.css";

interface StatisticItemProps {
  image: string;
  text: string;
}

const StatisticItem: React.FC<StatisticItemProps> = ({ image, text }) => {
  return (
    <div className="statItem flex items-center gap-4">
      <img src={image} alt="icon" width="56" height="56" className="pl-4" />
      <h2>{text}</h2>
    </div>
  );
};

export default StatisticItem;
