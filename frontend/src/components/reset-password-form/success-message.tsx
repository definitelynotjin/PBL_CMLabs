interface SuccessMessageProps {
  success: string;
}

export function SuccessMessage({ success }: SuccessMessageProps) {
  return success ? <p className="text-green-500 text-sm">{success}</p> : null;
}