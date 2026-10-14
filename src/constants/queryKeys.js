export const queryKeys = {
  auth: { me: ["auth", "me"] },
  categories: { all: ["categories"] },
  products: {
    all: ["products"],
    list: (filters) => ["products", "list", filters],
    featured: (limit) => ["products", "featured", limit],
    detail: (slug) => ["products", "detail", slug],
  },
};
