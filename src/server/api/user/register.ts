export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const result = await $fetch("/register", { baseURL: config.public.baseURL });
  return result;
});
