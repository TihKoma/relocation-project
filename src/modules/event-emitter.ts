type Subscriber<T> = (value?: T) => void
type RemoveListener = () => void
interface Listener<T> {
  addListener(f: Subscriber<T>): RemoveListener
}
export class Emitter<T> implements Listener<T> {
  private subscribers: Set<Subscriber<T>> = new Set()
  addListener(f: Subscriber<T>): RemoveListener {
    this.subscribers.add(f)
    return () => this.removeListener(f)
  }
  private removeListener(fOnRemove: Subscriber<T>) {
    this.subscribers.delete(fOnRemove)
  }
  emit(value?: T) {
    this.subscribers.forEach((f) => f(value))
  }
}
