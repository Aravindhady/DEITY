import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-[101px] px-6 lg:px-[108px]">
        {/* Left: Contact Us */}
        <div className="flex items-center">
          <span className="text-black text-xl font-normal">+ Contact Us</span>
        </div>

        {/* Center: Logo */}
        <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/ce8c81733e0b44e1212bc869b27316bbf45f4529?width=428" 
            alt="Deity" 
            className="h-[30px] w-auto"
          />
        </Link>

        {/* Right: Icons and Menu */}
        <div className="flex items-center gap-6">
          {/* Account Icon */}
          <button className="text-black hover:opacity-70 transition-opacity">
            <User className="w-6 h-6" strokeWidth={1.5} />
          </button>

          {/* Shopping Bag Icon */}
          <button className="text-black hover:opacity-70 transition-opacity">
            <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
          </button>

          {/* Search Icon */}
          <button className="text-black hover:opacity-70 transition-opacity">
            <Search className="w-6 h-6" strokeWidth={1.5} />
          </button>

          {/* Menu */}
          <div className="flex items-center gap-2">
            <Menu className="w-[30px] h-[30px]" strokeWidth={1.5} />
            <span className="text-black text-xl font-normal">Menu</span>
          </div>
        </div>
      </div>
    </header>
  );
}
