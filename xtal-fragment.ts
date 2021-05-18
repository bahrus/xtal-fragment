import {xc, PropDef, PropAction, PropDefMap, IReactor, ReactiveSurface} from 'xtal-element/lib/XtalCore.js';
import {upShadowSearch} from 'trans-render/lib/upShadowSearch.js';
import {insertAdjacentTemplate} from 'trans-render/lib/insertAdjacentTemplate.js';
import {applyMixins} from 'xtal-element/lib/applyMixins.js';
import {GroupedSiblings} from 'xtal-element/lib/GroupedSiblings.js';

export class XtalFragment extends HTMLElement implements ReactiveSurface{

    static is = 'xtal-fragment';

    self = this;
    propActions = propActions;
    reactor: IReactor = new xc.Rx(this);
    isVisual = false;
    
    copy: boolean | undefined;

    from: string | undefined;

    clonedTemplateCallback(clonedTemplate: DocumentFragment){
        this.createRefs(clonedTemplate);
    }

    connectedCallback(){
        if(!this.isVisual) {
            this.style.display = 'none';
        }
        xc.mergeProps(this, slicedPropDefs);
    }

    onPropChange(n: string, prop: PropDef, nv: any){
        this.reactor.addToQueue(prop, nv);
    }

    _retries = 0;
    disconnectedCallback(){
        if(!this._doNotCleanUp) this.groupedRange?.deleteContents();
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
        self.groupedRange?.deleteContents();
        const appendages = insertAdjacentTemplate(templ as HTMLTemplateElement, self, 'afterend', self.clonedTemplateCallback.bind(self));
        self.lastGroupedSibling = appendages.pop();
    }
};

const propActions = [loadFragment] as PropAction[];
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
xc.letThereBeProps(XtalFragment, slicedPropDefs, 'onPropChange');
applyMixins(XtalFragment, [GroupedSiblings]);

xc.define(XtalFragment);

export interface XtalFragment extends GroupedSiblings{}




