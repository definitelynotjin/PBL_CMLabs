import { Input } from '@/components/ui/input';
import { Bell } from 'lucide-react';

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ search, setSearch }) => {
  return (
    <div className="flex justify-between items-center border-b pb-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Employee Database</h1>
        <Input
          placeholder="Search"
          className="w-72"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-gray-600" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <div className="text-sm text-right leading-tight">
            <p className="font-medium">username</p>
            <p className="text-gray-500 text-xs">roles user</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;