import Link from "next/link";
import { useRouter } from 'next/navigation';
const Navbar = () => {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/');
    
  }
  return (
<div className="flex min-h-screen" >
  <nav className="lg:w-64 md:w-48 w-32 bg-gray-800 text-white flex flex-col">
    <div className="p-4 text-xl font-bold border-b border-gray-700">S-tracker</div>
    <ul className="flex-grow">
      <li className="p-4 hover:bg-gray-700">
        <Link href="/pages/admin/dashboard">Dashboard</Link>
      </li>
      <li className="p-4 hover:bg-gray-700">
        <Link href="/pages/admin/students">Students</Link>
      </li>
      <li className="p-4 hover:bg-gray-700">
        <Link href="/pages/admin/clubs">Clubs</Link>
      </li>
      <li className="p-4 hover:bg-gray-700">
        <Link href="/pages/admin/settings">Settings</Link>
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
