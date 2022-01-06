import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "react-loader-spinner";
import { ReactElement, ReactMarkdown } from "react-markdown/lib/react-markdown";
import ReactMde from "react-mde";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import rehypeExternalLinks from "rehype-external-links";
import remarkGfm from "remark-gfm";
import Header from "../../components/header/Header/Header";
import HeaderNavbar from "../../components/header/HeaderNavbar/HeaderNavbar";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LinkComponent from "../../components/LinkComponent/LinkComponent";
import LogoSam from "../../components/LogoSam/LogoSam";
import Main from "../../components/main/Main/Main";
import MainTitle from "../../components/main/MainTitle/MainTitle";
import { loadingColor, navItems, routes } from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import "./EditArticlePage.scss";
import DefaultImage from "./assets/EditDefaultImage.svg";
import classNames from "classnames";
import ValidationForInput from "../../components/ValidationForInput/ValidationForInput";
import { IEditedArticle } from "../../repositories/interfaces/INewsRepository";
import { getBase64 } from "../../helpers/getBase64";

const EditArticlePage: React.FC = (): ReactElement => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { authStore, newsStore } = useContext(StoreContext);
  const articleId = useParams();
  const [article, setArticle] = useState(
    newsStore.newsList.find((a) => a.id === articleId.id)
  );

  const [title, setTitle] = useState(article?.title);
  const [description, setDescription] = useState(article?.description);
  const [image, setImage] = useState(article?.image);
  const [file, setFile] = useState<File | null>(null);

  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  useEffect(() => {
    return () => {
      newsStore.resetErrorState();
    };
  }, []);

  useEffect(() => {
    async function getArticle() {
      if (article === undefined && articleId.id !== undefined) {
        setArticle(await newsStore.getArticleById(articleId.id));
      }
    }
    getArticle();
  }, [articleId.id]);

  useEffect(() => {
    if (article && article.title) {
      setTitle(article.title);
    }
    if (article && article.description) {
      setDescription(article.description);
    }
    if (article && article.image) {
      setImage(article.image);
    }
  }, [article]);

  if (authStore.user === undefined) {
    return <Navigate to={routes.login} />;
  }

  if (newsStore.errorState === true) {
    return <Navigate to={routes.login} />;
  }

  if (article === undefined) {
    return (
      <div className="edit-meetup">
        <Header className="edit-meetup__header">
          <LinkComponent to={routes.meetups}>
            <LogoSam className="edit-meetup__header-logo" />
          </LinkComponent>
          <HeaderNavbar items={navItems.header} />
          <HeaderProfile user={authStore.user} />
        </Header>
        <Main>
          <MainTitle>{t("loading")}...</MainTitle>
          <Loader type="Puff" color={loadingColor} height={100} width={100} />
        </Main>
      </div>
    );
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleEditImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (image) {
      URL.revokeObjectURL(image);
    }
    setFile(e.target.files ? e.target.files[0] : null);
    if (e.target.files !== null) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleDeleteImage = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setFile(null);
    if (image) {
      URL.revokeObjectURL(image);
    }
    setImage(undefined);
  };

  const handleEditMeetup = async (event: React.FormEvent) => {
    event.preventDefault();
    if (articleId.id !== undefined) {
      const editedData: IEditedArticle = {
        id: articleId.id,
      };

      if (title !== undefined) {
        editedData.title = title;
      }
      if (description !== undefined) {
        editedData.description = description;
      }

      if (file !== null) {
        editedData.image = await getBase64(file);
      }
      if (file === null && image === undefined) {
        editedData.image = null;
      }

      await newsStore.updateArticle(articleId.id, editedData);
      navigate(routes.news);
    }
  };

  return (
    <div className="edit-article">
      <Header className="edit-article__header">
        <LinkComponent to={routes.meetups}>
          <LogoSam className="edit-article__header-logo" />
        </LinkComponent>
        <HeaderNavbar items={navItems.header} />
        <HeaderProfile user={authStore.user} />
      </Header>
      <Main>
        <MainTitle>{t("pageTitles.editArticle")}</MainTitle>
        <form className="edit-article-form" onSubmit={handleEditMeetup}>
          <fieldset className="edit-article-form-inputs">
            <div className="edit-article__image-wrapper">
              <img
                src={image ?? DefaultImage}
                alt="Edit Article"
                className="edit-article-form-inputs__image"
              />
              <input
                type="file"
                id="editImage"
                className="edit-article__image-input"
                accept=".png,.jpeg,.jpg"
                onChange={handleEditImage}
              />
              <label
                htmlFor="editImage"
                className="edit-article__image-label"
                title={t("htmlTitles.chooseImage")}
              >
                <span className="material-icons-round edit-article__image-label-icon">
                  file_upload
                </span>
              </label>
              <button
                className={classNames("edit-article__image-delete", {
                  "edit-article__image-delete-visible": file !== null || image,
                })}
                title={t("htmlTitles.deleteImage")}
                onClick={handleDeleteImage}
              >
                <span className="material-icons-round edit-article__image-delete-icon">
                  delete_forever
                </span>
              </button>
            </div>
            <div className="edit-article-form-inputs-item">
              <label
                htmlFor="editArticleTitle"
                className="edit-article-form-inputs-item__label"
              >
                Заголовок
              </label>
              <input
                type="text"
                className="edit-article-form-inputs-item__input"
                id="editArticleTitle"
                defaultValue={title}
                onChange={handleTitleChange}
              />
              {title !== undefined && <ValidationForInput inputData={title} />}
            </div>
            <div className="edit-article-form-inputs-item">
              <label className="edit-article-form-inputs-item__label">
                Текст
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
              {description !== undefined && (
                <ValidationForInput inputData={description} />
              )}
            </div>
          </fieldset>
          <fieldset className="edit-article-form-buttons">
            <LinkComponent
              className="edit-article-form-buttons__back"
              to={routes.news}
            >
              {t("buttons.meetupPageButtons.goBack")}
            </LinkComponent>
            <button
              type="submit"
              className="edit-article-form-buttons__submit"
              disabled={title?.trim() === "" || description?.trim() === ""}
            >
              {t("buttons.commonButtons.save")}
            </button>
          </fieldset>
        </form>
      </Main>
    </div>
  );
};

export default EditArticlePage;
