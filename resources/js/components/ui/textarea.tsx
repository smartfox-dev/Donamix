import * as React from "react"
import { useState, } from 'react'

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    
    // const [chosenEmoji, setChosenEmoji] = useState(null);
    // const [textAreaValue, setTextAreaValue] = useState('');
    // const [selectedText, setSelectedText] = useState('');

    // const onEmojiClick = (event, emojiObject) => {
    //   const textAreaElement = document.getElementById('text-area');
    //   setTextAreaValue(
    //     textAreaValue.substr(0, textAreaElement.selectionStart) + 
    //     emojiObject.emoji + 
    //     textAreaValue.substr(textAreaElement.selectionEnd)
    //   )
    // }
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
