import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import "./CreateArticlePage.scss";

const CreateArticlePage: React.FC = (): ReactElement => {
  const { t } = useTranslation();

  return <div>Create article</div>;
};

export default CreateArticlePage;
