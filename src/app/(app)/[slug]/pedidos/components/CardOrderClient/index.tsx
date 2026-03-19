"use client";

import dynamic from "next/dynamic";

const CardOrder = dynamic(() => import("../CardOrder"), {
  ssr: false,
});

export default CardOrder;
