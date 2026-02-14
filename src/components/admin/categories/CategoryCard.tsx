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
import { Badge } from "@/components/ui/Badge";
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
    <AdminCard noPadding className="hover:border-primary transition-colors flex flex-col">
      <div className="p-4 border-b-2 border-border bg-muted/10">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-sm border border-primary/20">
              <IconComponent size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-foreground uppercase tracking-widest">
                {category.name}
              </h3>
              <p className="text-[9px] text-muted-foreground mt-1 uppercase font-black tracking-tighter">
                Code: {category.id.substring(0, 8)}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className={`rounded-sm border font-heading font-bold uppercase text-[9px] tracking-widest px-2 py-0.5 ${
              category.status === "active"
                ? "bg-green-50 text-green-700 border-green-100"
                : "bg-red-50 text-red-700 border-red-100"
            }`}
          >
            {category.status}
          </Badge>
        </div>
      </div>

      <div className="p-4 flex-1">
        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-relaxed line-clamp-2">
          {category.description}
        </p>
      </div>

      <div className="px-4 py-4 bg-muted/30 grid grid-cols-2 gap-4 text-center border-y-2 border-border">
        <div>
          <p className="text-xl font-heading font-bold text-foreground">
            {category.productCount}
          </p>
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">
            Products
          </p>
        </div>
        <div>
          <p className="text-xl font-heading font-bold text-foreground">
            {category.subcategories?.length || 0}
          </p>
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">
            Sub-Cats
          </p>
        </div>
      </div>

      <div className="px-4 py-3 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onEdit(category)}
            className="p-2 h-9 w-9 hover:bg-blue-50 rounded-sm transition-all text-blue-600 border border-transparent hover:border-blue-200 flex items-center justify-center"
            title="Edit"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => onDelete(category)}
            className="p-2 h-9 w-9 hover:bg-red-50 rounded-sm transition-all text-red-600 border border-transparent hover:border-red-200 flex items-center justify-center"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
        <button
          className="h-9 px-4 hover:bg-primary/10 rounded-sm transition-all text-primary font-heading font-bold text-[10px] uppercase tracking-widest border border-transparent hover:border-primary"
        >
          <Eye size={14} className="inline mr-1.5" />
          View all
        </button>
      </div>
    </AdminCard>
  );
};
