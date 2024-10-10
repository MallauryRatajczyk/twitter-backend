function findHashtag(tweet) {
    let regexp = new RegExp(/#[a-z]*/gi)
    console.log(tweet.matchAll(regexp));
    const array = [...tweet.matchAll(regexp)];
    let response = []
    for (let elem of array) {
        response.push(elem[0])
    }
    return (response);
}

/*let test = "Happy National Burger Day our burger is a big favourite here at Brooks.How do you like yours ? #NationalBurgerDay #Burger #KeepDiscovering"
console.log(findHashtag(test))*/

module.exports = { findHashtag }