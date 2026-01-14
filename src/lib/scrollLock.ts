let previousOverflow = "";
let previousPadding = "";
let scrollLockCount = 0;

export const lockScroll = () => {
  scrollLockCount += 1;
  if (scrollLockCount > 1) return;
  previousOverflow = document.body.style.overflow;
  previousPadding = document.body.style.paddingRight;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
};

export const unlockScroll = () => {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount > 0) return;
  document.body.style.overflow = previousOverflow;
  document.body.style.paddingRight = previousPadding;
};
