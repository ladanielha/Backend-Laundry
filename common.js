const GenerateId = async (prefix, model) => {
    const countResult = await model.count()+1;
    return prefix + countResult.toString().padStart(4 - prefix.length,"0");

}

// let count = "67"
// let text = "BRG";
// let a = text + (`${count}`.padStart(6 - text.length,"0"))