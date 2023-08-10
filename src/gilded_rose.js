class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class FooItem extends Item {
  constructor(sellIn, quality) {
    super("bar", sellIn, quality);
  }

  updateQuality() {
    this.sellIn--;
    this.quality = this.sellIn < 0 ? this.quality - 2 : this.quality - 1;
    this.quality = this.quality < 0 ? 0 : this.quality;
    return this;
  }
}

class SulfurasItem extends Item {
  constructor(sellIn, quality) {
    super("Sulfuras, Hand of Ragnaros", sellIn, quality);
  }

  updateQuality() {
    this.sellIn = this.sellIn;
    this.quality = 80;
    return this;
  }
}

class AgedBrieItem extends Item {
  constructor(sellIn, quality) {
    super("Aged Brie", sellIn, quality);
  }

  updateQuality() {
    this.sellIn--;
    this.quality = this.sellIn < 0 ? this.quality + 2 : this.quality + 1;
    this.quality = this.quality > 50 ? 50 : this.quality;
    return this;
  }
}

class BackstagePassesItem extends Item {
  constructor(sellIn, quality) {
    super("Backstage passes to a TAFKAL80ETC concert", sellIn, quality);
  }

  updateQuality() {
    this.sellIn--;
    this.quality =
      this.sellIn < 10
        ? this.sellIn < 5
          ? this.quality + 3
          : this.quality + 2
        : this.quality + 1;
    this.quality = this.sellIn < 0 ? 0 : this.quality;
    this.quality = this.quality > 50 ? 50 : this.quality;
    return this;
  }
}

class ConjuredItem extends Item {
  constructor(sellIn, quality) {
    super("Conjured", sellIn, quality);
  }

  updateQuality() {
    this.sellIn--;
    this.quality -= 2;
    this.quality = this.quality < 0 ? 0 : this.quality;
    return this;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
    this.itemTypes = {
      backstage: "Backstage passes to a TAFKAL80ETC concert",
      agedBrie: "Aged Brie",
      sulfuras: "Sulfuras, Hand of Ragnaros",
      conjured: "Conjured",
    };
  }

  specialize(item) {
    const { backstage, agedBrie, sulfuras, conjured } = this.itemTypes;
    switch (item.name) {
      case backstage:
        return new BackstagePassesItem(item.sellIn, item.quality);
      case agedBrie:
        return new AgedBrieItem(item.sellIn, item.quality);
      case sulfuras:
        return new SulfurasItem(item.sellIn, item.quality);
      case conjured:
        return new ConjuredItem(item.sellIn, item.quality);
    }
    return new FooItem(item.sellIn, item.quality);
  }

  updateQuality() {
    this.items = this.items.map((item) => {
      let specializedItem = this.specialize(item);
      return specializedItem.updateQuality();
    });
    return this.items;
  }
}
module.exports = {
  Shop,
  Item,
};
