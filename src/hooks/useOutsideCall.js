import { useEffect } from "react";

function useOutsideCall(ref, cb, exceptionId) {
  useEffect(() => {
    function handleOutsideClick(e) {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        e.target.id !== exceptionId
      ) {
        cb();
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [ref, cb]);
}

export default useOutsideCall;
