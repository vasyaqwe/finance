import { tv, type VariantProps } from "tailwind-variants"

const loading = tv({
   base: ["relative block animate-spin opacity-85"],
   variants: {
      size: {
         sm: "size-[17px]",
         md: "size-[18px]",
         lg: "size-[19px]",
         xl: "size-[20px]",
      },
   },
   defaultVariants: {
      size: "md",
   },
})

interface Props
   extends React.ComponentProps<"svg">,
      VariantProps<typeof loading> {}

export function Loading({ className, size, ...props }: Props) {
   return (
      <svg
         viewBox="0 0 16 16"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         data-slot="loading"
         className={loading({ size, className })}
         {...props}
      >
         <circle
            cx="8"
            cy="8"
            r="7"
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="2.25"
         />
         <circle
            cx="8"
            cy="8"
            r="7"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeDasharray="45"
            strokeDashoffset="30"
         />
      </svg>
   )
}
