export const useLoading = <T>(
  handler: Promise<T>,
  state: Ref<loadingState>,
  timer: number
) => {
  //每500ms检测一次传入Promise对象的状态
  setInterval(() => {
    let counter = 0;
    new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve("loading");
      }, 0);
      handler.then(() => {
        resolve("ok");
      });
      handler.catch(() => {
        resolve("error");
      });
    }).then((value) => {
      state.value = value as loadingState;
    });
    counter += 500;
    if (counter > timer) {
      clearInterval(this);
    }
  }),
    500;
};
