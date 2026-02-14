import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import type { PageHeaderProps } from "@/components/ui/PageHeader";

export const AdminPageHeader: React.FC<PageHeaderProps> = (props) => {
  return <PageHeader {...props} dark showPattern />;
};
