import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.css'),
        admissionApplication: resolve(__dirname, 'admission-application.html'),
        admissionsPolicy: resolve(__dirname, 'admissions-policy.html'),
        clubs: resolve(__dirname, 'clubs.html'),
        coreValues: resolve(__dirname, 'core-values.html'),
        email: resolve(__dirname, 'email.html'),
        leadership: resolve(__dirname, 'leadership.html'),
        mission: resolve(__dirname, 'mission.html'),
        preschool: resolve(__dirname, 'preschool.html'),
        primary: resolve(__dirname, 'primary.html'),
        request: resolve(__dirname, 'request.html'),
        schoolStore: resolve(__dirname, 'school-store.html'),
        secondary: resolve(__dirname, 'secondary.html'),
      },
    },
  },
});
