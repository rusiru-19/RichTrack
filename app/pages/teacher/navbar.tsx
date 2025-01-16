import Link from "next/link";
import { useRouter } from 'next/navigation';
const Navbar = () => {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/');
    
  }
  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">S-tracker</div>
        <ul className="flex-grow">
          <li className="p-4 hover:bg-gray-700">
            <Link href="/pages/student/dashboard">Dashboard</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/pages/student/profile">Profile</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/settings">Settings</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
           <button onClick={logout}>logout</button>
          </li>
        </ul>

      </nav>

    </div>
  );
};

export default Navbar;
