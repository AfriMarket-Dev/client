import React from "react";
import { Flag, AlertTriangle, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminCard } from "@/components/admin";

interface Report {
  id: string;
  target: string;
  type: string;
  reason: string;
  evidence: string;
  status: string;
  count: number;
  time: string;
}

interface ModerationQueueProps {
  reports: Report[];
}

export const ModerationQueue: React.FC<ModerationQueueProps> = ({ reports }) => (
  <div className="lg:col-span-2 space-y-6">
    <div className="flex items-center justify-between border-b-2 border-border pb-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-heading font-bold text-foreground uppercase tracking-wide">
          Moderation Queue
        </h2>
        <Badge className="rounded-sm bg-red-100 text-red-600 border border-red-200 font-heading font-bold uppercase text-[10px] tracking-wider">
          Priority
        </Badge>
      </div>
      <Button
        variant="ghost"
      >
        View All Reports
      </Button>
    </div>

    <div className="space-y-4">
      {reports.map((report) => (
        <AdminCard key={report.id} noPadding className="hover:border-red-200 transition-colors">
          <div className="flex flex-col md:flex-row">
            <div className="p-6 flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-sm bg-red-50 flex items-center justify-center border border-red-100">
                  <Flag className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-[10px] font-heading font-bold text-muted-foreground tracking-widest uppercase">
                  {report.id}
                </span>
                <Badge
                  variant="secondary"
                  className="rounded-sm bg-muted text-muted-foreground border border-border uppercase text-[10px] font-heading font-bold tracking-wider"
                >
                  Target: {report.type}
                </Badge>
              </div>

              <h3 className="text-lg font-heading font-bold text-foreground mb-1">
                {report.target}
              </h3>
              <p className="text-sm font-bold text-red-600 mb-4 font-body uppercase tracking-wide">
                {report.reason}
              </p>

              <div className="flex items-center gap-6 text-[10px] font-heading font-bold text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{report.count} Unique Reports</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Reported {report.time}</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-6 border-t md:border-t-0 md:border-l-2 border-border flex flex-col justify-center gap-3 w-full md:w-64 text-center">
              <Button className="w-full rounded-sm font-heading font-bold uppercase tracking-wider bg-foreground hover:bg-foreground/90 text-background h-10 text-xs shadow-none">
                Investigate Case
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 rounded-sm border border-border text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 h-10 shadow-none"
                >
                  <CheckCircle2 className="w-4 h-4 mx-auto" />
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded-sm border border-border text-red-600 hover:bg-red-50 hover:border-red-200 h-10 shadow-none"
                >
                  <XCircle className="w-4 h-4 mx-auto" />
                </Button>
              </div>
            </div>
          </div>
        </AdminCard>
      ))}
    </div>
  </div>
);
