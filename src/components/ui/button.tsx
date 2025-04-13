import clsx from 'clsx'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'flex items-center justify-center rounded-md transition-colors duration-300 font-roboto', 
  variants: {
    variant: {
      default: 'hover:bg-primary text-background bg-primary/80',   
      outline: 'border-2 border-secundary text-primary bg-background hover:bg-white/20',  
      ghost: 'text-text hover:bg-gray-100',  
    },
    size: {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
})

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(button({ variant, size }), className, "cursor-pointer")}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
