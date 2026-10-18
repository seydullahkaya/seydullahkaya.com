import type { MDXComponents } from "mdx/types";

// @next/mdx için zorunlu dosya. Yazılarda özel bileşen gerekirse buraya eklenir.
const components: MDXComponents = {
  a: ({ href = "", ...props }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      />
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
