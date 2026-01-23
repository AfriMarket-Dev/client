export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "super-admin" | "admin" | "moderator";
  avatar: string;
  permissions: string[];
  createdAt: string;
  lastLogin?: string;
}

export interface PlatformService {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  assignedSuppliers?: string[];
}

export interface PlatformProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  images: string[];
  specifications: Record<string, string>;
  status: "active" | "inactive" | "pending-review";
  createdAt: string;
  updatedAt: string;
  createdBy: string; // supplier ID who created it
}

export interface SupplierAssignment {
  id: string;
  supplierId: string;
  supplierName: string;
  serviceId: string;
  serviceName: string;
  assignedAt: string;
  status: "active" | "inactive";
}

export interface DashboardStats {
  totalSuppliers: number;
  totalCategories: number;
  totalServices: number;
  totalProducts: number;
  activeSuppliers: number;
  pendingReviews: number;
  totalRevenue?: number;
}

export interface AdminFilter {
  status?: "active" | "inactive" | "pending-review";
  search?: string;
  category?: string;
  sortBy?: "name" | "date" | "status";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}
