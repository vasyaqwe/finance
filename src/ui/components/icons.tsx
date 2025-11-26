import { ArrowLeft, Check, MoreHoriz, NavArrowDownSolid } from "iconoir-react"

type IconProps = React.ComponentProps<"svg">

export const Icons = {
   chevronUpDown: (props: IconProps) => (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
         {...props}
      >
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
         />
      </svg>
   ),
   check: (props: IconProps) => (
      <Check
         strokeWidth={2}
         {...props}
      />
   ),
   ellipsis: (props: IconProps) => (
      <MoreHoriz
         className="size-6!"
         strokeWidth={2.5}
         {...props}
      />
   ),
   chevronDown: (props: IconProps) => (
      <NavArrowDownSolid
         strokeWidth={2.5}
         {...props}
      />
   ),
   arrowLeft: (props: IconProps) => (
      <ArrowLeft
         strokeWidth={2}
         {...props}
      />
   ),
   pencil: (props: IconProps) => (
      <svg
         viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path
            d="M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </svg>
   ),
   pencilLine: (props: IconProps) => (
      <svg
         viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path
            d="M4 20.0001H20M4 20.0001V16.0001L12 8.00012M4 20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </svg>
   ),
   list: (props: IconProps) => (
      <svg
         viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path
            d="M4 6H20M4 12H20M4 18H20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </svg>
   ),
   lines: (props: IconProps) => (
      <svg
         className="mx-auto mb-3 size-12"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 18 18"
         {...props}
      >
         <g fill="currentColor">
            <path
               d="M1.75 9.881C1.75 9.881 5.824 5.674 8.142 3.85C9.692 2.631 10.605 2.511 11.167 3.072C12.192 4.093 10.76 5.99 8.809 8.584C6.858 11.178 5.446 12.666 6.515 13.675C7.57 14.671 9.752 12.443 10.565 11.535C11.378 10.627 13.234 8.613 14.143 9.46C14.948 10.21 13.753 12.022 13.33 12.832C12.907 13.642 12.387 14.478 13.005 15.037C13.879 15.828 15.25 14.161 15.25 14.161"
               stroke="currentColor"
               strokeLinecap="round"
               strokeLinejoin="round"
               fill="none"
            />
         </g>
      </svg>
   ),
}
