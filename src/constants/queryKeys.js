export const queryKeys = {
  auth: { me: ["auth", "me"] },
  categories: { all: ["categories"] },
  products: {
    all: ["products"],
    list: (filters) => ["products", "list", filters],
    infinite: (filters) => ["products", "infinite", filters],
    featured: (limit) => ["products", "featured", limit],
    detail: (slug) => ["products", "detail", slug],
    reviews: (slug, sort) => ["products", "reviews", slug, sort],
  },
  admin: {
    stats: (name, params) => ["admin", "stats", name, params],
    orders: ["admin", "orders"],
    ordersList: (filters) => ["admin", "orders", "list", filters],
    orderDetail: (id) => ["admin", "orders", "detail", id],
    productsList: (filters) => ["admin", "products", "list", filters],
    reviews: ["admin", "reviews"],
    reviewsList: (filters) => ["admin", "reviews", "list", filters],
  },
};
