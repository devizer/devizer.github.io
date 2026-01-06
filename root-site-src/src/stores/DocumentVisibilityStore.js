const listeners = [];

export const on = listener => {
    listeners.push(listener);
}

export const off = listener => {
    var index = listeners.indexOf(listener);
    if (index !== -1) {
        listeners.splice(index, 1);
    }    
}

const isDocumentHidden = () => {
    // https://www.w3.org/TR/page-visibility-2/#idl-def-document-visibilitystate
    let isHidden = false;
    if (document && document.visibilityState && document.visibilityState !== 'visible') { isHidden = true; }
    return isHidden;
}

const isDocumentVisible = () => !isDocumentHidden();

const notifyAll = isVisible => {
    listeners.forEach(listener => {
        if (listener) listener(isVisible);
    });
}

if (document && document.visibilityState && typeof document.onvisibilitychange !== undefined) {
    console.log("SUBSRIBING to [visibilitychange]");
    document.addEventListener("visibilitychange", () => {
        const isHidden = isDocumentHidden();
        console.log(`DOCUMENT VISIBLILITY TRIGGERED: visible=${!isHidden}, visibility=${document.visibilityState}`);
        notifyAll(!isHidden);
    }, false);
}
else {
    console.warn("Unable to SUBSCRIBE to document[visibilitychange]");
}

const DocumentVisibilityStore = {
    on, // parameter is function onChanged(isVisible: boolean)
    off, 
    isDocumentVisible, // returns boolean
    isDocumentHidden   // returns boolean
}

export default DocumentVisibilityStore;