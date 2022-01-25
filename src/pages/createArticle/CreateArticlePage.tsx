import classNames from "classnames";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header/Header";
import HeaderNavbar from "../../components/header/HeaderNavbar/HeaderNavbar";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LinkComponent from "../../components/LinkComponent/LinkComponent";
import LogoSam from "../../components/LogoSam/LogoSam";
import Main from "../../components/main/Main/Main";
import MainTitle from "../../components/main/MainTitle/MainTitle";
import {
  fileMaxSize,
  imageTypesRegex,
  navItems,
  routes,
} from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import "./CreateArticlePage.scss";
import DropZoneIcon from "./assets/dropzone-icon.svg";
import { INewArticle } from "../../repositories/interfaces/INewsRepository";
import { getBase64 } from "../../helpers/getBase64";

import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";
import ValidationForInput from "../../components/ValidationForInput/ValidationForInput";

const CreateArticlePage: React.FC = (): ReactElement => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { authStore, newsStore } = useContext(StoreContext);

  const [requiredFilled, setRequiredFilled] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState(false);
  const [urlImage, setUrlImage] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  const { getRootProps, isDragActive, isDragReject } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    onDrop: (acceptedFiles: File[]) => {
      if (!isDragReject) {
        setFile(acceptedFiles[0]);
        URL.revokeObjectURL(urlImage);
        setUrlImage(URL.createObjectURL(acceptedFiles[0]));
      }
    },
    maxFiles: 1,
  });

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
    if (e.target.files !== null) {
      setUrlImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCreateArticle = async (event: React.FormEvent) => {
    event.preventDefault();
    if (authStore.user === undefined) {
      navigate(routes.meetups);
    } else {
      const articleData: INewArticle = {
        title,
        description,
        date: new Date().toISOString(),
        image: null,
      };
      if (file !== null) {
        articleData.image = await getBase64(file);
      }

      await newsStore.createNewArticle(articleData);
      navigate(routes.news);
    }
  };

  const handleResetFile = () => {
    setFile(null);
    if (urlImage !== "") {
      URL.revokeObjectURL(urlImage);
      setUrlImage("");
    }
  };

  useEffect(() => {
    if (isDragReject) {
      setFileError(true);
    } else if (file !== null && file.size > fileMaxSize) {
      setFileError(true);
    } else {
      setFileError(false);
    }
  }, [file, isDragReject]);

  useEffect(() => {
    if (title.trim() === "" || description.trim() === "") {
      setRequiredFilled(false);
    } else {
      setRequiredFilled(true);
    }
  }, [description, title]);

  if (authStore.user === undefined) {
    return <Navigate to={routes.login} />;
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div className="create-article">
      <Header className="create-article__header">
        <LinkComponent to={routes.meetups}>
          <LogoSam className="create-article__header-logo" />
        </LinkComponent>
        <HeaderNavbar items={navItems.header} />
        <HeaderProfile user={authStore.user} />
      </Header>
      <Main>
        <MainTitle>{t("pageTitles.newArticle")}</MainTitle>
        <form className="create-article-form" onSubmit={handleCreateArticle}>
          <fieldset className="create-article-form-inputs">
            <div className="create-article-form-inputs-item">
              <label
                htmlFor="articleTitle"
                className="create-article-form-inputs-item__label"
              >
                {t("inputLabels.headline")}
              </label>
              <input
                type="text"
                id="articleTitle"
                className="create-article-form-inputs-item__input"
                onChange={handleTitleChange}
                value={title}
              />
              <ValidationForInput inputData={title} />
            </div>
            <div className="create-article-form-inputs-item">
              <label
                htmlFor="articleDescription"
                className="create-article-form-inputs-item__label"
              >
                {t("inputLabels.text")}
              </label>
              <ReactMde
                l18n={{
                  write: t("markdown.write"),
                  preview: t("markdown.preview"),
                  uploadingImage: "",
                  pasteDropSelect: "",
                }}
                maxEditorHeight={480}
                toolbarCommands={[
                  ["bold", "italic", "strikethrough"],
                  ["quote", "link", "code"],
                  ["unordered-list", "ordered-list"],
                ]}
                value={description}
                onChange={setDescription}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                  Promise.resolve(
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeExternalLinks]}
                    >
                      {markdown}
                    </ReactMarkdown>
                  )
                }
                childProps={{
                  writeButton: {
                    tabIndex: -1,
                  },
                }}
              />
              <ValidationForInput inputData={description} />
            </div>
            <div className="container"></div>
            <div className="create-article-form-inputs-item">
              <label
                htmlFor=""
                className="create-article-form-inputs-item__label"
              >
                {t("inputLabels.image")}
              </label>
              {file !== null &&
              !fileError &&
              imageTypesRegex.test(file.type) ? (
                <div className="create-article-form-uploaded-image">
                  <div className="create-article-form-uploaded-image-icon">
                    <span className="material-icons-outlined create-article-form-uploaded-image-icon__image">
                      image
                    </span>
                    <div className="create-article-form-uploaded-image-icon-text">
                      <p>{file.name}</p>
                      <p className="create-article-form-uploaded-image-icon-text-filesize">
                        {t("dropZoneSection.fileSize")}:{" "}
                        {(file.size / (1024 * 1024)).toFixed(2)} Mb{" "}
                      </p>
                    </div>
                    <button
                      className="material-icons-outlined create-article-form-uploaded-image-icon-text-delete"
                      onClick={handleResetFile}
                    >
                      close
                    </button>
                  </div>
                  <img
                    src={urlImage}
                    alt="preview"
                    className="create-article-form-uploaded-image-pic"
                  />
                </div>
              ) : (
                <div
                  {...getRootProps({
                    className: classNames("create-article-form-dragndrop", {
                      "create-article-form-dragndrop-active": isDragActive,
                      "create-article-form-dragndrop-rejected": isDragReject,
                    }),
                  })}
                >
                  <img
                    src={DropZoneIcon}
                    alt="Drop zone"
                    className="create-article-form-dragndrop-icon"
                  />
                  {t("dropZoneSection.dragImages")}
                  <label
                    htmlFor="image-upload"
                    className="create-article-form-dragndrop__label"
                  >
                    {t("dropZoneSection.upload")}
                  </label>
                  &nbsp;(.jpeg, .png, .jpg)
                  <input
                    type="file"
                    id="image-upload"
                    accept=".png,.jpeg,.jpg"
                    onChange={handleUploadImage}
                    style={{ display: "none" }}
                  />
                  <p
                    className={
                      fileError
                        ? "create-article-form-dragndrop__error-visible"
                        : "create-article-form-dragndrop__error-hidden"
                    }
                  >
                    {t("dropZoneSection.errors.maxFileSize")}: 1 Mb <br />
                    {t("dropZoneSection.errors.allowedFormats")}: .png .jpg
                    .jpeg
                  </p>
                </div>
              )}
            </div>
          </fieldset>
          <fieldset className="create-article-form-buttons">
            <LinkComponent
              className="create-article-form-buttons__back"
              to={routes.news}
            >
              {t("buttons.meetupPageButtons.goBack")}
            </LinkComponent>
            <button
              type="submit"
              className="create-article-form-buttons__submit"
              disabled={!requiredFilled}
            >
              {t("buttons.commonButtons.create")}
            </button>
          </fieldset>
        </form>
      </Main>
    </div>
  );
};

export default CreateArticlePage;
