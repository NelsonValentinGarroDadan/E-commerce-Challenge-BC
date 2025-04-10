// app/components/ui/button.tsx
import clsx from 'clsx'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'flex items-center justify-center rounded-md ...',
  variants: {
    variant: {
      default: 'bg-black text-white hover:bg-black/80',
      outline: 'border border-gray-300 text-black hover:bg-gray-100',
      ghost: 'text-black hover:bg-gray-100',
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
        className={clsx(button({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
