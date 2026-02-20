import React from "react";
import { PageHeader } from "@/components/ui/page-header";
import type { PageHeaderProps } from "@/components/ui/page-header";

export const AdminPageHeader: React.FC<PageHeaderProps> = (props) => {
  return <PageHeader {...props} dark showPattern />;
};
