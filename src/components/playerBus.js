/* Tiny pub/sub so the hero and any work card can open the same modal player. */
const bus = new EventTarget()

export function playerOpen(id) {
  bus.dispatchEvent(new CustomEvent("open", { detail: id }))
}

export function onPlayerOpen(handler) {
  bus.addEventListener("open", handler)
  return () => bus.removeEventListener("open", handler)
}
