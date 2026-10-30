import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, ShoppingBag, Menu, X, Heart, ArrowRight, ChevronDown,
  SlidersHorizontal, Plus, Minus, Trash2, Sparkles, Truck, RotateCcw, ShieldCheck
} from "lucide-react";
import "./style.css";

const products = [
  { id: 1, name: "Everyday Linen Shirt", category: "Men", type: "Shirts", price: 1299, oldPrice: 1799, color: "Sand", badge: "BESTSELLER", image: "photo-1602810318383-e386cc2a3ccf" },
  { id: 2, name: "Soft Knit Co-ord Set", category: "Women", type: "Co-ords", price: 1899, oldPrice: 2399, color: "Oatmeal", badge: "NEW", image: "photo-1483985988355-763728e1935b" },
  { id: 3, name: "Classic Denim Jacket", category: "Men", type: "Jackets", price: 2299, oldPrice: 2999, color: "Blue", badge: "", image: "photo-1516257984-b1b4d707412e" },
  { id: 4, name: "Floral Summer Dress", category: "Women", type: "Dresses", price: 1599, oldPrice: 1999, color: "Floral", badge: "POPULAR", image: "photo-1496747611176-843222e1e57c" },
  { id: 5, name: "Little Explorer Set", category: "Kids", type: "Sets", price: 899, oldPrice: 1199, color: "Blue", badge: "NEW", image: "photo-1503919005314-30d93d07d823" },
  { id: 6, name: "Boys Weekend Tee", category: "Boys", type: "T-shirts", price: 599, oldPrice: 799, color: "White", badge: "", image: "photo-1503342217505-b0a15ec3261c" },
  { id: 7, name: "Winter Puffer Jacket", category: "Women", type: "Jackets", price: 2799, oldPrice: 3499, color: "Cream", badge: "SEASONAL", image: "photo-1539533018447-63fcce2678e3" },
  { id: 8, name: "Relaxed Cotton T-shirt", category: "Men", type: "T-shirts", price: 699, oldPrice: 899, color: "Black", badge: "", image: "photo-1521572163474-6864f9cf17ab" },
  { id: 9, name: "Kids Play-all Day Set", category: "Kids", type: "Sets", price: 999, oldPrice: 1299, color: "Multi", badge: "", image: "photo-1519238263530-99f5f9b8e3b8" },
  { id: 10, name: "Modern Everyday Kurta", category: "Women", type: "Ethnic", price: 1399, oldPrice: 1799, color: "Olive", badge: "TRENDING", image: "photo-1583391733956-6c78276477e3" },
  { id: 11, name: "Lightweight Rain Layer", category: "Men", type: "Jackets", price: 1999, oldPrice: 2499, color: "Olive", badge: "SEASONAL", image: "photo-1551028719-00167b16eac5" },
  { id: 12, name: "Mini Sunshine Dress", category: "Kids", type: "Dresses", price: 799, oldPrice: 999, color: "Yellow", badge: "", image: "photo-1519238263530-99f5f9b8e3b8" }
];

