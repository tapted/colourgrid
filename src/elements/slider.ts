import {LitElement, css} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {html} from 'lit-html';

@customElement('e-slider')
export class Slider extends LitElement {
  @query('#range-input', true) rangeInput!: HTMLInputElement;

  @property({type: Number}) min = 1;
  @property({type: Number}) max = 30;
  @property({type: Number}) value = 10;
  @property({type: Number}) step = 1;

  static get styles() {
    return css`
      :host {
        display: flex;
      }
      #range-input {
        flex: 1;
      }
      #text-input {
        width: 3em;
      }
    `;
  }

  private onInput(e: InputEvent) {
    let inputVal = Number((e.target as HTMLInputElement).value) ?? 0;
    if (inputVal < this.min) {
      inputVal = this.min;
    }
    if (inputVal > this.max) {
      inputVal = this.max;
    }
    this.value = inputVal;
    this.dispatchEvent(new CustomEvent('slider-input',
        {bubbles: true, composed: true}));
  }

  override render() {
    return html`
      <input
          type="range"
          id="range-input"
          min=${this.min}
          max=${this.max}
          value=${this.value}
          step=${this.step}
          @input=${this.onInput}>
      <input
          id="text-input"
          type="text"
          value=${this.value}
          @input=${this.onInput}>       
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-slider': Slider;
  }
}
