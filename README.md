# xtal-fragment

Problem statement

Develop a generic component like [e.g. xtal-props](https://github.com/bahrus/xtal-props) while adhering to goals of [metamorf](https://github.com/bahrus/metamorf)

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

<xtal-wrap copy from=my-field-category-holder -my-grid-element-proxy -my-chart-element-proxy>
    <h3 slot=label>My Legend</h3>
    <my-grid slot=field-container></my-grid>
    <my-chart slot=field-container></my-chart>
</xtal-wrap>
```

generates:

```html
<xtal-wrap style=display:none copy from=my-field-category-holder -my-grid-element-proxy -my-chart-element-proxy></xtal-wrap>
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

Only support one level of slotting.  Would nested xtal-wraps be able to take care of multi-level slotting?
