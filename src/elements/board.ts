import './grid';
import './slider';

import {LitElement, css} from 'lit';
import {customElement, query} from 'lit/decorators.js';
import {EGrid} from './grid';
import {Slider} from './slider';
import {html} from 'lit-html';

@customElement('e-board')
export class EBoard extends LitElement {
  @query('e-grid') grid!: EGrid;
  @query('e-slider') slider!: Slider;

  static get styles() {
    return css`
      e-slider {
        width: 80vw;
      }
    `;
  }

  private onSizeChange(event: InputEvent) {
    this.grid.size = this.slider.value;
  }

  override render() {
    return html`
      <e-slider min=1 max=30 value=10 @slider-input=${this.onSizeChange}>
      </e-slider>
      <e-grid></e-grid>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-board': EBoard;
  }
}
