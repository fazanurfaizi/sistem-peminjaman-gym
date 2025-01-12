const cookieExpires = 60 * 60 * 24 * 1000 * 7

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'end'
      },
      meta: [
        {
          name: 'description',
          content: 'Sistem peminjaman Gym'
        }
      ],
      title: 'Sistem Peminjaman Gym'
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-mongoose', '@pinia/nuxt', '@nuxtjs/tailwindcss', 'nuxt-svgo'],
  runtimeConfig: {
    cookieName: '__session',
    cookieSecret: 'secret',
    cookieExpires: cookieExpires.toString()
  },
  mongoose: {
    uri: 'mongodb+srv://I2ufXxNmt6uASJ97:I2ufXxNmt6uASJ97@cluster0.tkbor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    options: {
      dbName: 'gym-app',
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
      }
    },
    modelsDir: 'models',
    devtools: true,
  },
})