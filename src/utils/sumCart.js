const sumCart = (elements) => {
    const result = elements.reduce((acc, curr) => acc + curr.pendiente, 0)
    return result;
}

export default sumCart