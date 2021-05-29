export function insertAdjacentFragment(fragment: DocumentFragment, target: Element, position: InsertPosition, ){
    let appendTarget = target;
    let isFirst = true;
    const appendedChildren : Element[] = [];
    Array.from(fragment.children).forEach(child =>{
      const modifiedPosition : InsertPosition = isFirst ? position : 'afterend';
      isFirst = false;
      appendTarget = appendTarget.insertAdjacentElement(modifiedPosition, child)!;
      appendedChildren.push(appendTarget);
    });
    return appendedChildren;
}