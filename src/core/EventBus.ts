/**
 * EventBus.ts — Typed Event Emitter
 * Trấn Quốc Phò Mã Gia (镇国驸马爷)
 */

type Handler<T = any> = (payload: T) => void;

export class EventBus {
  private events: Map<string, Set<Handler>> = new Map();

  public on<T = any>(event: string, handler: Handler<T>): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event)!.add(handler);
    return () => this.off(event, handler);
  }

  public off<T = any>(event: string, handler: Handler<T>): void {
    const handlers = this.events.get(event);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.events.delete(event);
      }
    }
  }

  public emit<T = any>(event: string, payload?: T): void {
    const handlers = this.events.get(event);
    if (handlers) {
      for (const handler of handlers) {
        try {
          handler(payload);
        } catch (err) {
          console.error(`[EventBus] Error in event '${event}':`, err);
        }
      }
    }
  }
}
