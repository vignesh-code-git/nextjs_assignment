import ProductList from './components/ProductList';                  // Import component to display list of products
import Carousel from './components/Carousal';                        // Import homepage hero carousel/banner

export const metadata = {                                            // Next.js metadata object for SEO
  title: 'My Shop',                                                  // Browser tab title
  description: 'Explore our featured products in My Shop',           // Meta description for search engines
  icons: '/favicon.ico',                                             // Favicon path (must be inside /public)
};

export default async function Home() {                               // Home page is an async Server Component
  const res = await fetch('https://fakestoreapi.com/products', {     // Fetch product data from external API
    cache: 'no-store'                                                // Disable caching → always fetch fresh data
  });

  const products = await res.json();                                 // Convert response into usable JSON array

  return (
    <div style={{ padding: '2rem' }}>                                {/* Page container with padding */}
      <Carousel />                                                   {/* Full-width image slider */}
      
      <h2 style={{ textAlign: "center" }}>Featured Products</h2>     {/* Section heading */}

      <ProductList products={products} />                            {/* Pass fetched products to ProductList component */}
    </div>
  );
}
