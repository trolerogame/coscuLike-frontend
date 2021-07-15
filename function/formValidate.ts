export const ValidateInput = (
    //? con esto validamos los inputs
    expression: RegExp,
    camp: string,
    update: any,
    all: any
  ) => {
    return expression.test(camp)
      ? update({ ...all, validate: true })
      : update({ ...all, validate: false });
};