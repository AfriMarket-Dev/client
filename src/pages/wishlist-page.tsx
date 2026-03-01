import { useNavigate } from "@tanstack/react-router";

export default function WishlistPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-black uppercase tracking-tight mb-4">
        Your Wishlist
      </h1>
      <p className="text-slate-500 mb-8 uppercase text-[11px] font-bold tracking-[0.2em]">
        Saved items across the construction marketplace
      </p>
      <button
        onClick={() => navigate({ to: "/marketplace" as any })}
        className="px-10 h-14 bg-slate-950 text-white font-black uppercase tracking-widest text-[11px] hover:bg-slate-900 transition-all"
      >
        Start Exploring
      </button>
    </div>
  );
}
