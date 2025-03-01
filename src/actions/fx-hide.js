import { Fore } from '../fore.js';
import { AbstractAction } from './abstract-action.js';
import { resolveId } from '../xpath-evaluation.js';

/**
 * `fx-hide`
 * hides a dialog
 *
 * @customElement
 * @demo demo/project.html
 */
export class FxHide extends AbstractAction {
  connectedCallback() {
    super.connectedCallback();
    this.dialog = this.getAttribute('dialog');
    if (!this.dialog) {
      Fore.dispatch(this, 'error', { message: 'dialog does not exist' });
    }
  }

  async perform() {
    const dialog = resolveId(this.dialog, this);
    dialog.hide();
    Fore.dispatch(dialog,'dialog-hidden',{})
  }
}

if (!customElements.get('fx-hide')) {
  window.customElements.define('fx-hide', FxHide);
}
