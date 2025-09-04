

function FilterBar() {
  return (
    <div className="flex items-center justify-between border-b pb-2">
      <div className="space-x-6 text-sm">
        <button className="font-semibold border-b-2 border-black pb-1">Print</button>
        <button className="hover:text-black text-gray-500">E-books</button>
        <button className="hover:text-black text-gray-500">Audio</button>
        <button className="hover:text-black text-gray-500">All</button>
      </div>
      <div className="text-sm text-gray-700">Filters ▾</div>
    </div>
  );
}

export default FilterBar;
