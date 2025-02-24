"use server";
import { User } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../_lib/authOptions";
import CartInfo from "./navbar/CartInfo";
import SearchInput from "./navbar/SearchInput";
import UserDropDownMenu from "./UserDropDownMenu";

export default async function Header() {
  const brands = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "Realme",
    "Honor",
    "Oneplus",
    "Oppo",
  ];
  const session = await getServerSession(authOptions);
  console.log(session);
  // const { cartProducts } = useCartStore();

  // const totalProducts = cartProducts.reduce(
  //   (total, product) => total + product.quantity,
  //   0,
  // );

  // const [searchTerm, setSearchTerm] = useState("");
  // const [showSuggestions, setShowSuggestions] = useState(false);
  // const { searchResults, handleSearch } = useSearchProductStore();

  // const handleFocus = () => setShowSuggestions(true);
  // const handleBlur = () => setTimeout(() => setShowSuggestions(false), 200);

  // const debouncedSearch = debounce((query: string) => {
  //   handleSearch(query);
  // }, 300);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setSearchTerm(value);
  //   debouncedSearch(value);
  // };

  // const handleSignOut = async () => {
  //   await signOut({ callbackUrl: '/', redirect: true });
  // };

  return (
    <header className="bg-white px-10 shadow-md">
      <div className="mx-auto py-4">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" className="mr-3 text-2xl font-bold text-primary">
            Logo
          </Link>
          <SearchInput />
          {/* <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="w-full"
            />

            {showSuggestions && searchResults.length > 0 && (
              <div className="absolute z-10 max-h-60 w-full overflow-y-auto rounded-lg bg-white shadow-lg">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="flex items-center space-x-4 px-4 py-2 hover:bg-gray-100"
                  >
                    {product.images.length > 0 && (
                      <Image
                        src={product.images[0].url}
                        width={40}
                        height={40}
                        alt={product.name}
                        className="h-8 w-8 rounded object-cover"
                      />
                    )}
                    <span>{product.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="ml-[8px]">
            <Button size="icon">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div> */}
        </div>
        <div className="flex items-center justify-between">
          <nav className="flex space-x-4 text-sm font-medium text-gray-700">
            {brands.map((brand) => (
              <Link
                href={`/brands/${brand}`}
                className="hover:text-primary"
                key={brand}
              >
                {brand}
              </Link>
            ))}
            {/* <a href="/category/2" className="hover:text-primary">
              Categoría 2
            </a> */}
          </nav>
          <div className="relative flex items-center space-x-4">
            <CartInfo />
            {/* <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {totalProducts > 0 && (
                <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {totalProducts}
                </span>
              )}
            </Link> */}
            {session && session.user?.email ? (
              <UserDropDownMenu session={session} />
            ) : (
              // <Link href="/auth/signout">

              // </Link>
              <Link href="/auth/signin">
                <User className="h-6 w-6" />
                <span className="sr-only">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
