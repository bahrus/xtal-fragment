# xtal-fragment

Problem statement

Develop a generic component like [e.g. xtal-props](https://github.com/bahrus/xtal-props) while adhering to goals of [metamorf](https://github.com/bahrus/metamorf)

For example, we want to wrap fields in categories.

So the natural thing is to use native fieldset, that's what it is designed for.

But maybe we want to "dependency inject" some other, more sophisticated fieldset equivalent that does what fieldset does, but better, following some design library "language."

We could use a wrapper element, but we end with up with deeply nested components just to signify minor enhancements.  Or too much unnecessary shadow dom.

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

<xtal-wrap copy from=my-field-category-holder -my-grid-element-proxy -my-chart-element-proxy><template id="myFragment">
    <h3 slot=label>My Legend</h3>
    <my-grid slot=field-container></my-grid>
    <my-chart slot=field-container></my-chart>
</template></xtal-wrap>
```

generates:

```html
<xtal-wrap style=display:none copy from=my-field-category-holder -my-grid-element-proxy -my-chart-element-proxy></xtal-wrap>
<fieldset>
  <legend>My Legend</legend>
    <my-grid></my-grid>
    <my-chart></my-chart>
</fieldset>
```

The from can look for an id in the same shadowDOM, or it can look for a property of the host element, which dependency injects the desired template.

If you delete xtal-wrap, it automatically deletes fieldset.

Exposes method extractContents() for moving.

How does xtal-fragment fit in?

xtal-wrap extends xtal-fragment.

xtal-fragment just overrides appendChild, to make the children appended become siblings.  No support for  copy from, or proxying.
