import React from "react";
import MarqueeText from "react-marquee-text";

const toBn = (n) => Number(n).toLocaleString("bn-BD");

const UNITS = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };

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
          <span
            key={heading.id}
            className="mx-3 inline-flex items-center gap-1.5 whitespace-nowrap text-sm"
          >
            <span>{heading.image}</span>
            <span className="font-semibold text-gray-900">{heading.nameBn}</span>
            <span className="text-gray-500">
              {toBn(heading.today)} টাকা/{UNITS[heading.unit] ?? heading.unit}
            </span>
            <span
              className={`font-semibold ${
                heading.change.dir === "up"
                  ? "text-red-600"
                  : heading.change.dir === "down"
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {heading.change.dir === "up" && "▲"}
              {heading.change.dir === "down" && "▼"}
              {heading.change.dir === "flat" && "—"}{" "}
              {toBn(Math.abs(heading.change.pct).toFixed(1))}%
            </span>
          </span>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;