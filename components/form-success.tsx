import { CheckCircle2 } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

const FormSuccess = ({
  message
}: FormSuccessProps) => {
  if (!message) return null
  
  return (
    <div className="bg-emerald-500/20 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircle2 size={20} />
      <p>{message}</p>
    </div>
  )
}

export default FormSuccess
