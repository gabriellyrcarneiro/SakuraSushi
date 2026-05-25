import {
  BadgePercent,
  ChevronRight,
  Clock3,
  Flame,
  GlassWater,
  MapPin,
  Minus,
  Plus,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  Star,
  Trash2,
  Utensils,
  Wine
} from "lucide-react";
import React from "react";
import { useEffect, useMemo, useState } from "react";

const categories = [
  "Todos",
  "Sashimi",
  "Nigiri",
  "Uramaki",
  "Hot Roll",
  "Temaki",
  "Combos",
  "Promocoes",
  "Clones",
  "Bebidas"
];

const menuItems = [
  {
    id: "sashimi-salmao",
    category: "Sashimi",
    name: "Sashimi de salmao",
    type: "fatias frescas",
    amount: "10 fatias",
    description: "Cortes altos de salmao, finalizados com flor de sal e limao siciliano.",
    price: 42.9,
    tag: "premium",
    accent: "bg-salmon"
  },
  {
    id: "sashimi-misto",
    category: "Sashimi",
    name: "Sashimi misto",
    type: "salmao, atum e peixe branco",
    amount: "15 fatias",
    description: "Selecao do chef com tres peixes, gengibre e wasabi artesanal.",
    price: 64.9,
    tag: "chef",
    accent: "bg-tuna"
  },
  {
    id: "nigiri-salmao",
    category: "Nigiri",
    name: "Nigiri salmao macaricado",
    type: "dupla",
    amount: "2 unidades",
    description: "Arroz temperado, salmao selado, tare da casa e cebolinha.",
    price: 18.9,
    tag: "selado",
    accent: "bg-salmon"
  },
  {
    id: "nigiri-atum",
    category: "Nigiri",
    name: "Nigiri de atum spicy",
    type: "dupla",
    amount: "2 unidades",
    description: "Atum fresco com toque picante, gergelim tostado e nori crocante.",
    price: 20.9,
    tag: "spicy",
    accent: "bg-tuna"
  },
  {
    id: "uramaki-phila",
    category: "Uramaki",
    name: "Uramaki Philadelphia",
    type: "roll tradicional",
    amount: "8 pecas",
    description: "Salmao, cream cheese, gergelim branco e arroz por fora.",
    price: 31.9,
    tag: "classico",
    accent: "bg-wave"
  },
  {
    id: "uramaki-tropical",
    category: "Uramaki",
    name: "Uramaki tropical",
    type: "roll especial",
    amount: "8 pecas",
    description: "Camarao, manga, pepino japones, cream cheese e geleia agridoce.",
    price: 36.9,
    tag: "leve",
    accent: "bg-yuzu"
  },
  {
    id: "hot-roll",
    category: "Hot Roll",
    name: "Hot roll crocante",
    type: "empanado",
    amount: "10 pecas",
    description: "Salmao, cream cheese, massa leve, tare e crispy de alho poro.",
    price: 34.9,
    tag: "quente",
    accent: "bg-salmon"
  },
  {
    id: "hot-roll-gold",
    category: "Hot Roll",
    name: "Hot gold especial",
    type: "empanado premium",
    amount: "16 pecas",
    description: "Porcao grande com salmao, kani, cream cheese e molho tare extra.",
    price: 52.9,
    tag: "familia",
    accent: "bg-yuzu"
  },
  {
    id: "temaki-salmao",
    category: "Temaki",
    name: "Temaki salmao completo",
    type: "cone",
    amount: "1 unidade",
    description: "Salmao em cubos, arroz, cream cheese, cebolinha e gergelim.",
    price: 32.9,
    tag: "grande",
    accent: "bg-wasabi"
  },
  {
    id: "temaki-skin",
    category: "Temaki",
    name: "Temaki skin crispy",
    type: "cone",
    amount: "1 unidade",
    description: "Skin crocante, arroz, cream cheese, tare, cebolinha e gergelim.",
    price: 27.9,
    tag: "crocante",
    accent: "bg-nori"
  },
  {
    id: "combo-zen",
    category: "Combos",
    name: "Combo Zen",
    type: "entrada para dois",
    amount: "24 pecas",
    description: "8 uramaki, 8 hossomaki, 4 nigiri e 4 sashimi.",
    price: 89.9,
    tag: "2 pessoas",
    accent: "bg-wave"
  },
  {
    id: "combo-kioto",
    category: "Combos",
    name: "Combo Kioto",
    type: "selecao completa",
    amount: "42 pecas",
    description: "Sashimis, nigiris, uramakis, hot roll e temaki mini.",
    price: 149.9,
    tag: "mais vendido",
    accent: "bg-salmon"
  },
  {
    id: "combo-festival",
    category: "Combos",
    name: "Festival Sakura",
    type: "mesa completa",
    amount: "72 pecas",
    description: "Combinado grande com frios, quentes, especiais e molhos da casa.",
    price: 229.9,
    tag: "4 pessoas",
    accent: "bg-tuna"
  },
  {
    id: "promo-casal",
    category: "Promocoes",
    name: "Promo casal neon",
    type: "combo promocional",
    amount: "36 pecas + 2 bebidas",
    description: "Mix de uramaki, hot roll, nigiri e duas bebidas lata.",
    price: 119.9,
    oldPrice: 143.7,
    tag: "economize",
    accent: "bg-yuzu"
  },
  {
    id: "promo-happy",
    category: "Promocoes",
    name: "Happy sushi",
    type: "segunda a quinta",
    amount: "20 pecas",
    description: "Hot roll, hossomaki e uramaki em porcao rapida.",
    price: 59.9,
    oldPrice: 76.9,
    tag: "promo",
    accent: "bg-tuna"
  },
  {
    id: "clone-phila",
    category: "Clones",
    name: "Clone Philadelphia",
    type: "leve 2 iguais",
    amount: "16 pecas",
    description: "Dois rolls Philadelphia identicos para dividir ou repetir sem culpa.",
    price: 54.9,
    oldPrice: 63.8,
    tag: "em dobro",
    accent: "bg-wave"
  },
  {
    id: "clone-hot",
    category: "Clones",
    name: "Clone Hot Crocante",
    type: "leve 2 iguais",
    amount: "20 pecas",
    description: "Duas porcoes de hot roll crocante com tare extra.",
    price: 61.9,
    oldPrice: 69.8,
    tag: "clone",
    accent: "bg-salmon"
  },
  {
    id: "bebida-cha",
    category: "Bebidas",
    name: "Cha verde gelado",
    type: "sem alcool",
    amount: "500 ml",
    description: "Cha verde com limao, hortela e gelo cristalino.",
    price: 12.9,
    tag: "refrescante",
    accent: "bg-wasabi"
  },
  {
    id: "bebida-soda",
    category: "Bebidas",
    name: "Soda yuzu",
    type: "artesanal",
    amount: "350 ml",
    description: "Soda citrica com yuzu, agua com gas e toque de gengibre.",
    price: 15.9,
    tag: "citrico",
    accent: "bg-yuzu"
  },
  {
    id: "bebida-sake",
    category: "Bebidas",
    name: "Sake soft",
    type: "alcoolico",
    amount: "dose 90 ml",
    description: "Sake leve servido gelado para acompanhar sashimis e nigiris.",
    price: 24.9,
    tag: "gelado",
    accent: "bg-nori"
  }
];

