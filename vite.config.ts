import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dts({
            include: ['src/components'],
            skipDiagnostics:false,
            logDiagnostics:true
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/components/index.ts"),
            name: "ultr42-react-components",
            formats: ['es', 'umd'],
            fileName: (format) => `ultr42-react-components.${format}.js`,
        },
        outDir: "./lib"
    },

})
