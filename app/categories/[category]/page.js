import CategoryCard from "../../components/CategoryCard";   // Import reusable component to display a product card

async function getCategoryProducts(category) {               // Fetch products for a specific category
  const res = await fetch(                                   // Make API request to FakeStore API
    `https://fakestoreapi.com/products/category/${category}`, // API endpoint for the category
    { cache: "no-store" }                                    // Disable caching to always get fresh data
  );
  return res.json();                                         // Convert response to JSON and return array of products
}

export default async function CategoryProductsPage({ params }) { // Server component to display category products
  const { category } = await params;                         // Extract category name from URL params
  const products = await getCategoryProducts(category);      // Fetch products for this category

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{category}</h1>    {/* Display category name as centered heading */}

      <div
        style={{
          display: "flex",                                    // Flexbox container for product cards
          flexWrap: "wrap",                                   // Wrap cards to new line when necessary
          gap: "20px",                                        // Gap between cards
          padding: "10px",                                    // Padding around container
        }}
      >
        {products.map((product) => (                         // Loop through all products in category
          <CategoryCard key={product.id} product={product} /> // Render CategoryCard for each product
        ))}
      </div>
    </div>
  );
}
