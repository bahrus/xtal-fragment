import {XtalFragment, loadFragment} from './xtal-fragment.js';
import {xc} from 'xtal-element/lib/XtalCore.js';
export class SceaduFæx extends XtalFragment{
    static is = 'sceadu-fæx';
    isVisual = true;
    clonedTemplateCallback(clonedTemplate: DocumentFragment){

    }
    lightTemplate: HTMLTemplateElement | undefined;
    connectedCallback(){
        super.connectedCallback();
        const sr = this.attachShadow({mode:'open'});
        sr.innerHTML = "<slot></slot>";
        sr.addEventListener('slotchange', e => {
            console.log(e);
        });
    }

}
export const loadFragmentWithSlots = ({copy, from, self, lightTemplate}: SceaduFæx) => {
    
};
xc.define(SceaduFæx);

