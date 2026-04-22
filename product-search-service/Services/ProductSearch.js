class ProductSearch {
    constructor() {
        this.products = new Map();
        this.indexes = new Map();

    }

    initialize(products) {
        products.forEach(product => {
            this.products.set(product.id, product);
            this.addIndexes(product);
        })
    }

    addIndexes(product) {
        const words = product.name.toLowerCase().split(" ");
        words.forEach(word => {
            if (!this.indexes.has(word)) {
                this.indexes.set(word, new Set());
            }
            this.indexes.set(word, this.indexes.get(word).add(product.id))
        })
    }

    search(inputStr){
      const words = inputStr.toLowerCase().split(" ");

      let result = new Set(this.indexes.get(words[0]) || []);

      for (let i = 1; i < words.length; i++){
        const curr = new Set(this.indexes.get(words[i]));

        result = new Set([...result].filter(id=> curr.has(id)))
      }


      let output=  [...result].map(id => this.products.get(id));

      output = this.computeRank(output, inputStr);
      return output;
    }

    computeRank(products, inputStr){
      //const wordsInInputStr = inputStr.toLowerCase().split(" ");
       products.forEach(product => {
            product.score = Math.floor((inputStr.length/ product.name.length) * 100);
        })

        return products;
    }

}

module.exports = ProductSearch;