import ProductDetails from "../../components/ProductDetails";  // Import component to display single product details
import { notFound } from "next/navigation";                    // Import Next.js function to handle 404 page

export const metadata = {                                      // Page metadata for Next.js
  title: 'ProductDetails',                                     // Set page title
};

export default async function ProductPage({ params }) {       
  const { id } = await params;                                 // Extract product ID from route parameters

  const res = await fetch(`https://fakestoreapi.com/products/${id}`); // Fetch product details from FakeStore API

  if (!res.ok) return notFound();                               // Return 404 page if fetch fails
  const product = await res.json();                             // Parse response JSON

  return <ProductDetails product={product} />;                 // Render ProductDetails component with fetched product
}
