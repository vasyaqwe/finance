export const device = () => {
   if (typeof navigator !== "undefined") {
      const userAgent = navigator.userAgent
      if (
         /android|ipad|iphone|ipod|blackberry|windows phone/i.test(userAgent)
      ) {
         return "mobile"
      }
      return "desktop"
   }
   return "desktop"
}
