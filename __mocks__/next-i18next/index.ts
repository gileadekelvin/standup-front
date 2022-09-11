module.exports = {
  useTranslation: jest.fn().mockImplementation(() => {
    return {
      t: (str: string) => str,
    };
  }),
};

export {};
