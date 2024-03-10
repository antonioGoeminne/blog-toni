---
layout: ../../layouts/Layout.astro
description: Como considero actualmente la forma más comoda y divertida en la que se puede crear un componente con sus variantes para un design system.
created_date: 09/03/2024
title: Construyendo Componentes Flexibles y Personalizables con CVA | Un Enfoque Práctico para Diseñar Sistemas
---

# Construyendo Componentes Flexibles y Personalizables con CVA | Un Enfoque Práctico para Diseñar Sistemas

_09/03/2024_

---

Cuando trabajamos con los estilos de una web, tenemos muchas maneras de conseguir buenos resultados respecto a performance, calidad de código y pixel perfect. Utilizar CSS puro sigue siendo muy poderoso y accesible, pero cuando un proyecto escala, tener múltiples archivos para los estilos se puede volver confuso si no se sigue alguna metodología o arquitectura específica (como por ejemplo, Feature dicen). Existen otras opciones como librerías de componentes o librerías de estilos, que proveen de facilidades y maneras más prolijas de trabajar como Chakra UI o Emotion. Sin embargo, actualmente muchas librerías tienen un problema, y es que la mayoría no soporta SSR. Eso significa sacrificar el renderizado en el servidor por un renderizado que, para hacer la hidratación, haga que el cliente descargue todos los archivos, a pesar de que la web solamente tenga algunas imágenes, animaciones simples y un par de estilos básicos de la UI.

En este blog, voy a hablar de la manera que encuentro más prolija y sencilla de construir sistemas de diseño que funcionen bien, soporten SSR y sean 100% personalizables. Para eso, voy a construir un Badge de un design system que ejemplifica muy bien el contenido del blog.

## Repaso de stack

Creo que la mejor manera de aprender es escribiendo uno mismo el código que vemos y luego intentar reproducirlo agregando nuestra propia versión. Por eso, primero vamos a hacer un breve repaso del stack que vamos a utilizar para que todos estemos familiarizados en caso de no conocer alguna de las tecnologías.

### Tailwind CSS

Es una herramienta bastante conocida y popular que provee mucha flexibilidad para construir diseños efectivos y responsivos a la vez que genera buena escalabilidad de los productos construidos. Si no la conoces aún, Tailwind te permite escribir las clases directamente en los bloques de HTML de tu contenido, eso significa que si tuvieras 1 componente y usases CSS modules, tendrías que crear 2 archivos, uno para los estilos y otro para el componente. En cambio, con Tailwind, puedes tener un solo componente y luego Tailwind se encarga solo de hacer un build con el CSS puro minificado.

```html
// un-solo-componente.jsx
<div className="px-2 py-4 space-x-2 bg-red-400">
  <p>contenido</p>
</div>
```

En el ejemplo anterior se ejemplifica la metodología de Tailwind donde podemos controlar padding, espacio flexible y el fondo de color de un elemento sin recurrir a múltiples archivos. Algunas cosas que agregar son que tiene una sintaxis particular que lleva tiempo en aprender pero que al ser tan intuitiva y similar a CSS nativo, uno no tarda mucho tiempo en familiarizarse.

### CVA

Class Variance Authority es una librería que te permite manejar variantes de tus componentes que en combinación con Tailwind se vuelve una herramienta muy simple y poderosa de construir aplicaciones.

```js
// un-solo-componente.jsx

const badgeVariants = cva("px-2 py-1", {
  variants: {
    variant: {
      mivariante: "bg-red-400",
    },
  },
});
```

Arriba le estamos diciendo que creamos la variante "mi variante", más abajo vamos a ir armando así vemos un ejemplo completo.

### clsx

Una herramienta simple y poderosa. Te permite crear condicionales de manera muy intuitiva, que fusionándola con Tailwind, te provee de prolijidad y dinamismo de forma muy práctica.

```js
const condicion1 = true;
const valor = clsx(
      { "clase-1": condicion1 },
      { "clase-2": false }
    );

// valor = 'clase1'
```

### Tw merge

Te permite fusionar estilos de Tailwind sin tener problemas de choques de clases.

## Comencemos a codear

Para este ejemplo, voy a utilizar JSX para mostrar el componente de Badge con sus variantes, es muy utilizado y parte de una tecnología muy demandada como React.

### cn

Primero podemos crear este archivo, que nos va a permitir hacer una fusión de nuestros estilos de una manera muy práctica. Es un archivo bastante usado y por convención se utiliza el nombre de `cn`.

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));

  // otro-archivo.js
  cn("bg-red bg-blue");
  // bg-blue "gana"
}
```

### Variantes

Luego vamos a utilizar cva para generar las variantes

```ts
const badgeVariants = cva(
  `rounded-full
	 text-center text-[13px] font-bold
	   flex items-center justify-center`,
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        secondary: "bg-white text-primary border border-primary",
      },
      size: {
        default: "h-6 px-2 py-3 max-w-[85px]",
        small: "h-4 px-2 py-3 max-w-[65px]",
      },
    },
  }
);
```

Lo que estamos haciendo con este código es primero indicarle a CVA que tome unos estilos por default, eso significa que sea la variante que elijas siempre va a tomar el estilo del redondeo de bordes. Luego en el objeto variants le indicamos el dinamismo, en variant le decimos los nombres de nuestras variantes y cuales son los valores que tienen de especial esas variantes. En size le decimos los diferentes tamaños, esto es algo genial que ofrece CVA porque nos permite indicar tamaños establecidos, lo que es algo muy común en sistemas de diseño con los botones.

### El badge final

```ts
interface badgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  label: string;
}

export const Badge = (props: badgeProps) => {
const { className, label, variant, size } = props;

return (
  <div className={cn(badgeVariants({ className, variant, size }))}>
    {label}
  </div>
);
};
```

Dividamos en 3 partes el código. Primero estamos definiendo la interfaz de TypeScript que toma todos los tipos de datos de un elemento div de HTML y los mezclamos con nuestra variante de CVA que creamos arriba. Segundo, creamos el componente, lo exportamos y desestructuramos las propiedades para tomar mayor control de estas mismas y pasárselas a nuestra función `cn` que mezcla los estilos. Y tercero, veamos cada propiedad dentro de `cn`:

- `className`: Nos permite generar un badge dinámico y flexible, en caso de que lo necesitemos podemos pasarle unos estilos custom. Más abajo muestro un ejemplo.
- `variant`: Permite decidir qué variante vamos a usar.
- `size`: Lo mismo que `variant` pero para el tamaño.

Por último, podemos usarlo de esta manera:

```ts
<Badge label="client" variant={"secondary"} className="mx-auto" />
```

![badge ui](https://imgur.com/O2cbscM.jpg)

## Conclusión

Este componente es funcional para SSR sin problema, y es 100% personalizable para cualquier sistema de diseño. En caso de que tengas que hacer un dashboard que sea client side recomiendo ir por opciones más pre armadas como alguna libreria de diseño, siempre y cuando no sea algo muy personalizable.
En caso de que gustes ver más ejemplos te invito a visitar este repo en mi [github](https://github.com/antonioGoeminne/Browk-UI-KIT) donde armo un design system con algunos componentes de un figma público.
Agradezco mucho que hayas llegado hasta aca y nos vemos pronto!
