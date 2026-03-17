import { type ChangeEvent, type DragEvent, useState } from "react";
import styles from "./AppDnd.module.scss";

interface AppDndProps {
  onFileSelect?: (file: File) => void;
}

export const AppDnd = ({ onFileSelect }: AppDndProps) => {
  const [drag, setDrag] = useState(true);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const dragEnterHandler = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
  };
  const dragOverHandler = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
  };
  const dragLeaveHandler = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }
    setDrag(true);
  };
  const dropHandler = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length > 0) {
      setAttachedFiles(files);
      onFileSelect?.(files[0]);
    }
    setDrag(true);
  };
  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setAttachedFiles(files);
    onFileSelect?.(files[0]);
  };
  return (
    <>
      <div className={styles.uploadWrapper}>
        <label
          className={styles.dropZone}
          onDragEnter={dragEnterHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={dragOverHandler}
          onDrop={dropHandler}
        >
          <input
            type="file"
            className={styles.input}
            name="photo"
            multiple
            onChange={fileChangeHandler}
          />
          {drag ? (
            <div className={styles.uploadContent}>
              <div className={styles.uploadIcon}>↓</div>
              <p className={styles.uploadMainText}>
                Перетащите фото товара в эту область или{" "}
                <span className={styles.uploadLinkText}>
                  загрузите с компьютера
                </span>
              </p>
              <p className={styles.uploadHint}>
                Минимальный размер: 840 × 472 px
              </p>
              <p className={styles.uploadHint}>Максимальный вес файла: 1 МБ</p>
              <p className={styles.uploadHint}>PNG, JPG, HEIF и WEBP файлы</p>
            </div>
          ) : (
            <div className={styles.uploadContent}>Отпустите файл</div>
          )}
        </label>
      </div>
      {attachedFiles.length > 0 && (
        <div className={styles.uploadWrapper}>
          {attachedFiles.map((file) => (
            <p key={`${file.name}-${file.lastModified}`}>{file.name}</p>
          ))}
        </div>
      )}
    </>
  );
};
