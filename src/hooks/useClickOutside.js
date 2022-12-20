import { useEffect } from "react";

export default function useOnClickOutside(ref, isOpen, setIsOpen) {
  useEffect(() => {
    const handleOutsideClicks = (e) => {
      if (isOpen && ref?.current && !ref?.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClicks);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClicks);
    };
  }, [isOpen]);
}
