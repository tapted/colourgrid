import './grid';
import './slider';

import {COLORS, EGrid} from './grid';
import {LitElement, css} from 'lit';
import {customElement, query} from 'lit/decorators.js';
import {Slider} from './slider';
import {html} from 'lit-html';
import {styleMap} from 'lit-html/directives/style-map.js';

@customElement('e-board')
export class EBoard extends LitElement {
  @query('e-grid') grid!: EGrid;
  @query('e-slider') slider!: Slider;

  static get styles() {
    return css`
      :host {
        align-items: center;
        display: flex;
        flex-direction: column;
      }
      fieldset {
        border: none;
        display: grid;
        min-width: 80%;
        max-width: 100%;
        grid-template-columns: repeat(8, minmax(0, 1fr));
      }
      e-slider {
        width: 80vw;
      }
      .e-button {
        position: relative;
        flex: 1;
      }
      .e-button input {
        position: absolute;
        opacity: 0;
      }
      .e-button .button-label {
        display: inline-block;
        background: #ddd;
        border-radius: 1em;
        border: 1px solid #bbb;
        border-bottom: solid 4px #bbb;
        padding: 10px;
        margin-top: 0;
        vertical-align: bottom;
        cursor: pointer;
        font-family: sans-serif;
        text-overflow: ellipsis;
        font-size: 14px;
        font-weight: 800;
        overflow: hidden;
        whitespace: nowrap;
        margin: 4px;
        width: 50%;
        text-align: center;
        user-select: none;
      }

      .e-button :checked + .button-label {
        border-bottom: solid 1px #bbb;
        transform: translate(4px, 4px);
      }
    `;
  }

  private onSizeChange(event: InputEvent) {
    this.grid.size = this.slider.value;
  }

  private onColorChange(color: string) {
    this.grid.color = color;
  }

  private renderColorButton(color: string, textColor = 'black') {
    const style = {
      backgroundColor: color,
      color: textColor,
    };
    return html`
      <label class="e-button">
        <input
            @change=${() => this.onColorChange(color)}
            type="radio"
            name="color-button">
        <span class="button-label" style=${styleMap(style)}>
          ${color}
        </span>
      </label>`;
  }

  override render() {
    return html`
      <e-slider min=1 max=30 value=10 @slider-input=${this.onSizeChange}>
      </e-slider>
      <fieldset>
        ${COLORS.map((c) => this.renderColorButton(...c))}
      </fieldset>
      <e-grid></e-grid>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-board': EBoard;
  }
}
