import React from "react";
import {
  Edit,
  Trash2,
  Eye,
  Smartphone,
  Shirt,
  Home,
  Heart,
  Car,
  Settings,
  FolderOpen,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AdminCard } from "@/components/admin";

interface Category {
  id: string;
  name: string;
  description?: string;
  icon: string;
  productCount: number;
  subcategories?: any[];
  status: string;
}

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

const iconMap: { [key: string]: LucideIcon } = {
  Smartphone,
  Shirt,
  Home,
  Heart,
  Car,
  Settings,
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onEdit,
  onDelete,
}) => {
  const IconComponent = iconMap[category.icon] || FolderOpen;

  return (
    <AdminCard noPadding className="hover:border-primary/30 transition-all duration-300 flex flex-col group/card shadow-sm hover:shadow-xl rounded-xl overflow-hidden">
      <div className="p-5 border-b border-border/40 bg-muted/5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 group-hover/card:bg-primary group-hover/card:text-white transition-all duration-300">
              <IconComponent size={22} className="text-primary group-hover/card:text-white transition-colors" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-foreground tracking-tight">
                {category.name}
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1 font-medium font-sans">
                Code: {category.id.substring(0, 8)}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className={`rounded-full border font-semibold text-[10px] tracking-wide px-2.5 py-0.5 ${
              category.status === "active"
                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                : "bg-red-50 text-red-700 border-red-100"
            }`}
          >
            {category.status}
          </Badge>
        </div>
      </div>

      <div className="p-5 flex-1">
        <p className="text-sm text-muted-foreground/80 font-normal leading-relaxed line-clamp-2">
          {category.description || "No description provided for this category."}
        </p>
      </div>

      <div className="px-5 py-5 bg-muted/10 grid grid-cols-2 gap-6 text-center border-y border-border/40">
        <div className="space-y-1">
          <p className="text-2xl font-heading font-bold text-foreground font-sans">
            {category.productCount}
          </p>
          <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
            Products
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-heading font-bold text-foreground font-sans">
            {category.subcategories?.length || 0}
          </p>
          <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
            Sub-Cats
          </p>
        </div>
      </div>

      <div className="px-5 py-4 flex items-center justify-between mt-auto bg-white/50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(category)}
            className="p-2 h-10 w-10 hover:bg-blue-50 rounded-lg transition-all text-blue-600 border border-transparent hover:border-blue-100 flex items-center justify-center"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(category)}
            className="p-2 h-10 w-10 hover:bg-red-50 rounded-lg transition-all text-red-600 border border-transparent hover:border-red-100 flex items-center justify-center"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
        <button
          className="h-10 px-5 hover:bg-primary hover:text-white rounded-lg transition-all text-primary font-semibold text-xs border border-primary/20 hover:border-primary flex items-center gap-2"
        >
          <Eye size={16} />
          View All
        </button>
      </div>
    </AdminCard>
  );
};
