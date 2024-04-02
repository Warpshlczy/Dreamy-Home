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
      return {
        type: "error",
        msg: "登记失败,未知错误",
      };
    } else {
      switch (result.code) {
        case 200: {
          return {
            type: "success",
            msg: "登记成功！请前往检查站确认!",
          };
        }
        case 400: {
          return {
            type: "alert",
            msg: "登记失败,用户名或通行码不能为空",
          };
        }

        case 408: {
          return {
            type: "alert",
            msg: "昵称已经被其他人注册了！换一个吧",
          };
        }
        default: {
          return {
            type: "error",
            msg: "登记失败,服务器请求错误",
          };
        }
      }
    }
  } catch (e) {
    return {
      type: "error",
      msg: "登记失败,服务器错误",
    };
  }
});
