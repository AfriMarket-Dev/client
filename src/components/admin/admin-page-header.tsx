import type React from "react";
import type { PageHeaderProps } from "@/components/ui/page-header";
import { PageHeader } from "@/components/ui/page-header";

export const AdminPageHeader: React.FC<PageHeaderProps> = (props) => {
	return <PageHeader {...props} dark showPattern />;
};
