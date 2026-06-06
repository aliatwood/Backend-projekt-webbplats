import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    base: "./",
    build: {
        outDir: "docs",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                menu: resolve(__dirname, "pages/menu.html"),
                booking: resolve(__dirname, "pages/booking.html"),
                contact: resolve(__dirname, "pages/contact.html"),
                about: resolve(__dirname, "pages/about.html"),
                reviews: resolve(__dirname, "pages/reviews.html"),
                admin: resolve(__dirname, "pages/admin.html"),
            },
        },
    },
});