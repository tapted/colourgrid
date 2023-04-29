import './elements/board';

import {LitElement, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {html} from 'lit-html';

@customElement('e-container')
class EContainer extends LitElement {
  static get styles() {
    return css` 
      :host {
        padding: 0px;
        display: flex;
        flex-wrap: wrap;
      }
      ul {
        column-count: 4;
        list-style-type: none;
        margin: 8px;
        padding-inline-start: 8px;
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
