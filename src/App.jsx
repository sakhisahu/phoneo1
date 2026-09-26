import { useMemo, useState } from "react";

const products = [
  {
    id: 1,
    brand: "Apple",
    name: "iPhone 15 Pro Max",
    category: "Flagship",
    price: 134999,
    oldPrice: 149999,
    rating: 4.9,
    storage: "256 GB",
    color: "Natural Titanium",
    display: "6.7-inch Super Retina XDR",
    camera: "48MP Main Camera",
    battery: "4441 mAh",
    processor: "Apple A17 Pro",
    image:
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=700&q=85",
    badge: "Editor's Pick",
  },
  {
    id: 2,
    brand: "Samsung",
    name: "Galaxy S24 Ultra",
    category: "Flagship",
    price: 129999,
    oldPrice: 139999,
    rating: 4.8,
    storage: "512 GB",
    color: "Titanium Black",
    display: "6.8-inch Dynamic AMOLED",
    camera: "200MP Main Camera",
    battery: "5000 mAh",
    processor: "Snapdragon 8 Gen 3",
    image:
      "https://images.unsplash.com/photo-1707230513925-3f7a62c3e8a3?auto=format&fit=crop&w=700&q=85",
    badge: "Top Rated",
  },
  {
    id: 3,
    brand: "Google",
    name: "Pixel 9 Pro",
    category: "Camera Phone",
    price: 109999,
    oldPrice: 119999,
    rating: 4.7,
    storage: "256 GB",
    color: "Obsidian",
    display: "6.3-inch OLED 120Hz",
    camera: "50MP Triple Camera",
    battery: "4700 mAh",
    processor: "Google Tensor G4",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=85",
    badge: "New Arrival",
  },
  {
    id: 4,
    brand: "OnePlus",
    name: "OnePlus 13",
    category: "Performance",
    price: 69999,
    oldPrice: 74999,
    rating: 4.6,
    storage: "256 GB",
    color: "Midnight",
    display: "6.82-inch AMOLED 120Hz",
    camera: "50MP Hasselblad Camera",
    battery: "6000 mAh",
    processor: "Snapdragon 8 Elite",
    image:
      "https://images.unsplash.com/photo-1592286927505-2fd9e9db7c96?auto=format&fit=crop&w=700&q=85",
    badge: "Best Value",
  },
  {
    id: 5,
    brand: "Xiaomi",
    name: "Xiaomi 14 Ultra",
    category: "Camera Phone",
    price: 89999,
    oldPrice: 99999,
    rating: 4.5,
    storage: "512 GB",
    color: "White",
    display: "6.73-inch AMOLED 120Hz",
    camera: "50MP Leica Camera",
    battery: "5000 mAh",
    processor: "Snapdragon 8 Gen 3",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=85",
    badge: "Hot Deal",
  },
  {
    id: 6,
    brand: "Nothing",
    name: "Nothing Phone 2",
    category: "Mid Range",
    price: 39999,
    oldPrice: 44999,
    rating: 4.4,
    storage: "256 GB",
    color: "White",
    display: "6.7-inch OLED 120Hz",
    camera: "50MP Dual Camera",
    battery: "4700 mAh",
    processor: "Snapdragon 8+ Gen 1",
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=700&q=85",
    badge: "Trending",
  },
  {
    id: 7,
    brand: "Motorola",
    name: "Edge 50 Pro",
    category: "Mid Range",
    price: 31999,
    oldPrice: 36999,
    rating: 4.3,
    storage: "256 GB",
    color: "Luxe Lavender",
    display: "6.7-inch pOLED 144Hz",
    camera: "50MP Main Camera",
    battery: "4500 mAh",
    processor: "Snapdragon 7 Gen 3",
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=700&q=85",
    badge: "Limited Deal",
  },
  {
    id: 8,
    brand: "Vivo",
    name: "Vivo X100 Pro",
    category: "Camera Phone",
    price: 89999,
    oldPrice: 94999,
    rating: 4.6,
    storage: "512 GB",
    color: "Asteroid Black",
    display: "6.78-inch AMOLED 120Hz",
    camera: "50MP ZEISS Camera",
    battery: "5400 mAh",
    processor: "MediaTek Dimensity 9300",
    image:
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=85",
    badge: "Camera King",
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const getDiscount = (product) =>
  Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

function App() {
  const [query, setQuery] = useState("");
const [brand, setBrand] = useState("All Brands");
const [category, setCategory] = useState("All Categories");
const [sort, setSort] = useState("Featured");
const [wishlist, setWishlist] = useState([]);
const [compare, setCompare] = useState([]);
const [menuOpen, setMenuOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);

const [activeOverlay, setActiveOverlay] = useState(null);
const [contactSubmitted, setContactSubmitted] = useState(false);
  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const searchableText = `
        ${product.name}
        ${product.brand}
        ${product.category}
        ${product.color}
      `.toLowerCase();

      const matchesSearch = searchableText.includes(query.toLowerCase());
      const matchesBrand =
        brand === "All Brands" || product.brand === brand;
      const matchesCategory =
        category === "All Categories" || product.category === category;

      return matchesSearch && matchesBrand && matchesCategory;
    });

    if (sort === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "Top Rated") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [query, brand, category, sort]);

  const toggleWishlist = (id) => {
    setWishlist((items) =>
      items.includes(id)
        ? items.filter((item) => item !== id)
        : [...items, id]
    );
  };

  const toggleCompare = (id) => {
    setCompare((items) => {
      if (items.includes(id)) {
        return items.filter((item) => item !== id);
      }

      if (items.length >= 3) {
        alert("आप maximum 3 phones compare कर सकते हैं।");
        return items;
      }

      return [...items, id];
    });
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="container nav-inner">
          <a className="logo" href="#home">
            <span className="logo-icon">✦</span>
            Mobile<span>Hub</span>
          </a>

          <nav className={menuOpen ? "nav-links show" : "nav-links"}>
            <a href="#home" onClick={() => setMenuOpen(false)}>
              Home
            </a>
            <a href="#phones" onClick={() => setMenuOpen(false)}>
              Phones
            </a>
            <a href="#deals" onClick={() => setMenuOpen(false)}>
              Deals
            </a>
            <a href="#brands" onClick={() => setMenuOpen(false)}>
              Brands
            </a>
            <button
  className="footer-contact-button"
  onClick={() => {
    setContactSubmitted(false);
    setActiveOverlay("contact");
  }}
>
  Contact
</button>
          </nav>

          <div className="nav-actions">
            <button className="icon-button" title="Wishlist">
              ♡
              {wishlist.length > 0 && (
                <small className="count">{wishlist.length}</small>
              )}
            </button>

            <button className="icon-button" title="Compare">
              ⇄
              {compare.length > 0 && (
                <small className="count">{compare.length}</small>
              )}
            </button>

            <button
              className="menu-button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="eyebrow">
                <span></span>
                The smarter way to choose
              </div>

              <h1>
                Find your next
                <br />
                <strong>perfect phone.</strong>
              </h1>

              <p>
                Compare the latest smartphones, discover honest prices and
                choose technology that fits your lifestyle.
              </p>

              <div className="hero-buttons">
                <a href="#phones" className="primary-button">
                  Explore phones <span>↗</span>
                </a>

                <a href="#deals" className="text-button">
                  Today's deals →
                </a>
              </div>

              <div className="hero-stats">
                <div>
                  <strong>500+</strong>
                  <span>Smartphones</span>
                </div>
                <div>
                  <strong>35+</strong>
                  <span>Top brands</span>
                </div>
                <div>
                  <strong>4.9/5</strong>
                  <span>User rating</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="glow-circle"></div>
              <div className="floating-tag tag-one">AI Camera</div>
              <div className="floating-tag tag-two">120Hz Display</div>

              <div className="phone-showcase">
                <div className="phone-camera">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>

                <div className="phone-screen">
                  <div className="screen-time">09:41</div>
                  <div className="screen-orb"></div>

                  <div className="screen-label">
                    PURE
                    <br />
                    POWER
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container category-strip" id="brands">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Browse collection</span>
              <h2>Shop by category</h2>
            </div>

            <span className="category-count">08 categories</span>
          </div>

          <div className="category-list">
            <button
              className={category === "All Categories" ? "active" : ""}
              onClick={() => setCategory("All Categories")}
            >
              <span>◈</span>
              All phones
            </button>

            <button
              className={category === "Flagship" ? "active" : ""}
              onClick={() => setCategory("Flagship")}
            >
              <span>◆</span>
              Flagship
            </button>

            <button
              className={category === "Camera Phone" ? "active" : ""}
              onClick={() => setCategory("Camera Phone")}
            >
              <span>◉</span>
              Camera phones
            </button>

            <button
              className={category === "Performance" ? "active" : ""}
              onClick={() => setCategory("Performance")}
            >
              <span>ϟ</span>
              Performance
            </button>

            <button
              className={category === "Mid Range" ? "active" : ""}
              onClick={() => setCategory("Mid Range")}
            >
              <span>◇</span>
              Mid range
            </button>
          </div>
        </section>

        <section className="container catalog" id="phones">
          <div className="catalog-top">
            <div>
              <span className="section-kicker">Curated for you</span>
              <h2>Popular smartphones</h2>
            </div>

            <div className="catalog-controls">
              <div className="search-box">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search phones..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>

              <select
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
              >
                <option>All Brands</option>
                <option>Apple</option>
                <option>Samsung</option>
                <option>Google</option>
                <option>OnePlus</option>
                <option>Xiaomi</option>
                <option>Nothing</option>
                <option>Motorola</option>
                <option>Vivo</option>
              </select>

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option>Featured</option>
                <option>Top Rated</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.name} />

                  <span className="product-badge">{product.badge}</span>

                  <button
                    className={
                      wishlist.includes(product.id)
                        ? "wishlist active"
                        : "wishlist"
                    }
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={`Add ${product.name} to wishlist`}
                  >
                    {wishlist.includes(product.id) ? "♥" : "♡"}
                  </button>
                </div>

                <div className="product-info">
                  <div className="product-meta">
                    <span>{product.brand}</span>
                    <span className="rating">★ {product.rating}</span>
                  </div>

                  <h3>{product.name}</h3>

                  <div className="specs">
                    <span>{product.storage}</span>
                    <span>{product.color}</span>
                  </div>

                  <div className="price-row">
                    <div>
                      <strong>{formatPrice(product.price)}</strong>
                      <del>{formatPrice(product.oldPrice)}</del>
                    </div>

                    <span className="discount">
                      {getDiscount(product)}% off
                    </span>
                  </div>

                  <div className="card-actions">
                    <button
                      className={
                        compare.includes(product.id)
                          ? "compare-button selected"
                          : "compare-button"
                      }
                      onClick={() => toggleCompare(product.id)}
                    >
                      {compare.includes(product.id)
                        ? "✓ Added"
                        : "⇄ Compare"}
                    </button>

                    <button
                      className="view-button"
                      onClick={() => setSelectedProduct(product)}
                    >
                      View details ↗
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-state">
              <div>⌕</div>
              <h3>No phones found</h3>
              <p>Try another brand, category or search keyword.</p>
            </div>
          )}
        </section>

        <section className="deal-banner container" id="deals">
          <div>
            <span className="section-kicker">Limited time offer</span>

            <h2>
              Upgrade today.
              <br />
              Save up to 25%.
            </h2>

            <p>Premium phones at prices that make sense.</p>

            <button
  className="light-button"
  onClick={() => setActiveOverlay("deals")}
