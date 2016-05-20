const chai = require("chai");
const { expect } = chai;
const SymphonyCommerce = require("../dist");

describe("API Base", () => {
  it("should be a function", () => {
    expect(SymphonyCommerce).to.be.a('function');    
  });

  it("should return api modules", () => {
    const Symphony = SymphonyCommerce();
    expect(Symphony).to.be.a('object'); 

    expect(Symphony).to.have.all.keys([
      'Auth', 
      'Order', 
      'Member',
      'PageElement', 
      'Permission', 
      'Product', 
      'Report', 
      'SearchSync', 
      'SiteConfig', 
      'Store',
      'Subscription', 
      'UrlMapping', 
      'v3Cart',
      'Variant',
      'Victory',
      'Wholesale'
    ]);    
  });
});