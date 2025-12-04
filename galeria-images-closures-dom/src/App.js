import createGalleryApp from "./components/GalleryApp";

export default function createApp() {
    const galleryApp=createGalleryApp();
    return galleryApp.element;
  
}