>
  View all deals →
</button>
          </div>

          <div className="deal-circle">
            <span>UP TO</span>
            <strong>25%</strong>
            <span>OFF</span>
          </div>
        </section>
      </main>

      {selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="product-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close details"
            >
              ×
            </button>

            <div className="modal-image">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
              />

              <span className="modal-badge">
                {selectedProduct.badge}
              </span>
            </div>

            <div className="modal-content">
              <div className="modal-meta">
                <span>{selectedProduct.brand}</span>
                <span className="modal-rating">
                  ★ {selectedProduct.rating}
                </span>
              </div>

              <h2>{selectedProduct.name}</h2>

              <p className="modal-description">
                {selectedProduct.name} एक premium smartphone है जिसमें शानदार
                performance, powerful camera और modern design मिलता है। यह phone
                daily use, photography, gaming और professional work के लिए
                suitable है।
              </p>

              <div className="modal-price">
                <strong>{formatPrice(selectedProduct.price)}</strong>
                <del>{formatPrice(selectedProduct.oldPrice)}</del>
                <span>{getDiscount(selectedProduct)}% OFF</span>
              </div>

              <div className="detail-spec-grid">
                <div className="detail-spec">
                  <span>Brand</span>
                  <strong>{selectedProduct.brand}</strong>
                </div>

                <div className="detail-spec">
                  <span>Category</span>
                  <strong>{selectedProduct.category}</strong>
                </div>

                <div className="detail-spec">
                  <span>Storage</span>
                  <strong>{selectedProduct.storage}</strong>
                </div>

                <div className="detail-spec">
                  <span>Colour</span>
                  <strong>{selectedProduct.color}</strong>
                </div>

                <div className="detail-spec">
                  <span>Display</span>
                  <strong>{selectedProduct.display}</strong>
                </div>

                <div className="detail-spec">
                  <span>Camera</span>
                  <strong>{selectedProduct.camera}</strong>
                </div>

                <div className="detail-spec">
                  <span>Battery</span>
                  <strong>{selectedProduct.battery}</strong>
                </div>

                <div className="detail-spec">
                  <span>Processor</span>
                  <strong>{selectedProduct.processor}</strong>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className={
                    wishlist.includes(selectedProduct.id)
                      ? "modal-wishlist active"
                      : "modal-wishlist"
                  }
                  onClick={() => toggleWishlist(selectedProduct.id)}
                >
                  {wishlist.includes(selectedProduct.id)
                    ? "♥ Saved"
                    : "♡ Wishlist"}
                </button>



                <button
                  className={
                    compare.includes(selectedProduct.id)
                      ? "modal-compare selected"
                      : "modal-compare"
                  }
                  onClick={() => toggleCompare(selectedProduct.id)}
                >
                  {compare.includes(selectedProduct.id)
                    ? "✓ Added"
                    : "⇄ Compare"}
                </button>

                <button
                  className="modal-buy"
                  onClick={() =>
                    alert("Buy Now feature जल्द ही available होगी।")
                  }
                >
                  Buy now →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeOverlay === "deals" && (
  <div
    className="modal-overlay"
    onClick={() => setActiveOverlay(null)}
  >
    <div
      className="extra-modal deals-modal"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className="modal-close"
        onClick={() => setActiveOverlay(null)}
        aria-label="Close deals"
      >
        ×
      </button>

      <div className="extra-modal-header">
        <span className="section-kicker">Limited time offers</span>
        <h2>Today's best deals</h2>
        <p>
          Latest smartphones पर शानदार discounts का लाभ उठाएं।
        </p>
      </div>

      <div className="deal-items">
        {products
          .filter((product) => getDiscount(product) >= 7)
          .slice(0, 4)
          .map((product) => (
            <div className="deal-item" key={product.id}>
              <img src={product.image} alt={product.name} />

              <div className="deal-item-info">
                <span>{product.brand}</span>
                <h3>{product.name}</h3>

                <div className="deal-item-price">
                  <strong>{formatPrice(product.price)}</strong>
                  <del>{formatPrice(product.oldPrice)}</del>
                </div>

                <small>{getDiscount(product)}% discount</small>
              </div>

              <button
                className="deal-view-button"
                onClick={() => {
                  setActiveOverlay(null);
                  setSelectedProduct(product);
                }}
              >
                View →
              </button>
            </div>
          ))}
      </div>

      <div className="deal-modal-footer">
        <strong>Offer limited time के लिए available है।</strong>
        <span> जल्दी करें और अपना favourite phone खरीदें।</span>
      </div>
    </div>
  </div>
)}

