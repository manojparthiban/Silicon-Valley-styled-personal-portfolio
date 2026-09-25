/** Space kept between the floating nav bar and the section heading we land on */
const GAP = 20;

/**
 * Document offset from layout (offsetTop chain). Unlike getBoundingClientRect this
 * ignores CSS transforms, so a heading still mid entrance-animation (shifted down
 * until it reveals) doesn't throw the landing position off.
 */
const layoutTop = (el: HTMLElement) => {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
};

/**
 * Smooth-scroll so a section's heading sits just below the floating nav bar,
 * instead of hiding underneath it. `hero` scrolls to the very top.
 */
export function scrollToSection(id: string) {
  if (id === "hero") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const section = document.getElementById(id);
  if (!section) return;

  // Land on the section's header (skips the section's own top padding)
  const target = section.querySelector<HTMLElement>(".sec-head") ?? section;

  // Nav bar: fixed top offset + its condensed height (it condenses once scrolled)
  const nav = document.querySelector<HTMLElement>(".nav");
  const bar = document.querySelector<HTMLElement>(".nav__bar");
  const navTop = nav ? parseFloat(getComputedStyle(nav).top) || 0 : 0;
  const navHeight = bar ? Math.min(bar.offsetHeight, 52) : 0;

  const top = layoutTop(target) - navTop - navHeight - GAP;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}
