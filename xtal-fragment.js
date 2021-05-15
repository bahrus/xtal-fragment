import { xc } from 'xtal-element/lib/XtalCore.js';
import { upShadowSearch } from 'trans-render/lib/upShadowSearch.js';
import { insertAdjacentTemplate } from 'trans-render/lib/insertAdjacentTemplate.js';
export class XtalFragment extends HTMLElement {
    constructor() {
        super(...arguments);
        this.self = this;
        this.propActions = propActions;
        this.reactor = new xc.Rx(this);
        //TODO: mixin
        this._retries = 0;
        this.ownedSiblings = new WeakSet();
        this._doNotCleanUp = false;
    }
    connectedCallback() {
        this.style.display = 'none';
        xc.mergeProps(this, slicedPropDefs);
    }
    onPropChange(n, prop, nv) {
        this.reactor.addToQueue(prop, nv);
    }
    disconnectedCallback() {
        if (!this._doNotCleanUp)
            this.ownedRange?.deleteContents();
    }
    get ownedRange() {
        if (this.lastOwnedSibling !== undefined) {
            const range = document.createRange();
            range.setStartBefore(this.nextElementSibling);
            range.setEndAfter(this.lastOwnedSibling);
            return range;
        }
    }
    get nextUnownedSibling() {
        if (this.lastOwnedSibling !== undefined) {
            return this.lastOwnedSibling.nextElementSibling;
        }
        return this.nextElementSibling;
    }
    extractContents() {
        this._doNotCleanUp = true;
        const range = document.createRange();
        range.setStartBefore(this);
        range.setEndAfter(this.lastOwnedSibling ?? this);
        return range.extractContents();
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
        self.ownedRange?.deleteContents();
        const appendages = insertAdjacentTemplate(templ, self, 'afterend');
        self.lastOwnedSibling = appendages.pop();
    }
};
const propActions = [];
const baseProp = {
    async: true,
    dry: true
};
const propDefMap = {
    copy: {
        ...baseProp,
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
xc.define(XtalFragment);
