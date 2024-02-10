document.addEventListener(`alpine:init`, () => {
  Alpine.data(`sales`, () => ({
    items: [
      { id: 1, name: `Birthday`, img: `sale1.jpg`, price: 35000 },
      { id: 2, name: `Graduation`, img: `sale2.jpg`, price: 50000 },
      { id: 3, name: `Alphabet`, img: `sale3.jpg`, price: 60000 },
      { id: 4, name: `Art`, img: `sale4.jpg`, price: 50000 },
      { id: 5, name: `Decoration`, img: `sale5.jpg`, price: 35000 },
      { id: 6, name: `Graduation`, img: `sale6.jpg`, price: 35000 },
    ],
  }));

  Alpine.store(`cart`, {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // Cek apakah ada barang yang sama di keranjang
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // Jika tidak ada, tambahkan barang baru
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika ada, cek apakah barang beda atau sama
        this.items = this.items.map((item) => {
          // Jika barang berbeda, lewati
          if (item.id !== newItem.id) {
            return item;
          } else {
            // Jika barang sama, tambahkan jumlah dan total
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // Cari barang yang akan dihapus
      const cartItem = this.items.find((item) => item.id === id);

      // Jika barang lebih dari satu
      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          // Jika bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // Jika barang hanya satu
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Konversi ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat(`id-ID`, {
    style: `currency`,
    currency: `IDR`,
    minimumFractionDigits: 0,
  }).format(number);
};
