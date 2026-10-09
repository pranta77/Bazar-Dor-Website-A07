import React from "react";
import MarqueeText from "react-marquee-text";

const Marquee = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/bazardor/products`);
  const data = await res.json();
  

  return (
    <div>
      <MarqueeText
        className="min-w-0 flex-1 p-1.5"
        direction="right"
        duration={10}
        pauseOnHover={true}
      >
        {data.map((heading) => (
          <span key={heading.id} className="whitespace-nowrap mx-3">
            <span className="">{heading.image}</span>
            <span>{heading.nameBn}</span>
            <span className="mx-2">{heading.today} টাকা/কেজি</span>
            <span>🔺{heading.change.pct}</span>
          </span>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
