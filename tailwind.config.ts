import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                'primary-grey': '#f1f2f7',
                'secondary-grey': '#082431',
                'primary-blue': '#5A6ACF',
                'secondary-blue': '#707FDD',
                'secondary-black': '#1F384C',
                'primary-orange': '#EC5252'
            }
        }
    }
}
