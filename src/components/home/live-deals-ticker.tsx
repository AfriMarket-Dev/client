import React, { useState, useEffect } from "react";
import { ShoppingCart, Activity } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const MOCK_LIVE_ACTIVITIES = [
  {
    id: 1,
    user: "Contractor_KGL",
    action: "purchased",
    item: "Caterpillar 320 GC Excavator",
    time: "2m ago",
  },
  {
    id: 2,
    user: "BuildRwanda Ltd",
    action: "bid on",
    item: "500 Bags of Cement",
    time: "5m ago",
  },
  {
    id: 3,
    user: "Eng_Mutesa",
    action: "viewing",
    item: "Bosch Professional Drill Set",
    time: "Just now",
  },
  {
    id: 4,
    user: "Kigali_Infra",
    action: "ordered",
    item: "Komatsu D65 Dozer",
    time: "12m ago",
  },
];

export const LiveDealsTicker: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_LIVE_ACTIVITIES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activity = MOCK_LIVE_ACTIVITIES[currentIndex];

  return (
    <div className="w-full bg-slate-900 border-b border-white/5 py-1.5 md:py-2 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-primary">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest font-heading">
              Live
            </span>
          </div>

          <div className="h-4 w-[1px] bg-white/10" />

          <div className="flex items-center gap-2 text-xs text-slate-300 font-sans">
            <span className="font-bold text-white">{activity.user}</span>
            <span className="text-slate-500">{activity.action}</span>
            <span
              className="text-primary cursor-pointer hover:underline"
              onClick={() => navigate("/products")}
            >
              <span className="truncate max-w-[120px] inline-block align-bottom">
                {activity.item}
              </span>
            </span>
            <span className="hidden sm:inline text-[10px] text-slate-600 ml-2 font-mono">
              [{activity.time}]
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3" />
            <span>High Demand</span>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-3 h-3" />
            <span>124 Orders Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};
