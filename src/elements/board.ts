import './grid';

import {LitElement, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {html} from 'lit-html';

@customElement('e-board')
export class EBoard extends LitElement {
  static get styles() {
    return css``;
  }
  override render() {
    return html`
      <e-grid .sizs=100></e-grid>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-board': EBoard;
  }
}
