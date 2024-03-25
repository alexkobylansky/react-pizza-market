import React from "react"
import ContentLoader from "react-content-loader"

export const PizzaBlockSkeleton = (props: any) => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={465}
      viewBox="0 0 280 465"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="138" cy="116" r="116"/>
      <rect x="0" y="249" rx="10" ry="10" width="280" height="32"/>
      <rect x="0" y="405" rx="10" ry="10" width="91" height="30"/>
      <rect x="121" y="396" rx="25" ry="25" width="152" height="45"/>
    </ContentLoader>
  )
};