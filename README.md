# WebsiteMerckinator

An Angular SSR application that displays top news headlines from the GNews API. A custom Railway function wraps the free-tier GNews API to serve news data. Hosted on Railway.

## Technologies

- Angular 21 (with Server-Side Rendering)
- PrimeNG UI component library
- RxJS
- TypeScript
- Express (SSR server)
- Railway (hosting)
- GNews API

## Development server

Run `npm run start:dev` (or `ng serve`) for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Build

Run `npm run build` (or `ng build`) to build the project. The build artifacts will be stored in the `dist/` directory. The production build is the default.

## Production server

After building, start the SSR server with `npm start`.

## Running unit tests

Run `npm test` to execute the unit tests via Vitest. Use `npm run test:watch` for watch mode, or `npm run test:coverage` for a coverage report.
