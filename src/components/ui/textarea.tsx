export function Textarea({ placeholder, className = "", ...props }: { placeholder: string; className?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
      <textarea
        className={`w-full p-2 border rounded-md focus:ring focus:ring-blue-300 ${className}`}
        placeholder={placeholder}
        {...props}
      ></textarea>
    );
  }
  