{activeOverlay === "contact" && (
  <div
    className="modal-overlay"
    onClick={() => setActiveOverlay(null)}
  >
    <div
      className="extra-modal contact-modal"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className="modal-close"
        onClick={() => setActiveOverlay(null)}
        aria-label="Close contact form"
      >
        ×
      </button>

      <div className="extra-modal-header">
        <span className="section-kicker">Get in touch</span>
        <h2>Contact MobileHub</h2>
        <p>
          कोई सवाल है? हमें message भेजें। हमारी team जल्द ही reply करेगी।
        </p>
      </div>

      {!contactSubmitted ? (
        <form
          className="contact-form"
          onSubmit={(event) => {
            event.preventDefault();
            setContactSubmitted(true);
          }}
        >
          <label htmlFor="contact-name">Your name</label>
          <input
            id="contact-name"
            type="text"
            placeholder="Enter your name"
            required
          />

          <label htmlFor="contact-email">Email address</label>
          <input
            id="contact-email"
            type="email"
            placeholder="Enter your email"
            required
          />

          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            rows="5"
            placeholder="Write your message..."
            required
          ></textarea>

          <button type="submit" className="contact-submit">
            Send message →
          </button>
        </form>
      ) : (
        <div className="contact-success">
          <div className="success-icon">✓</div>
          <h3>Message sent successfully!</h3>
          <p>
            धन्यवाद! हमारी team जल्द ही आपसे contact करेगी।
          </p>

          <button
            className="contact-submit"
            onClick={() => setActiveOverlay(null)}
          >
            Close
          </button>
        </div>
      )}

      <div className="contact-details">
        <div>
          <span>✉</span>
          <p>hello@mobilehub.com</p>
        </div>

        <div>
          <span>☎</span>
          <p>+91 98765 43210</p>
        </div>
      </div>
    </div>
  </div>
)}

      {compare.length > 0 && (
        <div className="compare-bar">
          <div>
            <strong>{compare.length} phones selected</strong>
            <span>Compare your favourites side-by-side</span>
          </div>

          <button
            onClick={() => alert("Comparison page यहाँ open होगी।")}
          >
            Compare now →
          </button>

          <button
            className="close-compare"
            onClick={() => setCompare([])}
            aria-label="Close comparison"
          >
            ×
          </button>
        </div>
      )}

      <footer id="about">
  <div className="container footer-content">
    <div>
      <a className="logo" href="#home">
        <span className="logo-icon">✦</span>
        Mobile<span>Hub</span>
      </a>

      <p>Technology that fits your life.</p>
    </div>

    <div className="footer-links">
      <a href="#phones">Smartphones</a>
      <a href="#deals">Deals</a>
      <a href="#brands">Brands</a>

      <button
        className="footer-contact-button"
        onClick={() => {
          setContactSubmitted(false);
          setActiveOverlay("contact");
        }}
      >
        Contact
      </button>
    </div>

    <span className="copyright">© 2025 MobileHub</span>
  </div>
</footer>
    </div>
  );
}

export default App;