import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { INLINE_LINK, SAFE_HREF } from "./shape";

const BRAND = /(Pathak100MPH|PATHAK100MPH)/;
const LINK_SPLIT = new RegExp(INLINE_LINK.source); // non-global copy for split()

// Renders editor text safely (React escapes everything): "\n" becomes <br />,
// [label](/path) becomes a link when the target is safe, and with `brand` the academy
// name gets the existing .brand-name span. No HTML is ever parsed.
export function T({ v, brand = false }) {
  return String(v ?? "")
    .split("\n")
    .map((line, i) => (
      <Fragment key={i}>
        {i > 0 && <br />}
        {splitLinks(line).map((part, j) =>
          typeof part === "string" ? (
            <Fragment key={j}>{brand ? withBrand(part) : part || null}</Fragment>
          ) : (
            <Link href={part.href} key={j}>{part.label}</Link>
          ),
        )}
      </Fragment>
    ));
}

function splitLinks(line) {
  const bits = line.split(LINK_SPLIT); // [text, label, href, text, label, href, text]
  const parts = [];
  for (let k = 0; k < bits.length; k += 3) {
    parts.push(bits[k]);
    if (k + 2 < bits.length) parts.push(SAFE_HREF.test(bits[k + 2]) ? { label: bits[k + 1], href: bits[k + 2] } : bits[k + 1]);
  }
  return parts;
}

const withBrand = (text) =>
  text.split(BRAND).map((part, j) => (!part ? null : j % 2 ? <span className="brand-name" key={j}>{part}</span> : part));

// Image field: { src, alt, width, height }.
export function Img({ v, ...props }) {
  return <Image alt={v.alt} height={v.height} src={v.src} width={v.width} {...props} />;
}
