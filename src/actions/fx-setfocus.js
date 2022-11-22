import {AbstractAction} from "./abstract-action";
import {resolveId} from "../xpath-evaluation";

/**
 * `fx-setfocus`
 * Set the focus to a target control optionally selecting eventual value in case a `select` attribute is given.
 *
 * @customElement
 */
export class FxSetfocus extends AbstractAction {
  connectedCallback() {
      super.connectedCallback();
      this.control = this.hasAttribute('control') ? this.getAttribute('control') : null;
  }

  perform() {
      console.log('setting focus', this.control);
      // super.perform();
      const selector = '#'+this.control;

      let targetElement = this.getOwnerForm().querySelector(selector);;

      // ### focus action is itself hosted within a repeat
      const parentIItem = this.closest('fx-repeatitem');
      if(parentIItem){
          console.log('parentRepeat',parentIItem);
          targetElement = parentIItem.querySelector(selector);
          this._focus(targetElement);
          return;
      }

      // ### the target element is hosted within a repeat
      const repeatitem = targetElement.closest('fx-repeatitem, .fx-repeatitem');
      if(repeatitem){
        // targetElement is repeated
        // get the active repeatitem (only for fx-repeat for now - todo: support repeat attributes
        const repeat = repeatitem.parentNode;
        targetElement = repeat.querySelector('[repeat-index] ' + selector);
      }

      this._focus(targetElement);
      if(this.hasAttribute('select')){
          this._select(targetElement);
      }
  }

    _focus(targetElement){
        if(targetElement){
            targetElement.getWidget().focus();
        }
    }

    _select(targetElement){
        if(targetElement){
            targetElement.getWidget().select();
        }
    }

}


if (!customElements.get('fx-setfocus')) {
  window.customElements.define('fx-setfocus', FxSetfocus);
}
