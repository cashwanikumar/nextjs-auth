export const getToken = (context) => {
  console.log("context");
  console.log(context?.ctx?.req?.cookies?.authToken);
  return context?.ctx?.req?.cookies?.authToken || null;
};
