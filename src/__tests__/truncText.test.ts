import { truncText } from "./../helpers/truncText";

const testText =
  "Расскажу про один из проектов SaM Solutions - Rollingstack. Это система, что помогает создавать, использовать и поддерживать приложения на микросервисной архитектуре на основе Kubernetes.Rollingstack помогает команде проекта с частью DevOps активностей. Например такими:";

const expectedText =
  "Расскажу про один из проектов SaM Solutions - Rollingstack. Это система, что помогает созд...";

test("Test for correct trunc text", () => {
  expect(truncText(90, testText)).toStrictEqual(expectedText);
});
