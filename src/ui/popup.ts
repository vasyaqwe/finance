import { tv } from "tailwind-variants"

export const popup = tv({
   slots: {
      transition:
         "origin-(--transform-origin) duration-[150ms,0ms] data-[ending-style]:scale-[98%] data-[starting-style]:scale-[98%] data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[instant]:duration-0",
      base: "scroll-py-1 rounded-(--popup-radius) bg-surface-1 p-(--popup-padding) shadow-xl outline-1 outline-neutral outline-offset-0 [--popup-radius:var(--radius-2xl)] md:[--popup-radius:var(--radius-xl)]",
      separator:
         "-mx-(--popup-padding) mt-0.5 mb-1 h-px w-[calc(100%+calc(var(--popup-padding)*2))] bg-neutral",
      groupLabel: "mx-2 my-1 text-muted text-sm",
   },
})
