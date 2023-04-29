import './grid';

import {LitElement, css} from 'lit';
import {customElement, query} from 'lit/decorators.js';
import {EGrid} from './grid';
import {html} from 'lit-html';

@customElement('e-board')
export class EBoard extends LitElement {
  @query('e-grid') grid!: EGrid;

  static get styles() {
    return css`
      input {
        width: 80vw;
      }
    `;
  }

  private onSizeChange(event: InputEvent) {
    const value = Number((event.target as HTMLInputElement).value);
    this.grid.size = value;
  }

  override render() {
    return html`
      <input type="range" min=1 max=30 value=10 step=1 @input=${this.onSizeChange}>
      <e-grid></e-grid>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-board': EBoard;
  }
}
