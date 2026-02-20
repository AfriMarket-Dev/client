import { useState, useCallback } from "react";
import {
  Plus,
  Trash2,
  CheckCircle,
  Link as LinkIcon,
  Search,
} from "lucide-react";
import { AdminPageHeader, AdminTable, AdminCard } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Assignment {
  id: string;
  supplier: string;
  supplierEmail: string;
  service: string;
  assignedDate: string;
  status: "active" | "inactive";
  assignments: number;
}

export default function AdminAssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const assignments: Assignment[] = [
    {
      id: "1",
      supplier: "TechHub Limited",
      supplierEmail: "contact@techhub.com",
      service: "Express Delivery",
      assignedDate: "2024-01-20",
      status: "active",
      assignments: 3,
    },
    {
      id: "2",
      supplier: "Global Exports Ltd",
      supplierEmail: "info@globalexports.com",
      service: "Payment Processing",
      assignedDate: "2024-01-18",
      status: "active",
      assignments: 5,
    },
    {
      id: "3",
      supplier: "African Traders Co",
      supplierEmail: "support@africantrade.com",
      service: "Warranty Support",
      assignedDate: "2024-01-15",
      status: "active",
      assignments: 2,
    },
  ];

  const suppliers = [
    { id: "1", name: "TechHub Limited" },
    { id: "2", name: "Global Exports Ltd" },
    { id: "3", name: "African Traders Co" },
  ];

  const services = [
    { id: "1", name: "Express Delivery" },
    { id: "2", name: "Payment Processing" },
    { id: "3", name: "Warranty Support" },
    { id: "4", name: "Premium Packaging" },
  ];

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.supplier.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAssignService = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    setSelectedSupplier("");
    setSelectedServices([]);
  }, []);

  const toggleService = useCallback((serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId],
    );
  }, []);

  const handleOpenModal = useCallback(() => setShowModal(true), []);
  const handleCloseModal = useCallback(() => setShowModal(false), []);

  return (
    <div className="space-y-6 pb-12">
      <AdminPageHeader
        title="Assignments"
        subtitle="Provision services and products to entities"
        actions={
          <Button
            onClick={handleOpenModal}
            className="rounded-sm h-11 px-6 font-heading font-bold uppercase text-sm tracking-wider shadow-lg shadow-primary/20"
          >
            <Plus size={18} className="mr-2" />
            New Link
          </Button>
        }
      />

      {/* Search */}
      <AdminCard noPadding>
        <div className="p-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-3 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="SEARCH ASSIGNMENTS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary uppercase text-sm tracking-wider placeholder:text-muted-foreground/60 h-11 bg-background"
            />
          </div>
        </div>
      </AdminCard>

      {/* Assignments Table */}
      <AdminTable
        headers={[
          "Supplier Entity",
          "Service Link",
          "Status",
          "Assigned",
          "Load",
          "Actions",
        ]}
      >
        {filteredAssignments.map((assignment) => (
          <tr key={assignment.id} className="hover:bg-muted/50 transition-colors">
            <td className="px-4 py-4">
              <div>
                <p className="font-heading font-bold text-sm text-foreground uppercase tracking-tight">
                  {assignment.supplier}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5 font-mono font-bold uppercase tracking-tighter">
                  {assignment.supplierEmail}
                </p>
              </div>
            </td>
            <td className="px-4 py-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 rounded-sm border border-blue-100">
                  <LinkIcon size={12} className="text-blue-600" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground">
                  {assignment.service}
                </span>
              </div>
            </td>
            <td className="px-4 py-4">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-100 font-heading font-bold uppercase text-[9px] tracking-widest px-2 py-0.5"
              >
                <CheckCircle size={10} className="mr-1" />
                Active
              </Badge>
            </td>
            <td className="px-4 py-4 text-[10px] text-muted-foreground font-mono font-bold uppercase tracking-tighter">
              {assignment.assignedDate}
            </td>
            <td className="px-4 py-4">
              <span className="inline-flex items-center justify-center px-2 py-0.5 bg-muted border border-border text-foreground rounded-sm text-[10px] font-black uppercase tracking-widest">
                {assignment.assignments} links
              </span>
            </td>
            <td className="px-4 py-4">
              <div className="flex items-center justify-center gap-2">
                <button className="p-2 h-9 w-9 hover:bg-muted rounded-sm transition-colors text-muted-foreground border border-transparent hover:border-border flex items-center justify-center">
                  <LinkIcon size={14} />
                </button>
                <button className="p-2 h-9 w-9 hover:bg-red-50 rounded-sm transition-colors text-red-600 border border-transparent hover:border-red-200 flex items-center justify-center">
                  <Trash2 size={14} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>

      {/* Assignment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <AdminCard noPadding className="max-w-md w-full shadow-2xl">
            <div className="p-6 border-b-2 border-border bg-muted/30">
              <h2 className="text-lg font-heading font-bold uppercase tracking-widest text-foreground leading-none">
                Link Services
              </h2>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-2">
                Map platform features to entities
              </p>
            </div>
            
            <form onSubmit={handleAssignService} className="p-6 space-y-6">
              {/* Supplier Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block ml-1">
                  Select Target Entity
                </label>
                <select
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 font-heading font-bold uppercase text-xs tracking-widest bg-background"
                  required
                >
                  <option value="">CHOOSE PROVIDER...</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Services Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block ml-1">
                  Available Service Streams
                </label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto border border-border rounded-sm p-3 bg-muted/10 font-mono">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className="flex items-center gap-3 p-2 hover:bg-background rounded-sm cursor-pointer group transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service.id)}
                        onChange={() => toggleService(service.id)}
                        className="w-4 h-4 text-primary border border-border rounded-sm focus:ring-primary bg-background"
                      />
                      <span className="text-[10px] font-black uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
                        {service.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                  className="flex-1 rounded-sm border border-border h-12 font-heading font-bold uppercase text-xs tracking-wider"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 rounded-sm h-12 font-heading font-bold uppercase text-xs tracking-wider shadow-lg shadow-primary/20"
                  disabled={!selectedSupplier || selectedServices.length === 0}
                >
                  Confirm Links
                </Button>
              </div>
            </form>
          </AdminCard>
        </div>
      )}
    </div>
  );
}
