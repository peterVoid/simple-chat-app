import { useState } from "react";

const useChangeImage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const maxSize = 2 * 1024 * 1024;

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxSize) {
        alert("Error, Kegedean Gambarnya");
        setSelectedItem(null);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setSelectedItem(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please, Select an image");
      setSelectedItem(null);
    }
  };
  return { handleChangeImage, selectedItem, setSelectedItem };
};

export default useChangeImage;
