import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  useGetListingByIdQuery,
  useUpdateListingMutation,
  useAddVariantMutation,
  useRemoveVariantMutation,
} from "@/app/api/listings";
import { useGetListingCategoriesQuery } from "@/app/api/listing-categories";
import { ListingForm } from "@/components/forms/ListingForm";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { CreateListingInput, CreateVariantInput, ListingVariantRef } from "@/app/api/listings";
import { Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

export default function ProviderListingEditPage() {
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  const [addVariantOpen, setAddVariantOpen] = useState(false);

  const { data: listing, isLoading: listingLoading } = useGetListingByIdQuery(
    listingId ?? "",
    { skip: !listingId }
  );
  const { data: catData } = useGetListingCategoriesQuery({ limit: 100 });
  const [updateListing, { isLoading: updateLoading }] = useUpdateListingMutation();
  const [addVariant, { isLoading: addVarLoading }] = useAddVariantMutation();
  const [removeVariant] = useRemoveVariantMutation();

  const categories = catData?.data ?? [];
  const companyId = listing?.company ? (listing.company as { id: string }).id : "";

  if (!listingId || (listing === null && !listingLoading)) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Listing not found.</p>
        <Button variant="outline" onClick={() => navigate("/dashboard")} className="mt-4">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  if (listingLoading || !listing) {
    return (
      <div className="p-8">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const handleUpdate = async (values: Partial<CreateListingInput>) => {
    try {
      await updateListing({ id: listingId, data: values }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-xl font-heading font-bold uppercase text-foreground mb-6">
        Edit Listing
      </h1>

      <ListingForm
        categories={categories}
        companyId={companyId}
        defaultValues={{
          name: listing.name,
          description: listing.description ?? "",
          type: listing.type as "PRODUCT" | "SERVICE",
          priceType: (listing.priceType as "FIXED" | "NEGOTIABLE" | "STARTS_AT") ?? "FIXED",
          categoryId: listing.category?.id ?? "",
          companyId,
        }}
        onSubmit={handleUpdate}
        onCancel={() => navigate("/dashboard")}
        isLoading={updateLoading}
      />

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-lg font-heading font-bold uppercase text-foreground mb-4">
          Variants
        </h2>
        <ul className="space-y-3 mb-4">
          {(listing.variants ?? []).map((v: ListingVariantRef) => (
            <li
              key={v.id}
              className="flex items-center justify-between p-3 rounded-sm border border-border bg-card"
            >
              <div>
                <p className="font-medium">{v.name}</p>
                <p className="text-sm text-muted-foreground">
                  RWF {Number(v.price).toLocaleString()} · Stock: {v.stock} {v.unit ?? ""}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive"
                onClick={async () => {
                  if (confirm("Remove this variant?")) {
                    try {
                      await removeVariant(v.id).unwrap();
                    } catch (e) {
                      console.error(e);
                    }
                  }
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>
        <Button
          type="button"
          variant="outline"
          onClick={() => setAddVariantOpen(true)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Variant
        </Button>
      </div>

      <AddVariantDialog
        open={addVariantOpen}
        onClose={() => setAddVariantOpen(false)}
        onSubmit={async (data) => {
          try {
            await addVariant({ listingId, data }).unwrap();
            setAddVariantOpen(false);
          } catch (e) {
            console.error(e);
          }
        }}
        isLoading={addVarLoading}
      />
    </div>
  );
}

function AddVariantDialog({
  open,
  onClose,
  onSubmit,
  isLoading,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateVariantInput) => void;
  isLoading: boolean;
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [unit, setUnit] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = Number(price);
    const s = Number(stock);
    if (!name.trim() || isNaN(p) || p < 0 || isNaN(s) || s < 0) return;
    onSubmit({ name: name.trim(), price: p, stock: s, unit: unit.trim() || undefined });
    setName("");
    setPrice("");
    setStock("");
    setUnit("");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Variant</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Name *
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Size L, 50kg bag"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Price *
              </label>
              <Input
                type="number"
                step="0.01"
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Stock *
              </label>
              <Input
                type="number"
                min={0}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Unit
            </label>
            <Input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="e.g. piece, kg"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Variant"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