const highlights = [
  { icon: Clock3, label: "Entrega media", value: "35 min" },
  { icon: Star, label: "Avaliacao", value: "4,9" },
  { icon: Utensils, label: "Opcoes", value: "20+" }
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);

const heroImageUrl = `${import.meta.env.BASE_URL}assets/sushi-hero.png`;

function App() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState({});

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;
      const text = `${item.name} ${item.category} ${item.type} ${item.description}`.toLowerCase();
      return matchesCategory && (!normalizedQuery || text.includes(normalizedQuery));
    });
  }, [query, selectedCategory]);

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([id, quantity]) => {
        const item = menuItems.find((menuItem) => menuItem.id === id);
        return item ? { ...item, quantity } : null;
      })
      .filter(Boolean);
  }, [cart]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = subtotal > 0 ? 4.9 : 0;
  const total = subtotal + serviceFee;
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    document.title = totalQuantity
      ? `(${totalQuantity}) Sakura Sushi | Cardapio`
      : "Sakura Sushi | Cardapio Digital";
  }, [totalQuantity]);

  function addToCart(itemId) {
    setCart((current) => ({
      ...current,
      [itemId]: (current[itemId] || 0) + 1
    }));
  }

  function removeFromCart(itemId) {
    setCart((current) => {
      const nextQuantity = (current[itemId] || 0) - 1;
      if (nextQuantity <= 0) {
        const { [itemId]: _, ...nextCart } = current;
        return nextCart;
      }
      return { ...current, [itemId]: nextQuantity };
    });
  }

  function clearCart() {
    setCart({});
  }

  const orderText = encodeURIComponent(
    [
      "Ola, Sakura Sushi! Quero fazer este pedido:",
      ...cartItems.map((item) => `- ${item.quantity}x ${item.name} (${item.amount}) - ${formatCurrency(item.price * item.quantity)}`),
      `Taxa de embalagem: ${formatCurrency(serviceFee)}`,
      `Total: ${formatCurrency(total)}`
    ].join("\n")
  );

  const whatsappLink = `https://wa.me/?text=${orderText}`;

  return (
    <main className="min-h-screen text-ink">
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-rice/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <a className="flex items-center gap-3" href="#menu">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-ink text-rice">
              <Utensils size={22} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-lg font-black leading-tight">Sakura Sushi</span>
              <span className="text-xs font-semibold uppercase text-tuna">cardapio digital</span>
            </span>
          </a>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-2 rounded-md border border-ink/10 bg-white px-3 py-2">
              <MapPin size={15} aria-hidden="true" />
              Sao Paulo
            </span>
            <a
              className="inline-flex items-center gap-2 rounded-md bg-tuna px-4 py-2 font-bold text-white transition hover:bg-[#d94354]"
              href="#pedido"
            >
              <ShoppingBag size={16} aria-hidden="true" />
              Pedido {totalQuantity > 0 ? `(${totalQuantity})` : ""}
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div
          className="overflow-hidden rounded-lg bg-ink bg-cover bg-center text-white shadow-panel"
          style={{
            backgroundImage:
              `linear-gradient(90deg, rgba(18,24,33,0.94) 0%, rgba(18,24,33,0.78) 40%, rgba(18,24,33,0.24) 100%), url('${heroImageUrl}')`
          }}
        >
          <div className="grid min-h-[360px] content-between gap-8 p-5 sm:p-8 lg:grid-cols-[0.78fr_0.22fr] lg:p-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-md bg-white/12 px-3 py-2 text-sm font-bold text-yuzu backdrop-blur">
                <Sparkles size={16} aria-hidden="true" />
                combos promocionais hoje
              </span>
              <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">Sakura Sushi</h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/82 sm:text-lg">
                Sashimis, nigiris, uramakis, hot rolls, temakis, clones em dobro e bebidas geladas em um menu rapido para pedir.
              </p>
            </div>

            <div className="grid gap-3 self-end sm:grid-cols-3 lg:grid-cols-1">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-md border border-white/14 bg-white/12 p-3 backdrop-blur">
                  <div className="mb-2 flex items-center justify-between text-white/70">
                    <span className="text-xs font-bold uppercase">{item.label}</span>
                    <item.icon size={16} aria-hidden="true" />
                  </div>
                  <p className="text-2xl font-black">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8" id="menu">
        <div className="space-y-5">
          <div className="rounded-lg border border-ink/10 bg-white p-4 shadow-panel">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-black">Cardapio</h2>
                <p className="text-sm text-slate-600">Escolha por categoria ou procure seu sushi favorito.</p>
              </div>
              <label className="relative block w-full lg:max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
                <input
                  className="w-full rounded-md border border-ink/10 bg-rice py-3 pl-10 pr-3 outline-none transition focus:border-tuna focus:ring-2 focus:ring-tuna/20"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar sushi, combo, bebida..."
                  value={query}
                />
              </label>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  className={`shrink-0 rounded-md border px-3 py-2 text-sm font-bold transition ${
                    selectedCategory === category
                      ? "border-ink bg-ink text-white"
                      : "border-ink/10 bg-white text-slate-700 hover:border-tuna hover:text-tuna"
                  }`}
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <MenuCard
                cartQuantity={cart[item.id] || 0}
                item={item}
                key={item.id}
                onAdd={() => addToCart(item.id)}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="rounded-lg border border-ink/10 bg-white p-10 text-center shadow-panel">
              <Search className="mx-auto text-slate-400" size={40} aria-hidden="true" />
              <h3 className="mt-4 text-lg font-black">Nada encontrado</h3>
              <p className="mt-1 text-sm text-slate-500">Tente outra categoria ou termo de busca.</p>
            </div>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start" id="pedido">
          <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-panel">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black">Seu pedido</h2>
                <p className="text-sm text-slate-500">{totalQuantity || "Nenhum"} item selecionado</p>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-md bg-tuna text-white">
                <ShoppingBag size={20} aria-hidden="true" />
              </span>
            </div>

            <div className="space-y-3">
              {cartItems.map((item) => (
                <div className="rounded-md border border-ink/10 p-3" key={item.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="break-words font-bold">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.amount}</p>
                    </div>
                    <p className="shrink-0 font-black text-tuna">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <QuantityControl
                      onAdd={() => addToCart(item.id)}
                      onRemove={() => removeFromCart(item.id)}
                      quantity={item.quantity}
                    />
                    <button
                      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold text-slate-500 transition hover:bg-tuna/10 hover:text-tuna"
                      onClick={() => setCart((current) => {
                        const { [item.id]: _, ...nextCart } = current;
                        return nextCart;
                      })}
                      type="button"
                    >
                      <Trash2 size={14} aria-hidden="true" />
                      remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {cartItems.length === 0 && (
              <div className="rounded-md border border-dashed border-ink/20 bg-rice p-5 text-center">
                <Flame className="mx-auto text-tuna" size={30} aria-hidden="true" />
                <p className="mt-3 text-sm font-bold">Adicione itens para montar seu pedido.</p>
              </div>
            )}

            <div className="mt-5 space-y-2 border-t border-ink/10 pt-4 text-sm">
              <PriceLine label="Subtotal" value={subtotal} />
              <PriceLine label="Taxa de embalagem" value={serviceFee} />
              <div className="flex items-center justify-between pt-2 text-lg font-black">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <a
              className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 font-black transition ${
                cartItems.length === 0
                  ? "pointer-events-none bg-slate-200 text-slate-500"
                  : "bg-ink text-white hover:bg-tuna"
              }`}
              href={whatsappLink}
              rel="noreferrer"
              target="_blank"
            >
              <Send size={18} aria-hidden="true" />
              Enviar pedido
            </a>

            {cartItems.length > 0 && (
              <button
                className="mt-2 inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-bold text-slate-500 transition hover:bg-rice hover:text-tuna"
                onClick={clearCart}
                type="button"
              >
                limpar pedido
              </button>
            )}
          </section>

          <section className="rounded-lg border border-ink/10 bg-ink p-5 text-white shadow-panel">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-yuzu text-ink">
                <BadgePercent size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-black">Promo do dia</h3>
                <p className="text-sm text-white/70">Clone Hot + Soda Yuzu</p>
              </div>
            </div>
            <button
              className="mt-4 inline-flex w-full items-center justify-between rounded-md bg-white px-3 py-3 text-sm font-black text-ink transition hover:bg-yuzu"
              onClick={() => {
                addToCart("clone-hot");
                addToCart("bebida-soda");
              }}
              type="button"
            >
              adicionar promocao
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </section>
        </aside>
      </section>

      <footer className="border-t border-ink/10 bg-white/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p className="font-bold text-ink">Sakura Sushi</p>
          <p>Aberto hoje das 18h as 23h30. Valores sujeitos a disponibilidade.</p>
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-rice px-2 py-1">
              <GlassWater size={14} aria-hidden="true" />
              bebidas geladas
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-rice px-2 py-1">
              <Wine size={14} aria-hidden="true" />
              sake
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function MenuCard({ item, cartQuantity, onAdd, onRemove }) {
  return (
    <article className="group flex min-h-[300px] flex-col rounded-lg border border-ink/10 bg-white shadow-panel transition hover:-translate-y-1 hover:border-tuna/40">
      <div className="flex items-center justify-between gap-3 border-b border-ink/10 p-4">
        <span className={`h-10 w-10 shrink-0 rounded-md ${item.accent}`} aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-black uppercase text-slate-500">{item.category}</p>
          <h3 className="break-words text-lg font-black leading-tight">{item.name}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge>{item.amount}</Badge>
          <Badge>{item.type}</Badge>
          <Badge tone="promo">{item.tag}</Badge>
        </div>
        <p className="flex-1 text-sm leading-6 text-slate-600">{item.description}</p>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            {item.oldPrice && <p className="text-sm font-bold text-slate-400 line-through">{formatCurrency(item.oldPrice)}</p>}
            <p className="text-2xl font-black text-ink">{formatCurrency(item.price)}</p>
          </div>
          {cartQuantity > 0 ? (
            <QuantityControl onAdd={onAdd} onRemove={onRemove} quantity={cartQuantity} />
          ) : (
            <button
              className="inline-flex items-center gap-2 rounded-md bg-tuna px-3 py-2 text-sm font-black text-white transition hover:bg-ink"
              onClick={onAdd}
              type="button"
            >
              <Plus size={16} aria-hidden="true" />
              adicionar
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function Badge({ children, tone = "default" }) {
  const classes =
    tone === "promo"
      ? "border-tuna/20 bg-tuna/10 text-tuna"
      : "border-ink/10 bg-rice text-slate-600";
  return <span className={`rounded-md border px-2 py-1 text-xs font-bold ${classes}`}>{children}</span>;
}

function QuantityControl({ quantity, onAdd, onRemove }) {
  return (
    <div className="inline-grid grid-cols-[34px_38px_34px] overflow-hidden rounded-md border border-ink/10 bg-rice text-sm font-black">
      <button className="grid h-9 place-items-center transition hover:bg-white" onClick={onRemove} type="button" aria-label="Diminuir">
        <Minus size={15} aria-hidden="true" />
      </button>
      <span className="grid h-9 place-items-center border-x border-ink/10">{quantity}</span>
      <button className="grid h-9 place-items-center transition hover:bg-white" onClick={onAdd} type="button" aria-label="Aumentar">
        <Plus size={15} aria-hidden="true" />
      </button>
    </div>
  );
}

function PriceLine({ label, value }) {
  return (
    <div className="flex items-center justify-between text-slate-600">
      <span>{label}</span>
      <span className="font-bold text-ink">{formatCurrency(value)}</span>
    </div>
  );
}

export default App;
