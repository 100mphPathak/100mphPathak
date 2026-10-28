import { Fragment } from "react";
import Image from "next/image";

const BRAND = /(Pathak100MPH|PATHAK100MPH)/;

// Renders editor text safely (React escapes everything): "\n" becomes <br />, and with
// `brand` the academy name gets the existing .brand-name span. No HTML is ever parsed.
export function T({ v, brand = false }) {
  return String(v ?? "")
    .split("\n")
    .map((line, i) => (
      <Fragment key={i}>
        {i > 0 && <br />}
        {brand
          ? line.split(BRAND).map((part, j) =>
              !part ? null : j % 2 ? <span className="brand-name" key={j}>{part}</span> : part,
            )
          : line}
      </Fragment>
    ));
}

// Image field: { src, alt, width, height }.
export function Img({ v, ...props }) {
  return <Image alt={v.alt} height={v.height} src={v.src} width={v.width} {...props} />;
}
