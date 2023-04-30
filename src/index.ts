import './elements/board';

import {LitElement, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {html} from 'lit-html';

@customElement('e-container')
class EContainer extends LitElement {
  static get styles() {
    return css` 
      :host {
        padding: 8px;
        display: flex;
        flex-wrap: wrap;
      }
    `;
  }

  override render() {
    return html`
      <e-board></e-board>
    `;
  }
}

const container = new EContainer();
export let firstFullLoad = Promise.resolve();

async function initPages() {
  await container.updateComplete;
}

document.addEventListener('DOMContentLoaded', ()=> {
  document.body.appendChild(container);
  firstFullLoad = initPages();
});

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
  }
});
