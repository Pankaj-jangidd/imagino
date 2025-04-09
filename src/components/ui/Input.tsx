import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  type?: string
}

const Input = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    const resize = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
      }
    }

    React.useEffect(() => {
      resize()
    }, [props.value])

    return (
      <textarea
        className={cn(
          "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={(node) => {
          textareaRef.current = node
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node
          }
        }}
        {...props}
        onInput={(e) => {
          if (props.onInput) props.onInput(e)
          resize()
        }}
        style={{ overflow: "hidden" }}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }
