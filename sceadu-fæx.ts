import {XtalFragment, loadFragment} from './xtal-fragment.js';
import {xc, PropAction, PropDefMap} from 'xtal-element/lib/XtalCore.js';
export class SceaduFæx extends XtalFragment{
    static is = 'sceadu-fæx';
    isVisual = true;
    propActions = propActions;
    clonedTemplateCallback(clonedTemplate: DocumentFragment){
        console.log(clonedTemplate);
    }
    lightTemplate: HTMLTemplateElement | undefined;
    connectedCallback(){
        super.connectedCallback();
        const sr = this.attachShadow({mode:'open'});
        sr.innerHTML = "<slot></slot>";
        const slot = sr.firstChild as HTMLSlotElement;
        sr.addEventListener('slotchange', e => {
            const assignedElements = slot.assignedElements();
            if(assignedElements.length === 0) return;
            const templ = assignedElements[0];
            if(templ.localName !== 'template') return;
            this.lightTemplate = templ as HTMLTemplateElement;
            templ.remove();
        });
    }

}
export const loadFragmentWithSlots = ({copy, from, self, lightTemplate}: SceaduFæx) => {
    loadFragment(self);
};
const propActions = [loadFragmentWithSlots] as PropAction[];
const propDefMap: PropDefMap<SceaduFæx> = {
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

