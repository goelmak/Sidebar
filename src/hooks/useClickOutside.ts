import { useEffect, useRef } from "react";

const useClickOutside = (handler: () => void) => {
  const domNode = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (domNode.current && !domNode.current.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return domNode;
};

export default useClickOutside;
