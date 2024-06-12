import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { initializeApp } from "firebase/app";
import { ReviewType } from "../../types/types";
import { InputsType } from "../../types/types";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { host } from "../../utils/host";

const config = {
  apiKey: "AIzaSyCGu03ZGjhTbnMG1I72hJ-gsJJ1VmCHxDE",
  authDomain: "stroyopttorg-cff79.firebaseapp.com",
  projectId: "stroyopttorg-cff79",
  storageBucket: "stroyopttorg-cff79.appspot.com",
  messagingSenderId: "813131839194",
  appId: "1:813131839194:web:8a23e6084989efd67e57e3",
};
const firebaseConfig = config;
const app = initializeApp(firebaseConfig);

type formProps = {
  setReviews?: React.Dispatch<React.SetStateAction<ReviewType[]>>;
};

const ContactsForm = ({ setReviews }: formProps) => {
  const [files, setFiles] = useState<FileList | []>([]);
  const [previewImg, setPreviewImg] = useState<string[]>([]);
  const [agreement, setAgreement] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const [formData, setFormData] = useState<InputsType>({
    imageUrls: [],
    name: "",
    email: "",
    text: "",
  });

  const { pathname } = useLocation();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<InputsType>();

  const handleFileSubmit = async () => {
    try {
      if (files.length > 0 && files.length + formData.imageUrls.length < 4) {
        setUploading(true);
        setImageUploadError("");
        const promises = [];
        for (let i = 0; i < files.length; i++) {
          promises.push(storeImage(files[i]));
        }

        const urls: string[] = (await Promise.all(promises)) as string[];
        console.log(urls);

        setFormData({
          ...formData,
          imageUrls: [...formData.imageUrls, ...urls],
        });

        handleFormSubmit(urls);

        setImageUploadError("");
        setUploading(false);
        setAgreement(false);
      } else {
        setImageUploadError(`Вы можете загрузить от одной до 4 фотографий!`);
        setUploading(false);
      }
    } catch (error) {
      console.log(error);

      setImageUploadError(
        "Загрузка не завершена!(максимальный размер картинки 2MB)"
      );
      setUploading(false);
    }
  };

  const handleFormSubmit = async (data: string[] | []) => {
    try {
      const res = await fetch(`${host}/api/review/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, imageUrls: data }),
      });
      const curentRes = await res.json();
      setFormData({ imageUrls: [], name: "", email: "", text: "" });
      setFiles([]);
      setPreviewImg([]);

      setReviews && setReviews((prev) => [...prev, curentRes]);

      setAgreement(false);
    } catch (error) {
      console.log(error);
    }
  };

  const storeImage = async (file: File) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(`загруженно ${progress}%`);
          progress === 100 && setProgress("");
        },
        (error) => {
          reject(error);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const onSubmit: SubmitHandler<InputsType> = async () => {
    previewImg.length ? handleFileSubmit() : handleFormSubmit([]);
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target.id === "name") {
      setFormData(() => ({ ...formData, name: event.target.value }));
    }
    if (event.target.id === "email") {
      setFormData(() => ({ ...formData, email: event.target.value }));
    }

    if (event.target.id === "text") {
      setFormData(() => ({ ...formData, text: event.target.value }));
    }
  };

  useEffect(() => {
    if (files !== null) {
      setPreviewImg([...files].map((file) => URL.createObjectURL(file)));
    }
  }, [files]);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-box">
        <label className="label">
          Ваше имя <span className="contact-label__required">*</span>:
          <input
            {...register("name", { required: true, minLength: 4 })}
            className="input"
            type="text"
            value={formData.name}
            placeholder="Введите ваше имя"
            id="name"
            onChange={handleChange}
          />
          {errors.name && <span>Поле обязательно к заполнению</span>}
        </label>{" "}
        {pathname === "/reviews" ? (
          <label className="label">
            Email <span className="contact-label__required">*</span>:{" "}
            <input
              {...register("email", {
                required: true,
                pattern:
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
              })}
              className="input"
              type="text"
              value={formData.email}
              placeholder="email"
              id="email"
              onChange={handleChange}
            />
            {errors.email && <span>Поле заполненно не верно</span>}
          </label>
        ) : (
          <label className="label">
            Email <span className="contact-label__required">*</span>:{" "}
            <input
              {...register("phone", {
                required: true,
                pattern:
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
              })}
              className="input"
              type="text"
              placeholder="email"
            />
            {errors.email && <span>Поле заполненно не верно</span>}
          </label>
        )}
      </div>
      <label className="label">
        {pathname === "/reviews" ? "Текст отзыва" : "Teкст сообщения"}
        <span className="contact-label__required">*</span>:{" "}
        <textarea
          {...register("text", { required: true })}
          className="contact-textarea"
          id="text"
          value={formData.text}
          onChange={handleChange}
          placeholder={
            pathname === "/reviews"
              ? "Введите свое сообщение"
              : "Введите свой вопрос"
          }
        ></textarea>
        {errors.text && <span>Введите свое сообщение</span>}
      </label>{" "}
      {pathname === "/reviews" && (
        <div className="reviews-files ">
          <p className={imageUploadError && "reviews-files__error"}>
            {imageUploadError ? `${imageUploadError}` : "Прикрепить фото:"}{" "}
          </p>
          <label
            className={
              previewImg.length == 0 ? "reviews-file" : "reviews-file--active"
            }
          >
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                e.preventDefault();
                setFiles(e.target.files || []);
              }}
            />
            {previewImg.length !== 0 ? (
              previewImg?.map((url, idx) => (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="reviews-file__img"
                  key={idx}
                  style={{ backgroundImage: `url(${url})` }}
                ></div>
              ))
            ) : (
              <>
                <img width={20} src="/images/icons/icon_Image.svg" alt="" />
                Нажмите для загрузки или перетащите файл в это поле.
              </>
            )}
          </label>
        </div>
      )}
      <div className="form-box">
        <button
          disabled={!agreement}
          className={`form-btn ${!agreement && "form-btn--disabled"}`}
        >
          {uploading ? "загрузка..." : "отправить"}
        </button>
        {progress ? (
          <p>{progress}</p>
        ) : (
          <label className="checkbox-group">
            <input
              checked={agreement}
              type="checkbox"
              onChange={() => setAgreement(!agreement)}
            />{" "}
            Согласен с обработкой персональных данных в соответствии с политикой
            конфиденциальности
          </label>
        )}
      </div>
    </form>
  );
};

export default ContactsForm;
