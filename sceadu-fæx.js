import { XtalFragment } from './xtal-fragment.js';
import { xc } from 'xtal-element/lib/XtalCore.js';
export class SceaduFæx extends XtalFragment {
    constructor() {
        super(...arguments);
        this.isVisual = true;
    }
    clonedTemplateCallback(clonedTemplate) {
    }
    connectedCallback() {
        super.connectedCallback();
        const sr = this.attachShadow({ mode: 'open' });
        sr.innerHTML = "<slot></slot>";
        sr.addEventListener('slotchange', e => {
            console.log(e);
        });
    }
}
SceaduFæx.is = 'sceadu-fæx';
export const loadFragmentWithSlots = ({ copy, from, self, lightTemplate }) => {
};
xc.define(SceaduFæx);
