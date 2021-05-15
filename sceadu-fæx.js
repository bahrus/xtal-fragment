import { XtalFragment } from './xtal-fragment.js';
import { xc } from 'xtal-element/lib/XtalCore.js';
export class SceaduFæx extends XtalFragment {
    constructor() {
        super(...arguments);
        this.isVisual = true;
        this.propActions = propActions;
    }
    clonedTemplateCallback(clonedTemplate) {
    }
    connectedCallback() {
        super.connectedCallback();
        const sr = this.attachShadow({ mode: 'open' });
        sr.innerHTML = "<slot></slot>";
        const slot = sr.firstChild;
        sr.addEventListener('slotchange', e => {
            this.lightTemplate = slot.assignedElements()[0];
            //console.log(slot.assignedElements()[0]);
        });
    }
}
SceaduFæx.is = 'sceadu-fæx';
export const loadFragmentWithSlots = ({ copy, from, self, lightTemplate }) => {
    console.log(lightTemplate);
};
const propActions = [loadFragmentWithSlots];
const propDefMap = {
    lightTemplate: {
        type: Object,
        async: true,
        dry: true,
        stopReactionsIfFalsy: true,
    }
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(SceaduFæx, slicedPropDefs, 'onPropChange');
xc.define(SceaduFæx);
