export function SuccessMessage() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 bg-gray-200 rounded-full" />
      <h1 className="text-3xl font-bold text-center">
        Your password has been successfully reset
      </h1>
    </div>
  )
}