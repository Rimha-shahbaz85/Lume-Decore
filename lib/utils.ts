// Generate unique order number
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LUM-${timestamp}-${random}`;
}

// Format price to PKR
export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

// Slugify string
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

// Date formatting
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

// Estimated delivery calculation
export function calculateEstimatedDelivery(): Date {
  const delivery = new Date();
  delivery.setDate(delivery.getDate() + 5); // 5 days from now
  return delivery;
}
