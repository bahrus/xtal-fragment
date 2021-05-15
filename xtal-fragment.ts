import {xc, PropDef, PropAction, PropDefMap, IReactor, ReactiveSurface} from 'xtal-element/lib/XtalCore.js';
import {upShadowSearch} from 'trans-render/lib/upShadowSearch.js';
import {insertAdjacentTemplate} from 'trans-render/lib/insertAdjacentTemplate.js';
export class XtalFragment extends HTMLElement implements ReactiveSurface{

    static is = 'xtal-fragment';

    self = this;
    propActions = propActions;
    reactor: IReactor = new xc.Rx(this);

    
    copy: boolean | undefined;

    from: string | undefined;

    connectedCallback(){
        this.style.display = 'none';
        xc.mergeProps(this, slicedPropDefs);
    }

    onPropChange(n: string, prop: PropDef, nv: any){
        this.reactor.addToQueue(prop, nv);
    }

    //TODO: mixin
    _retries = 0;
    ownedSiblings: WeakSet<Element> = new WeakSet<Element>();
    lastOwnedSibling: Element | undefined;
    disconnectedCallback(){
        if(!this._doNotCleanUp) this.ownedRange?.deleteContents();
    }
    get ownedRange(){
        if(this.lastOwnedSibling !== undefined){
            const range = document.createRange();
            range.setStartBefore(this.nextElementSibling!);
            range.setEndAfter(this.lastOwnedSibling);
            return range;
        }  
    }

    get nextUnownedSibling(){
        if(this.lastOwnedSibling !== undefined){
            return this.lastOwnedSibling.nextElementSibling;
        }
        return this.nextElementSibling;
    }

    _doNotCleanUp = false;
    extractContents(){
        this._doNotCleanUp = true;
        const range = document.createRange();
        range.setStartBefore(this);
        range.setEndAfter(this.lastOwnedSibling ?? this);
        return range.extractContents();
    }
}

export const loadFragment = ({copy, from, self}: XtalFragment) =>{
    const templ = upShadowSearch(self, from!);
    if(templ === null){
        if(self._retries === 0){
            self._retries = 1;
            setTimeout(() => loadFragment(self), 50);
            return;
        }else{
            console.error("Unable to locate " + from, self);
        }
    }else{
        self.ownedRange?.deleteContents();
        const appendages = insertAdjacentTemplate(templ as HTMLTemplateElement, self, 'afterend');
        self.lastOwnedSibling = appendages.pop();
    }
};

const propActions = [] as PropAction[];
const baseProp: PropDef = {
    async: true,
    dry: true
};
const propDefMap: PropDefMap<XtalFragment> = {
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
