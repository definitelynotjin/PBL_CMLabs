export default function LeaveSummary() {
  return (
    <div className="bg-white rounded-2xl shadow p-4 w-full">
      <div className="flex justify-between mb-2">
        <h2 className="text-lg font-bold">Leave Summary</h2>
        <select className="text-sm rounded-md border px-2 py-1"> 
          <option>Rentang Waktu</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p>Total Quota Annual Leave</p>
          <h3 className="text-xl font-bold">12 Days</h3>
          <button className="text-xs underline">Request Leave →</button>
        </div>
        <div>
          <p>Taken</p>
          <h3 className="text-xl font-bold">4 Days</h3>
          <button className="text-xs underline">See Details →</button>
        </div>
        <div>
          <p>Remaining</p>
          <h3 className="text-xl font-bold">8 Days</h3>
          <button className="text-xs underline">Request Leave →</button>
        </div>
      </div>
    </div>
  );
}
