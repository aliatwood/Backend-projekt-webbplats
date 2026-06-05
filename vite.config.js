import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                menu: resolve(__dirname, "src/pages/menu.html"),
                booking: resolve(__dirname, "src/pages/booking.html"),
                contact: resolve(__dirname, "src/pages/contact.html"),
                about: resolve(__dirname, "src/pages/about.html"),
                admin: resolve(__dirname, "src/pages/menu.html"),
            },
        },
    },
});