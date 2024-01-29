function refactor() {
    const operations = [Operation1, Operation2, Operation3, Operation4];
    let error = null;

    for (const operation of operations) {
        if (FAILED(operation())) {
            return operation + "FAILED";
        }
    }

    return error;
}
