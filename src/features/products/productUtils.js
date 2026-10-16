export function getProductImage(product) {
  const first = product?.images?.url[0];
  if (!first) return null;
  return typeof first === "string" ? first : (first.url ?? null);
}

export function getEffectivePrice(product) {
  const { price, discountPrice } = product;
  return discountPrice != null && discountPrice < price ? discountPrice : price;
}

export function getCategoryName(product) {
  return typeof product?.category === "object" ? (product.category?.name ?? null) : null;
}

export function isOutOfStock(product) {
  return product?.inStock === false || product?.stock === 0;
}

export function getProductId(product) {
  return product?._id ?? product?.id ?? null;
}

export function toCartItem(product, quantity = 1) {
  return {
    productId: String(getProductId(product)),
    slug: product.slug,
    name: product.name,
    image: getProductImage(product),
    price: getEffectivePrice(product),
    quantity,
  };
}

export function getProductImages(product) {
  console.log("2",product)
  return (product?.images.url ?? []).map((image) => (typeof image === "string" ? image : image?.url)).filter(Boolean);
}
