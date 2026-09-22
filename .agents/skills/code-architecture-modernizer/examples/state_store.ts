/**
 * GameStateStore.ts — Trấn Quốc Phò Mã Gia
 * 
 * Reactive Master State Container với Event Subscriptions & History Rollback.
 * Đảm bảo Zero State Inconsistency giữa 4 tầng chơi.
 */

export interface MasterGameState {
  currentView: 'vn' | 'map' | 'battle';
  currentChapterId: number;

  unlocked: {
    gacha: boolean;
    zhaoyun: boolean;
    soap: boolean;
    strategyMap: boolean;
    gaoshun: boolean;
    giaHu: boolean;
    flood: boolean;
    khaiNguyen: boolean;
    battleFront: boolean;
  };

  // Resources
  ticketCount: number;
  jade: number;
  suspicion: number; // 0 - 100%
  gold: number;
  food: number;
  ap: number;
  maxAp: number;

  // Gacha State
  pityCount: number;
  hasWon5050: boolean;
  ownedHeroIds: string[];
  selectedInspectorHeroId: string | null;

  // Combat State
  turn: number;
  mana: number;
  maxMana: number;
  playerMorale: number;
  enemyMorale: number;
  wallHp: number;
  maxWallHp: number;
  reservoirStage: number;
}

type StateListener = (newState: MasterGameState, oldState: MasterGameState) => void;

export class GameStateStore {
  private state: MasterGameState;
  private listeners: Set<StateListener> = new Set();
  private history: MasterGameState[] = [];

  constructor(initialState: MasterGameState) {
    this.state = structuredClone(initialState);
  }

  public getState(): Readonly<MasterGameState> {
    return this.state;
  }

  public setState(updater: Partial<MasterGameState> | ((prev: MasterGameState) => Partial<MasterGameState>)): void {
    const oldState = structuredClone(this.state);
    const changes = typeof updater === 'function' ? updater(this.state) : updater;

    this.history.push(oldState);
    if (this.history.length > 50) this.history.shift(); // Giữ tối đa 50 bước hoàn tác

    this.state = {
      ...this.state,
      ...changes,
      unlocked: {
        ...this.state.unlocked,
        ...(changes.unlocked || {})
      }
    };

    this.notify(this.state, oldState);
  }

  public subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(newState: MasterGameState, oldState: MasterGameState): void {
    for (const listener of this.listeners) {
      try {
        listener(newState, oldState);
      } catch (err) {
        console.error('[GameStateStore] Error in listener callback:', err);
      }
    }
  }

  public rollback(): boolean {
    const prevState = this.history.pop();
    if (!prevState) return false;
    const oldState = this.state;
    this.state = prevState;
    this.notify(this.state, oldState);
    return true;
  }
}
