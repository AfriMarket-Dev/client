import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { CreateListingInput } from "@/app/api/listings";
import type { ListingCategory } from "@/app/api/listing-categories";

interface ListingFormProps {
  categories: ListingCategory[];
  companyId: string;
  defaultValues?: Partial<CreateListingInput>;
  onSubmit: (values: CreateListingInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ListingForm({
  categories,
  companyId,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
}: ListingFormProps) {
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [description, setDescription] = useState(defaultValues?.description ?? "");
  const [type, setType] = useState<"PRODUCT" | "SERVICE">(
    (defaultValues?.type as "PRODUCT" | "SERVICE") ?? "PRODUCT"
  );
  const [priceType, setPriceType] = useState<"FIXED" | "NEGOTIABLE" | "STARTS_AT">(
    (defaultValues?.priceType as "FIXED" | "NEGOTIABLE" | "STARTS_AT") ?? "FIXED"
  );
  const [price, setPrice] = useState(String(defaultValues?.price ?? ""));
  const [stock, setStock] = useState(String(defaultValues?.stock ?? ""));
  const [unit, setUnit] = useState(defaultValues?.unit ?? "");
  const [categoryId, setCategoryId] = useState(defaultValues?.categoryId ?? "");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!categoryId) {
      setError("Category is required");
      return;
    }
    onSubmit({
      name: name.trim(),
      description: description.trim() || undefined,
      type,
      priceType,
      price: price ? Number(price) : undefined,
      stock: stock ? Number(stock) : undefined,
      unit: unit.trim() || undefined,
      categoryId,
      companyId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <p className="text-sm text-destructive font-medium">{error}</p>
      )}

      <div>
        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground mb-2">
          Name *
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-11"
          placeholder="e.g. Portland Cement 50kg"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground mb-2">
          Description
        </label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-24"
          placeholder="Describe the product or service"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Type *
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "PRODUCT" | "SERVICE")}
            className="w-full h-11 px-3 rounded-sm border border-border bg-background text-foreground"
          >
            <option value="PRODUCT">Product</option>
            <option value="SERVICE">Service</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Price type
          </label>
          <select
            value={priceType}
            onChange={(e) => setPriceType(e.target.value as "FIXED" | "NEGOTIABLE" | "STARTS_AT")}
            className="w-full h-11 px-3 rounded-sm border border-border bg-background text-foreground"
          >
            <option value="FIXED">Fixed</option>
            <option value="NEGOTIABLE">Negotiable</option>
            <option value="STARTS_AT">Starts at</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground mb-2">
          Category *
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full h-11 px-3 rounded-sm border border-border bg-background text-foreground"
          required
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Price (default variant)
          </label>
          <Input
            type="number"
            step="0.01"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="h-11"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Stock
          </label>
          <Input
            type="number"
            min={0}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="h-11"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Unit
          </label>
          <Input
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="h-11"
            placeholder="e.g. bag, piece"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Listing"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
