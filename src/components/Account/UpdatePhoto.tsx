import Button from "components/Button";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { editUser } from "services/helperServices";
import { dispatchStore } from "helpers/utils";
import { setUser } from "store/actions/user";
import UploadIcon from "assets/images/upload.svg";

type ConfigurationProp = {
  setUpdatePhotoModal: Function;
  setAvatar: Function;
};

const UpdatePhoto = ({ setUpdatePhotoModal, setAvatar }: ConfigurationProp) => {
  const [selectedImage, setSelectedImage] = useState("");
  const drop = useRef<HTMLDivElement>(null);
  let profilePicture = {
    profile_picture: selectedImage,
  };

  const onUpload = (files: any) => {
    setSelectedImage(URL.createObjectURL(files[0]));
    //   setSelectedImage(files[0]);
    console.log(files[0]);
  };

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      //   setSelectedImage(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };

  const onSubmit = (data: any) => {
    editUser(data).then(
      (res) => {
        console.log(res.data);
        dispatchStore(setUser(res.data));
        setAvatar(res.data.profile_picture);
      },
      (error) => {
        console.log(error);
      }
    );
    setUpdatePhotoModal(false);
    setSelectedImage("");
  };

  useLayoutEffect(() => {
    if (null !== drop.current) {
      drop.current.addEventListener("dragover", handleDragOver);
      drop.current.addEventListener("drop", handleDrop);
    }
    return () => {
      if (null !== drop.current) {
        drop.current.removeEventListener("dragover", handleDragOver);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        drop.current.removeEventListener("drop", handleDrop);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;

    if (files && files.length) {
      onUpload(files);
    }
  };

  return (
    <div className="p-8">
      <p className="text-black mb-10">Update Photo</p>
      <p className="text-black text-center mb-10">
        Photo must be in png, jpeg or jpg format
      </p>
      <form>
        <div className="flex flex-col justify-center items-center max-w-xl">
          <label className="flex justify-center w-64 h-64 px-4 transition border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            {selectedImage ? (
              <span ref={drop}>
                <img
                  src={selectedImage}
                  className="flex justify-center w-64 h-64"
                  alt=""
                />
                <input
                  type="file"
                  name="file_upload"
                  accept="image/*"
                  className="hidden"
                  onChange={imageChange}
                />
              </span>
            ) : (
              <>
                <span
                  ref={drop}
                  className="flex flex-col justify-center items-center gap-8 space-x-2"
                >
                  <img src={UploadIcon} className="w-8 h-6 " alt="" />
                  <span className="font-medium text-center text-gray-300">
                    Drag photo to upload or
                    <span className="text-blue-600 underline">browse</span>
                  </span>
                </span>
                <input
                  type="file"
                  name="file_upload"
                  accept="image/*"
                  className="hidden"
                  onChange={imageChange}
                />
              </>
            )}
          </label>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="w-40">
            <Button
              title="Save Photo"
              type="button"
              onClick={() => onSubmit(profilePicture)}
            />
          </div>
          <div className="w-40">
            <Button
              title="Cancel"
              type="button"
              onClick={() => {
                setUpdatePhotoModal(false);
                setSelectedImage("");
              }}
              other
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePhoto;