const categories = ["All", "Women", "Men", "Boys", "Kids", "Seasonal"];
const money = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const imageUrl = (id, width = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      const matchesCategory = activeCategory === "All" ||
        (activeCategory === "Seasonal" ? p.badge === "SEASONAL" : p.category === activeCategory);
      const q = search.trim().toLowerCase();
      return matchesCategory && (!q || `${p.name} ${p.category} ${p.type} ${p.color}`.toLowerCase().includes(q));
    });
    if (sort === "low") list = [...list].sort((a,b) => a.price-b.price);
    if (sort === "high") list = [...list].sort((a,b) => b.price-a.price);
    if (sort === "name") list = [...list].sort((a,b) => a.name.localeCompare(b.name));
    return list;
  }, [activeCategory, search, sort]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function addToCart(product) {
    setCart(old => {
      const existing = old.find(item => item.id === product.id);
      return existing ? old.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item) : [...old, {...product, qty: 1}];
    });
    setNotice(`${product.name} added to your bag`);
    setTimeout(() => setNotice(""), 2600);
  }
  function changeQty(id, delta) {
    setCart(old => old.map(item => item.id === id ? {...item, qty: item.qty + delta} : item).filter(item => item.qty > 0));
  }
  function toggleWishlist(id) {
    setWishlist(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);
  }
  function goToShop(category = "All") {
    setActiveCategory(category);
    setMobileMenu(false);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="app">
      <div className="announcement">A LITTLE SOMETHING FOR EVERY SEASON <span>✦</span> FREE SHIPPING ON ORDERS OVER ₹1,999</div>
      <header className="header">
        <button className="icon-button mobile-only" aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X/> : <Menu/>}</button>
        <a className="brand" href="#" onClick={e => {e.preventDefault(); window.scrollTo({top:0,behavior:"smooth"});}}>
          <span className="brand-mark">I</span><span className="brand-text">IVAANS<small>C L O T H I N G S</small></span>
        </a>
        <nav className={`nav ${mobileMenu ? "nav-open" : ""}`}>
          {categories.map(c => <button key={c} className={activeCategory === c ? "nav-link active" : "nav-link"} onClick={() => goToShop(c)}>{c === "All" ? "Shop All" : c}</button>)}
          <button className="nav-link" onClick={() => goToShop("Seasonal")}>New Season <span className="tiny-star">✳</span></button>
        </nav>
        <div className="header-actions">
          <label className="search-box"><Search size={18}/><input value={search} onChange={e => {setSearch(e.target.value); document.getElementById("shop")?.scrollIntoView({behavior:"smooth"});}} placeholder="Search styles..." aria-label="Search styles"/></label>
          <button className="icon-button bag-button" aria-label="Open shopping bag" onClick={() => setCartOpen(true)}><ShoppingBag/><span>Bag</span><b>{cartCount}</b></button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles size={14}/> THE EVERYDAY EDIT</p>
            <h1>Made for<br/><em>every</em> version<br/>of you.</h1>
            <p className="hero-description">Feel-good clothes for big days, slow days, and every little moment in between.</p>
            <button className="button button-dark" onClick={() => goToShop("All")}>Explore the collection <ArrowRight size={17}/></button>
            <div className="hero-footnote"><span>01 — 04</span><span className="hero-line"></span><span>Style for everyone</span></div>
          </div>
          <div className="hero-visual">
            <img className="hero-image" src={imageUrl("photo-1483985988355-763728e1935b", 1300)} alt="Fashion editorial with friends shopping for clothes"/>
            <div className="hero-sticker"><span>YOUR</span><strong>STYLE.</strong><span>YOUR STORY.</span><b>✳</b></div>
            <div className="hero-caption">A wardrobe that feels like you. <span>↗</span></div>
          </div>
        </section>

        <section className="category-strip">
          <div className="section-heading"><p className="eyebrow">FIND YOUR FIT</p><h2>Something for <em>everyone.</em></h2></div>
          <div className="category-cards">
            {[
              {name:"Women", sub:"Everyday, elevated", img:"photo-1483985988355-763728e1935b"},
              {name:"Men", sub:"Easy does it", img:"photo-1516257984-b1b4d707412e"},
              {name:"Boys", sub:"Little big energy", img:"photo-1503342217505-b0a15ec3261c"},
              {name:"Kids", sub:"Made to play", img:"photo-1503919005314-30d93d07d823"}
            ].map(c => <button className="category-card" key={c.name} onClick={() => goToShop(c.name)}>
              <img src={imageUrl(c.img, 550)} alt={`${c.name} clothing collection`}/><span className="category-overlay"></span>
              <span className="category-info"><span>{c.sub}</span><strong>{c.name}</strong></span><span className="category-arrow"><ArrowRight size={18}/></span>
            </button>)}
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="shop-title-row"><div><p className="eyebrow">THE IVAANS COLLECTION</p><h2>Good clothes. <em>Good mood.</em></h2><p className="muted">Thoughtful everyday style, whatever the weather.</p></div><div className="sort-control"><SlidersHorizontal size={17}/><select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="name">Name: A to Z</option></select><ChevronDown size={14}/></div></div>
          <div className="filter-row">{categories.map(c => <button key={c} onClick={() => setActiveCategory(c)} className={`filter-chip ${activeCategory === c ? "selected" : ""}`}>{c}</button>)}<span className="result-count">{filtered.length} styles</span></div>
          {filtered.length ? <div className="product-grid">{filtered.map(p => <article className="product-card" key={p.id}>
            <div className="product-image-wrap"><img src={imageUrl(p.image)} alt={p.name} loading="lazy"/>{p.badge && <span className={`product-badge ${p.badge === "NEW" ? "badge-new" : ""}`}>{p.badge}</span>}
              <button className={`wishlist-button ${wishlist.includes(p.id) ? "wishlisted" : ""}`} onClick={() => toggleWishlist(p.id)} aria-label={wishlist.includes(p.id) ? "Remove from wishlist" : "Add to wishlist"}><Heart size={18} fill={wishlist.includes(p.id) ? "currentColor" : "none"}/></button>
              <button className="quick-add" onClick={() => addToCart(p)}><Plus size={16}/> Add to bag</button>
            </div>
            <div className="product-info"><div><p className="product-category">{p.category} · {p.type}</p><h3>{p.name}</h3><span className="product-color">{p.color}</span></div><div className="product-prices"><strong>{money(p.price)}</strong><del>{money(p.oldPrice)}</del></div></div>
          </article>)}</div> : <div className="empty-results"><h3>No styles found just yet.</h3><p>Try another search or category.</p><button className="button button-dark" onClick={() => {setSearch("");setActiveCategory("All");}}>Show all styles</button></div>}
          <div className="view-more"><span>GOOD STYLE IS FOR EVERYONE.</span><span className="decor-line"></span><span>IVAANS CLOTHINGS ✳</span></div>
        </section>

        <section className="season-banner"><div className="season-photo"><img src={imageUrl("photo-1539109136881-3be0616acf4b", 1000)} alt="Seasonal fashion editorial"/></div><div className="season-copy"><p className="eyebrow">DRESS FOR THE MOMENT</p><h2>New season.<br/><em>New feeling.</em></h2><p>Light layers, easy essentials, and pieces you'll reach for on repeat. Your next favourite is waiting.</p><button className="button button-light" onClick={() => goToShop("Seasonal")}>Shop seasonal styles <ArrowRight size={17}/></button></div></section>

        <section className="promise-row">
          <div><Truck/><span><strong>Shipping made simple</strong><small>Free over ₹1,999</small></span></div>
          <div><RotateCcw/><span><strong>Easy returns</strong><small>On eligible items</small></span></div>
          <div><ShieldCheck/><span><strong>Checkout with confidence</strong><small>Your details stay protected</small></span></div>
        </section>
      </main>

      <footer className="footer"><div className="footer-main"><div><a className="brand footer-brand" href="#"><span className="brand-mark">I</span><span className="brand-text">IVAANS<small>C L O T H I N G S</small></span></a><p>Clothes for all the ways you show up.<br/>Every day, every season, every you.</p></div><div><h4>EXPLORE</h4><button onClick={() => goToShop("Women")}>Women</button><button onClick={() => goToShop("Men")}>Men</button><button onClick={() => goToShop("Boys")}>Boys</button><button onClick={() => goToShop("Kids")}>Kids</button></div><div><h4>NEED HELP?</h4><a href="mailto:hello@ivaansclothings.example">Contact us</a><a href="#shop">Shipping & returns</a><a href="#shop">Size guide</a></div><div className="newsletter"><h4>A NOTE FROM IVAANS</h4><p>New drops, outfit ideas, and little things worth opening.</p><form onSubmit={e => {e.preventDefault(); setNotice("Thanks for your interest! Newsletter signup needs a backend connection."); setTimeout(() => setNotice(""), 3500);}}><input type="email" required placeholder="Your email address" aria-label="Your email address"/><button aria-label="Subscribe"><ArrowRight/></button></form><small>Newsletter signup is a demo until connected to a backend.</small></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Ivaans Clothings. Demo storefront.</span><span>MADE FOR EVERY YOU ✳</span><span>Instagram&nbsp;&nbsp; Pinterest</span></div></footer>

      {notice && <div className="toast" role="status">{notice}</div>}
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><div><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({cartCount})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close bag"><X/></button></div>
        {!cart.length ? <div className="empty-cart"><ShoppingBag size={36}/><h3>Your bag is taking a little break.</h3><p>Find something that feels like you.</p><button className="button button-dark" onClick={() => {setCartOpen(false);goToShop("All");}}>Explore styles <ArrowRight size={16}/></button></div> :
        <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><img src={imageUrl(item.image, 250)} alt={item.name}/><div className="cart-item-info"><h3>{item.name}</h3><p>{money(item.price)}</p><div className="qty-control"><button onClick={() => changeQty(item.id,-1)} aria-label="Decrease quantity"><Minus size={13}/></button><span>{item.qty}</span><button onClick={() => changeQty(item.id,1)} aria-label="Increase quantity"><Plus size={13}/></button></div></div><button className="remove-item" onClick={() => setCart(old => old.filter(x => x.id !== item.id))} aria-label={`Remove ${item.name}`}><Trash2 size={16}/></button></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Shipping and taxes are calculated at checkout.</p><button className="button button-dark checkout-button" onClick={() => setCheckoutOpen(true)}>Continue to checkout <ArrowRight size={17}/></button><small>Demo only: payment and order processing are not connected.</small></div></>}
      </aside></div>}

      {checkoutOpen && <div className="modal-backdrop" onClick={() => setCheckoutOpen(false)}><div className="checkout-modal" onClick={e => e.stopPropagation()}><button className="icon-button modal-close" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout"><X/></button><p className="eyebrow">ONE LAST THING</p><h2>Checkout is not connected yet.</h2><p>This is the starter storefront. To accept real orders, the next step is to add a backend, inventory, secure payment gateway, shipping, and order confirmation.</p><div className="modal-total"><span>Current bag subtotal</span><strong>{money(subtotal)}</strong></div><button className="button button-dark" onClick={() => setCheckoutOpen(false)}>Back to my bag</button></div></div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App/>);

