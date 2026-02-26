export interface Icartinterface {
  carts: [
    {
      id: number;
      products: [
        {
          id: number;
          title: string;
          price: number;
          quantity: number;
          total: number;
          discountPercentage: number;
          discountedTotal: number;
          thumbnail: string;
        },
      ];
      total: number;
      discountedTotal: number;
      userId: number;
      totalProducts: number;
      totalQuantity: number;
    },
  ];
  total: number;
  skip: number;
  limit: number;
}
