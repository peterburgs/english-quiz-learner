import createDataContext from "./createDataContext";

export const { Provider, Context } = createDataContext(null, null, {
  coin: 1,
  exp: 1,
  streak: 1,
});
