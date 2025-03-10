<<<<<<< HEAD
export function Textarea({ placeholder, className = "", ...props }: { placeholder: string; className?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
      <textarea
        className={`w-full p-2 border rounded-md focus:ring focus:ring-blue-300 ${className}`}
        placeholder={placeholder}
        {...props}
      ></textarea>
    );
  }
  
=======
import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
>>>>>>> 87c1173 (add UI teacher/course/details)
