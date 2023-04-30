import {LitElement, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {html} from 'lit-html';
import {styleMap} from 'lit-html/directives/style-map.js';

const COLORS = [
  'white',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
  'grey',
  'black',
  'lightgrey',
];

@customElement('e-grid')
export class EGrid extends LitElement {
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
    }
    div {
      border: 1px solid black;
      aspect-ratio: 1 / 1;
      width: calc(90vw / var(--size, 8));
      box-sizing: border-box;
    }
    `;
  }

  private onCellClick(index: number) {
    const value = ((this.colors[index] ?? 0) + 1) % COLORS.length;
    this.colors[index] = value;
    this.requestUpdate();
  }

  private renderCell(index: number, colorIndex: number) {
    const style = {
      backgroundColor: COLORS[colorIndex],
    };
    return html`
      <div
          @click=${() => this.onCellClick(index)}
          style=${styleMap(style)}></div>`;
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
