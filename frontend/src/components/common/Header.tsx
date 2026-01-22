/**
 * Header.tsx - Main Navigation Header
 *
 * Features:
 * - Main header hides on scroll down, HeaderBottom sticks
 * - Both visible at top of page
 * - Badge counts for favorites and cart
 */

import { useState, useEffect } from "react";
import {
  RiSearchLine,
  RiHeartLine,
  RiShoppingCartLine,
  RiUserLine,
  RiAlignLeft,
  RiArrowDropDownLine,
} from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navItems } from "@/shared/config/navigation";

interface HeaderProps {
  favoritesCount?: number;
  cartCount?: number;
  userName?: string;
}

export function Header({
  favoritesCount = 0,
  cartCount = 0,
  userName = "Hello, World!",
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle scroll - hide main header, keep bottom sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", searchQuery);
    // TODO: Implement search navigation
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Main Header - slides up on scroll */}
      <header
        className={cn(
          "w-full bg-background border-b border-border/50",
          "transition-all duration-300 ease-in-out",
          isScrolled
            ? "-translate-y-full opacity-0 h-0 overflow-hidden"
            : "translate-y-0 opacity-100 py-4",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            {/* Section 1: Logo */}
            <Link to="/" className="flex-shrink-0 group">
              <h1 className="font-bold text-2xl text-primary group-hover:text-primary/80 transition-colors">
                E-Commerce
              </h1>
            </Link>

            {/* Section 2: Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
              <div className="relative flex items-center">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands, and more..."
                  className="
                    w-full h-12 rounded-l-full rounded-r-none
                    bg-muted/50 border-r-0
                    pl-5 pr-4
                    text-base
                    focus-visible:ring-1 focus-visible:ring-primary
                  "
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-6 rounded-l-none rounded-r-full"
                >
                  <RiSearchLine className="h-5 w-5" />
                </Button>
              </div>
            </form>

            {/* Section 3: Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Avatar with Tooltip */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="lg"
                  className="flex items-center gap-2 rounded-full"
                >
                  <RiUserLine className="h-5 w-5" />
                  <span className="text-sm font-medium hidden sm:inline">
                    Account
                  </span>
                </Button>

                {/* Tooltip */}
                <div
                  className="
                  absolute top-full right-0 mt-2
                  px-3 py-2 rounded-lg
                  bg-foreground text-background
                  text-sm font-medium
                  opacity-0 invisible
                  group-hover:opacity-100 group-hover:visible
                  transition-all duration-200
                  whitespace-nowrap shadow-lg z-50
                "
                >
                  {userName}
                  <div className="absolute -top-1 right-4 w-2 h-2 bg-foreground rotate-45" />
                </div>
              </div>

              {/* Favorites Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full hover:text-rose-500"
              >
                <RiHeartLine className="h-5 w-5" />
                {favoritesCount > 0 && (
                  <span
                    className="
                    absolute -top-1 -right-1
                    flex items-center justify-center
                    min-w-[18px] h-[18px]
                    text-xs font-bold
                    bg-rose-500 text-white
                    rounded-full px-1
                  "
                  >
                    {favoritesCount > 99 ? "99+" : favoritesCount}
                  </span>
                )}
              </Button>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full hover:text-primary"
              >
                <RiShoppingCartLine className="h-5 w-5" />
                {cartCount > 0 && (
                  <span
                    className="
                    absolute -top-1 -right-1
                    flex items-center justify-center
                    min-w-[18px] h-[18px]
                    text-xs font-bold
                    bg-primary text-primary-foreground
                    rounded-full px-1
                  "
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Header Bottom - always visible, sticks at top on scroll */}
      <HeaderBottom isScrolled={isScrolled} />
    </div>
  );
}

interface HeaderBottomProps {
  isScrolled: boolean;
}

const HeaderBottom = ({ isScrolled }: HeaderBottomProps) => {
  return (
    <div
      className={cn(
        "w-full bg-background border-b border-border/50",
        "transition-all duration-300",
        isScrolled && "shadow-md",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {/* Departments Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 font-medium hover:bg-muted"
              >
                <RiAlignLeft className="h-5 w-5" />
                <span>All Departments</span>
                <RiArrowDropDownLine className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="start">
              <DropdownMenuLabel className="text-xs uppercase text-muted-foreground">
                Browse Categories
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Electronics with subcategories */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Electronics</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/">Smartphones</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/">Laptops</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/">Tablets</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/">Accessories</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              {/* Fashion with subcategories */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Fashion</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/">Men's Clothing</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/">Women's Clothing</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/">Kids</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/">Shoes</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              {/* Home & Garden with subcategories */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Home & Garden</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/">Furniture</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/">Kitchen</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/">Decor</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuSeparator />

              {/* Simple categories without subcategories */}
              <DropdownMenuItem asChild>
                <Link to="/">Sports & Outdoors</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/">Beauty & Health</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/">Books & Media</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.href as "/"}
                className="
                  px-4 py-2 
                  text-sm font-medium text-foreground/80
                  rounded-md
                  hover:text-foreground hover:bg-muted
                  transition-colors duration-200
                "
                activeProps={{
                  className: "bg-muted",
                }}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Compact search when scrolled */}
          {isScrolled && (
            <div className="hidden lg:flex items-center gap-2">
              <Input
                type="text"
                placeholder="Search..."
                className="w-48 h-9 rounded-full text-sm"
              />
              <Button size="sm" className="rounded-full h-9 px-4">
                <RiSearchLine className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
