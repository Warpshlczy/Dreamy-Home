export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const requestParams = await readBody(event);
  console.log(requestParams);
  const result: any = await $fetch("user/register", {
    baseURL: config.public.baseURL,
    method: "POST",
    body: requestParams,
  });
  console.log(result);
  try {
    if (!result) {
      return "未知错误";
    } else {
      switch (result.code) {
        case 200: {
          return "登记成功！请前往检查站确认信息进入";
        }
        case 400: {
          return "登记失败,用户名或通行码不能为空";
        }
        default: {
          return "未知错误";
        }
      }
    }
  } catch (e) {
    return "服务器错误";
  }
});
