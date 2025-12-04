"use client";                                                  // Client component because it uses hooks & browser APIs
import Link from "next/link";                                  // Next.js Link component for client-side navigation
import { useSelector } from "react-redux";                     // Hook to access Redux store
import { useRouter } from "next/navigation";                   // Hook to programmatically navigate routes
import { useState, useEffect } from "react";                   // React hooks for state & lifecycle
import styles from "../module/Navbar.module.css";              // Import CSS module for Navbar styling

export default function Header() {
  const cartCount = useSelector((state) =>                     // Get total number of items in cart
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0) // Sum quantities of all cart items
  );

  const router = useRouter();                                 // Initialize router for navigation
  const [search, setSearch] = useState("");                   // State to store search input
  const [username, setUsername] = useState(null);             // State to store username from cookies

  useEffect(() => {                                           // Effect runs on component mount
    const checkCookie = () => {                               // Function to read "username" cookie
      const cookieUsername = document.cookie
        .split("; ")                                          // Split cookies into array ["name=value", ...]
        .find(row => row.startsWith("username="))             // Find cookie starting with "username="
        ?.split("=")[1] || "";                                // Extract value or default to empty string

      setUsername(cookieUsername);                            // Update React state with cookie value
    };

    checkCookie();                                            // Run immediately to set initial username

    const interval = setInterval(checkCookie, 500);           // Check cookie every 500ms to detect login/logout changes

    return () => clearInterval(interval);                     // Cleanup interval on unmount to avoid memory leaks
  }, []);                                                     // Empty dependency → run once on mount

  const handleSearch = (e) => {                               
    e.preventDefault();                                        // Prevent form default submission
    if (search.trim() !== "") {                                // Only search if input is not empty
      router.push(`/categories/${encodeURIComponent(search.trim().toLowerCase())}`); // Navigate to category page
      setSearch("");                                           // Clear search input after navigation
    }
  };

  const handleLogout = () => {                                 
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";    // Delete token cookie
    document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Delete username cookie
    setUsername(null);                                         // Reset username state
    router.push("/login");                                     // Redirect user to login page
  };

  return (
    <header className={styles.header}>                                   
      {/* LEFT: Logo */}
      <div className={styles.logo}>                            
        <Link href="/">                                       
          <img src="/logo.jpg" alt="Logo" height={30} />      
        </Link>
      </div>

      {/* CENTER: Search Bar */}
      <form onSubmit={handleSearch} className={styles.search}>
        <input
          type="text"                                         // Search input
          placeholder=" electronics | jewelery | men's clothing | women's clothing..." // Placeholder
          value={search}                                      // Bind input value to state
          onChange={(e) => setSearch(e.target.value)}         // Update state on typing
        />
        <button type="submit" className={styles.searchBtn}>  
          <img src="/search.png" alt="Search" height={20} /> 
        </button>
      </form>

      {/* RIGHT: Navigation */}
      <nav className={styles.nav}>                            
        {username ? (            // Conditional rendering if user is logged in
          <>
            <span className={styles.username}>Hi {username}!</span> 
            <button onClick={handleLogout} className={styles.logoutBtn}> 
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className={styles.navLink}>Login</Link> // Show login link if not logged in
        )}

        <Link href="/about" className={styles.navLink}>About</Link>   
        <Link href="/contact" className={styles.navLink}>Contact</Link>  

        <Link href="/cart" className={styles.cartLink}>         
          <div className={styles.cartIconWrapper}>           
            <img src="/cart.png" alt="Cart" height={25} />  
            {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>} 
          </div>
        </Link>
      </nav>
    </header>
  );
}
