# xtal-fragment

xtal-fragment is a web component that is similar to [carbon-copy](https://github.com/bahrus/carbon-copy) with one significant difference -- xtal-fragment specializes in creating a "virtual grouping" of components, rather than a nested parent/child grouping.  It also eschews ShadowDOM completely, as xtal-fragment is not focused on working with style encapsulation.

The name of the component draws inspiration from [React fragments](https://mariusschulz.com/blog/jsx-fragment-syntax-in-typescript#:~:text=A%20fragment%20lets%20us%20group%20multiple%20JSX%20elements,React.Fragment%20instead%20of%20using%20the%20new%20JSX%20syntax%3A), and there is perhaps a small overlap in goals between the two.

## Syntax [TODO]

```html
<template id=ionic-crystals>
  <li>potassium chloride</li>
  <li>potassium fluoride</li>
</template>

<template id=covalent-crystals>
  <li>diamond</li>
  <li>carbide</li>
</template>

<ul>
  <xtal-fragment copy from=./ionic-crystals></xtal-fragment>
  <xtal-fragment copy from=./covalent-crystals></xtal-fragment>
</ul>
```

produces:

```html
<template id=ionic-crystals>
  <li>potassium chloride</li>
  <li>potassium fluoride</li>
</template>

<template id=covalent-crystals>
  <li>diamond</li>
  <li>carbide</li>
</template>

<ul>
  <xtal-fragment copy from=./ionic-crystals style=display:none></xtal-fragment>
  <li>potassium chloride</li>
  <li>potassium fluoride</li>  
  <xtal-fragment copy from=./covalent-crystals style=display:none></xtal-fragment>
  <li>diamond</li>
  <li>carbide</li>
</ul>
```

Deleting the xtal-fragment element causes the "ownedSiblings" to also part middle-DOM.

**NB:**  This component may not play well with other rendering libraries. For a rendering library to be compatible with this component, it must:

1.  Move the fragment owned by the xtal-fragment instance via newDestination.appendChild($0.extractContents()) where $0 is the instance of xtal-fragment.
2.  Skip over the owned siblings when updating the DOM, via $0.nextUnownedSibling where $0 is the instance of xtal-fragment.

## Vague Larger Problem Statement

Be able to develop a generic component like [e.g. xtal-props](https://github.com/bahrus/xtal-props) while adhering to goals of [metamorf](https://github.com/bahrus/metamorf)

For example, we want to wrap fields in categories.

So the natural thing is to use native fieldset, that's what it is designed for.

Or maybe later we want to "dependency inject" some other, more sophisticated fieldset equivalent that does what fieldset does, but better, following some design library "language."  Do so without rewriting the host component (xtal-props).

We could use a wrapper element, but we end with up with deeply nested components just to signify minor enhancements and/or plug'n'play, rather than true parent child relationship.  And/or too much unnecessary shadow dom.

Maybe we want an expandable fieldset, represented by a [decorator](https://github.com/bahrus/xtal-deco):

```html
<make-fieldset-expandable></make-fieldset-expandable>
<fieldset>
    <legend>My Legend</legend>
</fieldset>
```

How can we do the equivalent of dependency injection, where we have "interfaces" where we centralize the pain as far as mapping these interfaces to implementations?

Instead of web component wrapper, use templates, with the help of a reusable element [xtal-wrap](https://github.com/bahrus/xtal-wrap):

```html
<template id=my-field-category-holder>
<make-fieldset-expandable></make-fieldset-expandable>
<fieldset>
  <legend><slot name=label></slot></legend>
  <slot name=field-container>
</fieldset>
</template>

<xtal-wrap import from=my-field-category-holder -my-grid-element-proxy -my-chart-element-proxy>
    <h3 slot=label>My Legend</h3>
    <my-grid slot=field-container></my-grid>
    <my-chart slot=field-container></my-chart>
</xtal-wrap>
```

generates:

```html
<xtal-wrap style=display:none import from=my-field-category-holder -my-grid-element-proxy -my-chart-element-proxy></xtal-wrap>
<make-fieldset-expandable></make-fieldset-expandable>
<fieldset>
  <legend><h3 slot=label>My Legend</h3></legend>
  <my-grid slot=field-container></my-grid>
  <my-chart slot=field-container></my-chart>
</fieldset>
```

Here the "interface" is the identifier: my-field-category-holder.

The "from" attribute can look for an id in the same shadowDOM, **or** it can look for a property of the host element, which dependency injects the desired template.  The latter takes precedence.

If you delete xtal-wrap, it automatically deletes make-fieldset-expandable, fieldset.

Exposes method extractContents() for moving.

How does xtal-fragment fit in?

xtal-wrap extends xtal-fragment.

xtal-fragment just overrides appendChild, to make the children appended become siblings.  No support for  copy from, or proxying.

Maybe [sceadu-fæx](https://github.com/bahrus/sceadu-fax) extends xtal-fragment, with support for slots, and xtal-wrap extends sceadu-fæx?

Only support one level of slotting.  Would nested xtal-wrap's be able to take care of multi-level slotting?
