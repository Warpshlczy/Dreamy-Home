export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const result: any = await $fetch("/register", {
    baseURL: config.public.baseURL,
  });
  try {
    if (!result) {
      return "未知错误";
    } else {
      switch (result.code) {
        case 1: {
          return "登记成功！请前往检查站确认信息进入";
        }
        case 0: {
          return "注册失败!";
        }
        default: {
          return "其它失败原因";
        }
      }
    }
  } catch (e) {
    return "服务器错误";
  }
});
