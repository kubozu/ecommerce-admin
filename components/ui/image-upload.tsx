"use client";

import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          /** absoluteでゴミ箱アイコン配置するのでrelative指定 */
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            {/** 画像右上に削除アイコンを配置する */}
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant={"destructive"}
                size={"icon"}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            {/** 画像 */}
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      {/** Cloudinaryのアップロードボタン実装 */}
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{
          language: "ja",
          text: {
            ja: {
              or: "または",
              back: "戻る",
              close: "閉じる",
              menu: {
                files: "ローカルから",
                web: "Webアドレス",
                camera: "カメラ",
                gsearch: "イメージ検索",
                gdrive: "Googleドライブ",
              },
              local: {
                browse: "閲覧する",
                dd_title_multi: "ここにドラッグ＆ドロップしてください",
              },
            },
          },
        }}
      >
        {({ open, cloudinary }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant={"secondary"}
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              画像のアップロード
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}

export default ImageUpload;
