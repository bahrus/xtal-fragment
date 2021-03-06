import { xc } from 'xtal-element/lib/XtalCore.js';
import { upShadowSearch } from 'trans-render/lib/upShadowSearch.js';
//import {insertAdjacentTemplate} from 'trans-render/lib/insertAdjacentTemplate.js';
import { applyMixins } from 'xtal-element/lib/applyMixins.js';
import { GroupedSiblingsWithRefs } from 'xtal-element/lib/GroupedSiblingsWithRefs.js';
import { GroupedSiblings } from 'xtal-element/lib/GroupedSiblings.js';
import { insertAdjacentFragment } from './insertAdjacentFragment.js';
export class XtalFragment extends HTMLElement {
    constructor() {
        super(...arguments);
        this.self = this;
        this.propActions = propActions;
        this.reactor = new xc.Rx(this);
        this.isVisual = false;
        this._retries = 0;
    }
    clonedTemplateCallback(clonedTemplate) {
        this.createRefs(clonedTemplate);
    }
    cloneTemplate(templ) {
        return templ.content.cloneNode(true);
    }
    connectedCallback() {
        if (!this.isVisual) {
            this.style.display = 'none';
        }
        xc.mergeProps(this, slicedPropDefs);
    }
    onPropChange(n, prop, nv) {
        this.reactor.addToQueue(prop, nv);
    }
    disconnectedCallback() {
        if (!this._doNotCleanUp)
            this.groupedRange?.deleteContents();
    }
}
XtalFragment.is = 'xtal-fragment';
export const loadFragment = ({ copy, from, self }) => {
    const templ = upShadowSearch(self, from);
    if (templ === null) {
        if (self._retries === 0) {
            self._retries = 1;
            setTimeout(() => loadFragment(self), 50);
            return;
        }
        else {
            console.error("Unable to locate " + from, self);
        }
    }
    else {
        self.groupedRange?.deleteContents();
        const appendages = insertAdjacentFragment(self.cloneTemplate(templ), self, 'afterend');
        self.lastGroupedSibling = appendages.pop();
    }
};
const propActions = [loadFragment];
const baseProp = {
    async: true,
    dry: true
};
const propDefMap = {
    copy: {
        async: true,
        type: Boolean,
        stopReactionsIfFalsy: true,
    },
    from: {
        ...baseProp,
        type: String,
        stopReactionsIfFalsy: true,
    }
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(XtalFragment, slicedPropDefs, 'onPropChange');
applyMixins(XtalFragment, [GroupedSiblingsWithRefs, GroupedSiblings]);
xc.define(XtalFragment);
