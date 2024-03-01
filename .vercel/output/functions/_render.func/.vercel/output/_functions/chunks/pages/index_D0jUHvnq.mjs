/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, i as renderHead, j as renderSlot, m as maybeRenderHead, k as renderComponent } from '../astro_DS2WqO0o.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { createClient } from '@supabase/supabase-js';

const $$Astro$3 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/Juan/test/afraid-asteroid/src/layouts/Layout.astro", void 0);

const $$Astro$2 = createAstro();
const $$ProjectCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ProjectCard;
  return renderTemplate`${maybeRenderHead()}<div class="border px-4 py-3 rounded-md hover:shadow-xl hover:scale-105 transition-all"> <div class="flex flex-col gap-1 cursor-pointer"> <div class="flex justify-between"> <div> <p class="font-bold">Browk Ui / kit</p> <p class="text-xs">CRUD api</p> </div> <p class="text-sm text-gray-300">React - Firebase - Mongo DB</p> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-secondary"> <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"></path> </svg> </div> </div> </div>`;
}, "C:/Users/Juan/test/afraid-asteroid/src/components/ProjectCard.astro", void 0);

const $$Astro$1 = createAstro();
const $$WorkCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$WorkCard;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex flex-col items-center justify-center max-w-52 border px-4 py-2 rounded-md cursor-pointer
  hover:shadow-[3px_3px_0px_1px_rgba(253,254,177,1)]
  hover:border-secondary transition-all`, "class")}> <p class="font-bold">Market</p> <p class="max-w-xs text-xs text-center">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur,
    deserunt asperiores corrupti possimus deleniti neque in officia nesciunt cum
</p> </div>`;
}, "C:/Users/Juan/test/afraid-asteroid/src/components/WorkCard.astro", void 0);

const supabase = createClient(
  "https://uktbhfjwcdzxsccdqbsu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrdGJoZmp3Y2R6eHNjY2RxYnN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzMjAzNTIsImV4cCI6MjAyNDg5NjM1Mn0.WDXdnqXv7OvZhFGDHnX4qPBjwQJhE7VuATJ4U7GhQac"
);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { data: works, error } = await supabase.from("works").select("*");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Astro." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex min-h-full flex-col items-center p-10 max-w-3xl mx-auto"> <div class="flex flex-col gap-4"> <div class="mb-4"> <div class="flex justify-between items-center"> <h1 class="text-xl">Texto prueba 🖐️</h1> <p class="text-xs text-gray-200">mail@gmail.com</p> </div> <p class="max-w-md text-gray-300 mt-2">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto nam
          accusantium doloremque accusamus iste sed enim neque tempore, pariatur
          id sint iure! Inventore minus repellat ducimus. Ipsum soluta mollitia
          quas.
</p> </div> <h2 class="text-lg">Titulo prueba 1</h2> <div class="flex items-center gap-2 flex-wrap"> ${works?.map((work) => renderTemplate`${renderComponent($$result2, "WorkCard", $$WorkCard, {})}`)} </div> <h2 class="text-lg">Titulo prueba 2</h2> ${renderComponent($$result2, "ProjectCard", $$ProjectCard, {})} ${renderComponent($$result2, "ProjectCard", $$ProjectCard, {})} ${renderComponent($$result2, "ProjectCard", $$ProjectCard, {})} ${renderComponent($$result2, "ProjectCard", $$ProjectCard, {})} </div> </main> ` })}`;
}, "C:/Users/Juan/test/afraid-asteroid/src/pages/index.astro", void 0);

const $$file = "C:/Users/Juan/test/afraid-asteroid/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
