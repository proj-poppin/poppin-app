import {useState, useCallback} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

type SelectedImage = {
  uri: string;
  name: string;
  type: string;
};

export const useImageSelector = () => {
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);

  const handleSelectImages = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      maxFiles: 5 - selectedImages.length,
    })
      .then(images => {
        const resizePromises = images.map(image =>
          ImageResizer.createResizedImage(
            image.path,
            600,
            600,
            image.mime.includes('jpeg') ? 'JPEG' : 'PNG',
            100,
            0,
          )
            .then(r => ({
              uri: r.uri,
              name: r.name,
              type: image.mime,
            }))
            .catch(_error => {
              return null;
            }),
        );
        Promise.all(resizePromises)
          .then(resizedImages => {
            const validImages = resizedImages.filter(
              (image): image is SelectedImage => image !== null,
            );
            setSelectedImages(prevImages => [...prevImages, ...validImages]);
          })
          .catch(_error => {
            console.log('Error processing images:', _error);
          });
      })
      .catch(_error => {
        console.log('Error selecting images:', _error);
      });
  };

  const handleRemoveImage = useCallback((indexToRemove: number) => {
    setSelectedImages(prevImages =>
      prevImages.filter((_, index) => index !== indexToRemove),
    );
  }, []);

  return {
    selectedImages,
    handleSelectImages,
    handleRemoveImage,
  };
};
