function isLocalStorageSupported() {
    var testKey = 'test',
        storage = window.localStorage;
    try {
        storage.setItem(testKey, 'testValue');
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
}

export {isLocalStorageSupported}
