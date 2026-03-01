import React from "react";
import { RiPulseLine } from "@remixicon/react";
import { AdminCard, AdminTable } from "@/components/admin";
import { Badge } from "@/components/ui/badge";

export const SignalLogsCard: React.FC = () => {
  const activities = [
    {
      action: "AUTH_ESTABLISHED",
      device: "CHROME_WIN_NT_10.0",
      time: "2.0 HOURS_AGO",
    },
    {
      action: "KEY_ROTATION",
      device: "IOS_MOBILE_SAFARI",
      time: "1.0 DAYS_AGO",
    },
    {
      action: "AUTH_ESTABLISHED",
      device: "MACOS_FIREFOX_ENT",
      time: "3.0 DAYS_AGO",
    },
    {
      action: "PARAMETER_SYNC",
      device: "CHROME_WIN_NT_10.0",
      time: "5.0 DAYS_AGO",
    },
  ];

  return (
    <AdminCard
      title="Signal Logs"
      subtitle="Verified access audit stream"
      headerActions={<RiPulseLine size={16} className="text-primary" />}
    >
      <AdminTable headers={["Signal Type", "Terminal ID", "Temporal Marker"]}>
        {activities.map((activity) => (
          <tr key={`${activity.action}-${activity.time}`} className="hover:bg-muted/50 transition-colors">
            <td className="px-4 py-4">
              <Badge
                variant="outline"
                className="bg-primary/5 text-primary border-primary/20 font-mono text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-sm"
              >
                {activity.action}
              </Badge>
            </td>
            <td className="px-4 py-4 text-[10px] text-muted-foreground font-mono font-bold uppercase tracking-widest">
              {activity.device}
            </td>
            <td className="px-4 py-4 text-[10px] text-foreground font-mono font-black text-right uppercase tracking-tighter">
              {activity.time}
            </td>
          </tr>
        ))}
      </AdminTable>
    </AdminCard>
  );
};
