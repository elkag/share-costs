export const selectValue = (event) => {
    const { target } = event;
    const extensionStarts = target.value.lastIndexOf();
    target.focus();
    target.setSelectionRange(0, extensionStarts);
}

export const selectTarget = (target) => {
    const extensionStarts = target.value.lastIndexOf();
    target.focus();
    target.setSelectionRange(0, extensionStarts);
}