import Link from "next/link";
import { User } from "lucide-react";
import BackButton from "./backButton";
import CartButton from "./cartButton";

async function Header() {  
  
  return (
    <header className="mb-6 flex items-center gap-4 py-4 border-b-2">
      <BackButton/>
      <div className="p-6 w-full mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex min-w-8/15 justify-between items-center">
            <Link href={'/products'} className="text-2xl font-bold sm:text-3xl">RevoShop</Link>
            
            {/* navigation */}
            <nav className="flex gap-8">
              <Link href={'/products'} className="text-lg font-bold sm:text-xl">Products</Link>
              <Link href={'/FAQ'} className="text-lg font-bold sm:text-xl">FAQ</Link>
            </nav>
          </div>

          {/* icon */}
          <div className="flex gap-3 items-center">
            {/* shopping cart icon */}
            <CartButton/>

            {/* user icon */}
            <Link href={'/profile'}>
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shadow-lg hover:bg-zinc-600">
                  <User size={21}/>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header