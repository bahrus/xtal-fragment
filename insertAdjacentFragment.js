export function insertAdjacentFragment(fragment, target, position) {
    let appendTarget = target;
    let isFirst = true;
    const appendedChildren = [];
    Array.from(fragment.children).forEach(child => {
        const modifiedPosition = isFirst ? position : 'afterend';
        isFirst = false;
        appendTarget = appendTarget.insertAdjacentElement(modifiedPosition, child);
        appendedChildren.push(appendTarget);
    });
    return appendedChildren;
}
