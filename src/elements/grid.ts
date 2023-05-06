import {LitElement, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {html} from 'lit-html';
import {styleMap} from 'lit-html/directives/style-map.js';

export const COLORS: Array<[string, string]> = [
  ['white', 'black'],
  ['red', 'black'],
  ['orange', 'black'],
  ['yellow', 'black'],
  ['green', 'white'],
  ['blue', 'yellow'],
  ['indigo', 'white'],
  ['violet', 'black'],
  ['grey', 'black'],
  ['black', 'white'],
  ['lightgrey', 'black'],
  ['cyan', 'black'],
  ['lightgreen', 'black'],
  ['darkgreen', 'white'],
];

let debugElement: HTMLDivElement|null = null;
function debug(s: string) {
  if (!debugElement) {
    debugElement = document.body.appendChild(document.createElement('div'));
  }
  debugElement.innerText = s;
}

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
      touch-action: none;
    }
    div {
      border: 1px solid black;
      aspect-ratio: 1 / 1;
      width: calc(90vw / var(--size, 8));
      box-sizing: border-box;
      touch-action: none;
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
    event.preventDefault();
    if (event.pointerType === 'mouse' && event.buttons === 0) {
      return;
    }
    if (event.pointerType !== 'mouse') {
      const rect = this.getBoundingClientRect();
      let x = event.pageX - rect.x;
      let y = event.pageY - rect.y;
      if (x < 0 || x > rect.width) return;
      if (y < 0 || y > rect.height) return;
      x = Math.floor(x / rect.width * this.size);
      y = Math.floor(y / rect.height * this.size);
      index = x * this.size + y;
    }
    if (!event.isPrimary || index === this.lastMoveIndex) {
      return;
    }
    this.lastMoveIndex = index;
    this.onCellClick(index);
    event.stopPropagation();
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
