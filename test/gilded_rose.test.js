const { Shop, Item } = require("../src/gilded_rose.js");
describe("Gilded Rose", function () {
  const itemList = {
    backstage: "Backstage passes to a TAFKAL80ETC concert",
    agedBrie: "Aged Brie",
    sulfuras: "Sulfuras, Hand of Ragnaros",
    foo: "bar",
    conjured: "Conjured",
  };

  describe("Regular items", () => {
    it("should degrade one by day", () => {
      const gildedRose = new Shop([new Item(itemList.foo, 14, 10)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).toBe("bar");
      expect(items[0].sellIn).toBe(13);
      expect(items[0].quality).toBe(9);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe("bar");
      expect(items[0].sellIn).toBe(12);
      expect(items[0].quality).toBe(8);
    });

    it("should degrade twice faster if the sellin date has passed", function () {
      const gildedRose = new Shop([new Item(itemList.foo, 1, 10)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).toBe("bar");
      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(9);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe("bar");
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(7);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe("bar");
      expect(items[0].sellIn).toBe(-2);
      expect(items[0].quality).toBe(5);
    });

    it("should keep the quality positive", function () {
      const gildedRose = new Shop([new Item(itemList.foo, 1, 1)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).toBe("bar");
      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(0);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe("bar");
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe("bar");
      expect(items[0].sellIn).toBe(-2);
      expect(items[0].quality).toBe(0);
    });
  });

  describe("Aged brie items exceptions", () => {
    it("should increase quality the older it gets", function () {
      const gildedRose = new Shop([new Item(itemList.agedBrie, 3, 1)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.agedBrie);
      expect(items[0].sellIn).toBe(2);
      expect(items[0].quality).toBe(2);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.agedBrie);
      expect(items[0].sellIn).toBe(1);
      expect(items[0].quality).toBe(3);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.agedBrie);
      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(4);
    });

    it("should increase twice faster when the sell date has passed", function () {
      const gildedRose = new Shop([new Item(itemList.agedBrie, 1, 1)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.agedBrie);
      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(2);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.agedBrie);
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(4);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.agedBrie);
      expect(items[0].sellIn).toBe(-2);
      expect(items[0].quality).toBe(6);
    });

    it("should keep the quality below 51", function () {
      const gildedRose = new Shop([new Item(itemList.agedBrie, 1, 46)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.agedBrie);
      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(47);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.agedBrie);
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(49);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.agedBrie);
      expect(items[0].sellIn).toBe(-2);
      expect(items[0].quality).toBe(50);
    });
  });

  describe("Sulfuras items exceptions", () => {
    it("should not change properties over time", function () {
      const gildedRose = new Shop([new Item(itemList.sulfuras, 3, 80)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.sulfuras);
      expect(items[0].sellIn).toBe(3);
      expect(items[0].quality).toBe(80);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.sulfuras);
      expect(items[0].sellIn).toBe(3);
      expect(items[0].quality).toBe(80);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.sulfuras);
      expect(items[0].sellIn).toBe(3);
      expect(items[0].quality).toBe(80);
    });

    it("should keep quality as 80", function () {
      const gildedRose = new Shop([new Item(itemList.sulfuras, 3, 10)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.sulfuras);
      expect(items[0].sellIn).toBe(3);
      expect(items[0].quality).toBe(80);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.sulfuras);
      expect(items[0].sellIn).toBe(3);
      expect(items[0].quality).toBe(80);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.sulfuras);
      expect(items[0].sellIn).toBe(3);
      expect(items[0].quality).toBe(80);
    });
  });

  describe("Backstage passes items exceptions", () => {
    it("should increase quality the older it gets", function () {
      const gildedRose = new Shop([new Item(itemList.backstage, 15, 1)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.backstage);
      expect(items[0].sellIn).toBe(14);
      expect(items[0].quality).toBe(2);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.backstage);
      expect(items[0].sellIn).toBe(13);
      expect(items[0].quality).toBe(3);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.backstage);
      expect(items[0].sellIn).toBe(12);
      expect(items[0].quality).toBe(4);
    });

    it("should increase quality by 2 when sellIn is below 10", function () {
      const gildedRose = new Shop([new Item(itemList.backstage, 11, 1)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.backstage);
      expect(items[0].sellIn).toBe(10);
      expect(items[0].quality).toBe(2);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.backstage);
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(4);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.backstage);
      expect(items[0].sellIn).toBe(8);
      expect(items[0].quality).toBe(6);
    });

    it("should increase quality by 3 when sellIn is below 5", function () {
      const gildedRose = new Shop([new Item(itemList.backstage, 6, 1)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.backstage);
      expect(items[0].sellIn).toBe(5);
      expect(items[0].quality).toBe(3);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.backstage);
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(6);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.backstage);
      expect(items[0].sellIn).toBe(3);
      expect(items[0].quality).toBe(9);
    });

    it("should drop the quality to 0 after the concert", function () {
      const gildedRose = new Shop([new Item(itemList.backstage, 1, 15)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.backstage);
      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(18);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.backstage);
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.backstage);
      expect(items[0].sellIn).toBe(-2);
      expect(items[0].quality).toBe(0);
    });

    it("should keep the quality below 51", function () {
      const gildedRose = new Shop([new Item(itemList.backstage, 4, 45)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.backstage);
      expect(items[0].sellIn).toBe(3);
      expect(items[0].quality).toBe(48);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.backstage);
      expect(items[0].sellIn).toBe(2);
      expect(items[0].quality).toBe(50);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.backstage);
      expect(items[0].sellIn).toBe(1);
      expect(items[0].quality).toBe(50);
    });
  });

  describe("Conjured items exceptions", () => {
    it("should degrade quality by 2 per day", function () {
      const gildedRose = new Shop([new Item(itemList.conjured, 10, 8)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.conjured);
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(6);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.conjured);
      expect(items[0].sellIn).toBe(8);
      expect(items[0].quality).toBe(4);

      items = gildedRose.updateQuality();
      expect(items[0].name).toBe(itemList.conjured);
      expect(items[0].sellIn).toBe(7);
      expect(items[0].quality).toBe(2);
    });
  });
});
