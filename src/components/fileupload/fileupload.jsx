import { useRef, useState } from "react";
import "./fileupload.css";

export function FileUpload({ onUpload, accept, showPrivacyToggle = false }) {
    const [file, setFile] = useState(null);
    const [isPrivate, setIsPrivate] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) setFile(droppedFile);
    };

    const handleSelectFile = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) setFile(selectedFile);
    };

    const handleZoneClick = () => {
        inputRef.current.click();
    };

    const handleUploadClick = async () => {
        if (!file || !onUpload) return;
        setIsUploading(true);
        try {
            // El callback puede ser asíncrono (p. ej. procesado de PDF).
            await onUpload(file, { isPrivate });
        } finally {
            setIsUploading(false);
            setFile(null);
            setIsPrivate(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    return (
        <div className="fileupload-container">
            <div
                className={`fileupload-dropzone ${isDragging ? "dragging" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleZoneClick}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    className="fileupload-input"
                    onChange={handleSelectFile}
                />
                {file ? (
                    <p className="fileupload-filename">{file.name}</p>
                ) : (
                    <p className="fileupload-placeholder">
                        Arrastra un archivo aquí o haz clic para seleccionarlo
                    </p>
                )}
            </div>

            {showPrivacyToggle && (
                <label className="fileupload-privacy">
                    <input
                        type="checkbox"
                        checked={isPrivate}
                        onChange={(e) => setIsPrivate(e.target.checked)}
                    />
                    <span className="fileupload-switch" aria-hidden="true" />
                    <span className="fileupload-privacy-text">
                        ¿Archivo privado (solo docente)?
                    </span>
                </label>
            )}

            <button
                className="fileupload-btn"
                disabled={!file || isUploading}
                onClick={handleUploadClick}
            >
                {isUploading ? "Procesando…" : "Cargar archivo"}
            </button>
        </div>
    );
}
