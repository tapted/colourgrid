import {LitElement, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {html} from 'lit-html';
import {styleMap} from 'lit-html/directives/style-map.js';

export const COLORS: Array<[string, string]> = [
  ['white', 'black'],
  ['red', 'black'],
  ['orange', 'black'],
  ['yellow', 'black'],
  ['green', 'black'],
  ['blue', 'black'],
  ['indigo', 'white'],
  ['violet', 'black'],
  ['grey', 'black'],
  ['black', 'white'],
  ['lightgrey', 'black'],
  ['cyan', 'black'],
];

@customElement('e-grid')
export class EGrid extends LitElement {
  @property({attribute: false}) color = '';
  @property({attribute: false})
  get size(): number {
    return Number(this.style.getPropertyValue('--size')) || 8;
  }
  set size(value: number) {
    const oldSize = this.size;
    this.style.setProperty('--size', `${value}`);
    this.requestUpdate('size', oldSize);
  }

  colors: number[] = [];

  private lastMoveIndex = -1;

  constructor() {
    super();
    this.size = 5;
  }

  static get styles() {
    return css`
    :host {
      display: block;
      column-count: var(--size, 8);
      column-gap: 0;
      border: 1px solid black;
      user-select: none;
    }
    div {
      border: 1px solid black;
      aspect-ratio: 1 / 1;
      width: calc(90vw / var(--size, 8));
      box-sizing: border-box;
    }
    `;
  }

  private getColorIndex(index: number): number {
    const colorIndex = COLORS.findIndex(([c,]) => this.color == c);
    if (colorIndex >= 0) {
      return colorIndex;
    }
    return ((this.colors[index] ?? 0) + 1) % COLORS.length;
  }

  private onCellMove(event: PointerEvent, index: number) {
    if (!event.isPrimary || index === this.lastMoveIndex) {
      return;
    }
    if (event.pointerType === 'mouse' && event.buttons === 0) {
      return;
    }
    this.lastMoveIndex = index;
    this.onCellClick(index);
  }

  private onCellClick(index: number) {
    this.colors[index] = this.getColorIndex(index);
    this.requestUpdate();
  }

  private renderCell(index: number, colorIndex: number) {
    const style = {
      backgroundColor: COLORS[colorIndex][0],
    };
    return html`
      <div
          @pointermove=${(e: PointerEvent) => this.onCellMove(e, index)}
          @click=${() => this.onCellClick(index)}
          style=${styleMap(style)}
          draggable="false"></div>`;
  }

  override render() {
    const length = this.size * this.size;
    const cells = Array.from({length}, (v, k) => this.colors[k] ?? 0);
    return html`
      ${cells.map((c, i) => this.renderCell(i, c))}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-grid': EGrid;
  }
}
