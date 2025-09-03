import { useRef, onMounted } from "@odoo/owl";

export function useAutofocus(refName) {
  let refEl = useRef(refName);

  onMounted(() => {
    if (refEl.el) {
      refEl.el.focus();
    }
  });

  return refEl
}
